"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export interface LedScreen3DViewerProps {
  widthM: number;
  heightM: number;
  depthMm?: number;
  cols: number;
  rows: number;
  unit: "metric" | "imperial";
  showImage: boolean;
  onToggleShowImage?: () => void;
  modelUrl?: string;
  className?: string;
  onDimensionsMeasured?: (dims: { widthM: number; heightM: number; depthM: number }) => void;
  bottomSlot?: React.ReactNode;
  children?: React.ReactNode;
}

export function LedScreen3DViewer({
  widthM,
  heightM,
  cols,
  rows,
  unit,
  showImage,
  onToggleShowImage,
  modelUrl = "/models/screen_led.glb",
  className = "",
  onDimensionsMeasured,
  bottomSlot,
  children,
}: LedScreen3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to keep Three.js state persistent across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelWrapperRef = useRef<THREE.Group | null>(null);
  const dimensionGuidesRef = useRef<THREE.Group | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const screenTextureRef = useRef<THREE.Texture | null>(null);
  const backMeshRef = useRef<THREE.Mesh | null>(null);
  const backTextureRef = useRef<THREE.Texture | null>(null);
  const baseSizeRef = useRef<THREE.Vector3 | null>(null);
  const baseCenterRef = useRef<THREE.Vector3 | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isLoadedRef = useRef<boolean>(false);

  const onDimensionsMeasuredRef = useRef(onDimensionsMeasured);
  useEffect(() => {
    onDimensionsMeasuredRef.current = onDimensionsMeasured;
  }, [onDimensionsMeasured]);

  const dimensionsRef = useRef({ widthM, heightM });
  useEffect(() => {
    dimensionsRef.current = { widthM, heightM };
  }, [widthM, heightM]);

  const showImageRef = useRef(showImage);
  useEffect(() => {
    showImageRef.current = showImage;
  }, [showImage]);

  // 3D Anchor points for measurement labels
  const widthAnchorRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const heightAnchorRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const depthAnchorRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // HTML Overlay label element refs (direct DOM transforms eliminate 60fps React re-renders)
  const widthBadgeRef = useRef<HTMLDivElement>(null);
  const heightBadgeRef = useRef<HTMLDivElement>(null);
  const depthBadgeRef = useRef<HTMLDivElement>(null);

  // Measured real-world 3D dimensions from Three.js Box3
  const [measuredDims, setMeasuredDims] = useState<{ width: number; height: number; depth: number }>({
    width: widthM,
    height: heightM,
    depth: 0.12,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Helper to fit camera comfortably to the current bounding box
  const fitCameraToModel = useCallback((box: THREE.Box3, animate = false) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Compute distance based on horizontal and vertical FOV
    const fov = camera.fov * (Math.PI / 180);
    const aspect = camera.aspect;
    const hDist = (size.y / 2) / Math.tan(fov / 2);
    const wDist = (size.x / 2) / (Math.tan(fov / 2) * aspect);
    
    // Comfortable base framing distance gives the 3D model an elegant, smaller scale (~45-55% of canvas)
    // with ample architectural breathing room for dimension lines, labels, and steppers.
    // Crucially, this stable base framing means clicking [+] on width physically expands the model
    // across the viewport, rather than pulling the camera back and freezing visual width!
    const baseComfortDist = 7.0;
    const dynamicFitDist = Math.max(hDist, wDist) * 1.35;
    const targetDist = Math.max(baseComfortDist, dynamicFitDist);

    // When animating (Reset View), return to front view. When rescaling, preserve current viewing angle!
    const dir = camera.position.clone().sub(controls.target);
    if (dir.lengthSq() < 0.001) {
      dir.set(0, 0, 1);
    } else {
      dir.normalize();
    }
    const targetPos = animate
      ? new THREE.Vector3(center.x, center.y, center.z + targetDist)
      : center.clone().addScaledVector(dir, targetDist);

    if (animate) {
      // Smooth interpolation
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();
      const startTime = performance.now();
      const duration = 750;

      const step = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        camera.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startTarget, center, ease);
        controls.update();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      camera.position.copy(targetPos);
      controls.target.copy(center);
      controls.minDistance = targetDist * 0.25;
      controls.maxDistance = targetDist * 4.0;
      controls.update();
    }
  }, []);

  // Update 3D measurement guide lines & ticks
  const updateDimensionGuides = useCallback((box: THREE.Box3) => {
    const guidesGroup = dimensionGuidesRef.current;
    if (!guidesGroup) return;

    // Clear previous dimension lines
    while (guidesGroup.children.length > 0) {
      const child = guidesGroup.children[0];
      guidesGroup.remove(child);
      if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }

    const minX = box.min.x;
    const maxX = box.max.x;
    const minY = box.min.y;
    const maxY = box.max.y;
    const minZ = box.min.z;
    const maxZ = box.max.z + 0.015; // slightly forward to prevent z-fighting

    const w = maxX - minX;
    const h = maxY - minY;

    const offsetY = Math.max(0.14, Math.min(0.38, h * 0.09));
    const offsetX = Math.max(0.14, Math.min(0.38, w * 0.09));
    const arrow = Math.max(0.035, Math.min(0.09, Math.min(w, h) * 0.028));

    const points: number[] = [];

    // --- 1. TOP WIDTH GUIDE ---
    const lineY = maxY + offsetY;
    // Main dimension line across width
    points.push(minX, lineY, maxZ, maxX, lineY, maxZ);
    // Extension witness lines from screen corners up to dimension line
    points.push(minX, maxY + 0.02, maxZ, minX, lineY + offsetY * 0.2, maxZ);
    points.push(maxX, maxY + 0.02, maxZ, maxX, lineY + offsetY * 0.2, maxZ);
    // Left end tick & arrowhead
    points.push(minX, lineY - arrow * 1.2, maxZ, minX, lineY + arrow * 1.2, maxZ);
    points.push(minX, lineY, maxZ, minX + arrow * 1.6, lineY + arrow * 0.7, maxZ);
    points.push(minX, lineY, maxZ, minX + arrow * 1.6, lineY - arrow * 0.7, maxZ);
    // Right end tick & arrowhead
    points.push(maxX, lineY - arrow * 1.2, maxZ, maxX, lineY + arrow * 1.2, maxZ);
    points.push(maxX, lineY, maxZ, maxX - arrow * 1.6, lineY + arrow * 0.7, maxZ);
    points.push(maxX, lineY, maxZ, maxX - arrow * 1.6, lineY - arrow * 0.7, maxZ);

    // --- 2. LEFT HEIGHT GUIDE ---
    const lineX = minX - offsetX;
    // Main dimension line across height
    points.push(lineX, minY, maxZ, lineX, maxY, maxZ);
    // Extension witness lines from screen corners out to dimension line
    points.push(minX - 0.02, minY, maxZ, lineX - offsetX * 0.2, minY, maxZ);
    points.push(minX - 0.02, maxY, maxZ, lineX - offsetX * 0.2, maxY, maxZ);
    // Bottom end tick & arrowhead
    points.push(lineX - arrow * 1.2, minY, maxZ, lineX + arrow * 1.2, minY, maxZ);
    points.push(lineX, minY, maxZ, lineX + arrow * 0.7, minY + arrow * 1.6, maxZ);
    points.push(lineX, minY, maxZ, lineX - arrow * 0.7, minY + arrow * 1.6, maxZ);
    // Top end tick & arrowhead
    points.push(lineX - arrow * 1.2, maxY, maxZ, lineX + arrow * 1.2, maxY, maxZ);
    points.push(lineX, maxY, maxZ, lineX + arrow * 0.7, maxY - arrow * 1.6, maxZ);
    points.push(lineX, maxY, maxZ, lineX - arrow * 0.7, maxY - arrow * 1.6, maxZ);

    // --- 3. CABINET DEPTH GUIDE (Bottom Right Corner) ---
    const depthX = maxX + offsetX * 0.6;
    const depthY = minY;
    points.push(depthX, depthY, minZ, depthX, depthY, box.max.z);
    points.push(maxX + 0.01, depthY, minZ, depthX + 0.05, depthY, minZ);
    points.push(maxX + 0.01, depthY, box.max.z, depthX + 0.05, depthY, box.max.z);
    points.push(depthX, depthY - arrow * 0.8, minZ, depthX, depthY + arrow * 0.8, minZ);
    points.push(depthX, depthY - arrow * 0.8, box.max.z, depthX, depthY + arrow * 0.8, box.max.z);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0xd7b875,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
    });

    const lines = new THREE.LineSegments(geometry, material);
    lines.renderOrder = 999;
    guidesGroup.add(lines);

    // Update 3D label anchor points
    widthAnchorRef.current.set((minX + maxX) / 2, lineY, maxZ);
    heightAnchorRef.current.set(lineX, (minY + maxY) / 2, maxZ);
    depthAnchorRef.current.set(depthX, depthY, (minZ + box.max.z) / 2);
  }, []);

  // Scale the 3D model to match the exact physical dimensions and calculate Three.js Box3
  const scaleAndFrameModel = useCallback(
    (targetWidth: number, targetHeight: number, shouldFitCamera = false) => {
      const modelWrapper = modelWrapperRef.current;
      const baseSize = baseSizeRef.current;
      if (!modelWrapper || !baseSize) return;

      // Scale model wrapper so its world size matches physical meters
      const scaleX = targetWidth / baseSize.x;
      const scaleY = targetHeight / baseSize.y;
      // Maintain realistic cabinet depth profile (scaled mildly with overall screen size)
      const scaleZ = Math.max(0.6, Math.min(1.4, (scaleX + scaleY) / 2));

      modelWrapper.scale.set(scaleX, scaleY, scaleZ);
      modelWrapper.updateMatrixWorld(true);

      // Calculate the model's actual bounding box using Three.js Box3
      const measuredBox = new THREE.Box3().setFromObject(modelWrapper);
      const measuredSize = measuredBox.getSize(new THREE.Vector3());

      const finalDims = {
        width: measuredSize.x,
        height: measuredSize.y,
        depth: measuredSize.z,
      };
      setMeasuredDims(finalDims);

      if (onDimensionsMeasuredRef.current) {
        onDimensionsMeasuredRef.current({
          widthM: finalDims.width,
          heightM: finalDims.height,
          depthM: finalDims.depth,
        });
      }

      // Update 3D measurement guide lines & tick marks
      updateDimensionGuides(measuredBox);

      // Adjust camera to fit the scaled model
      if (shouldFitCamera) {
        fitCameraToModel(measuredBox, false);
      }
    },
    [fitCameraToModel, updateDimensionGuides]
  );

  const scaleAndFrameModelRef = useRef(scaleAndFrameModel);
  useEffect(() => {
    scaleAndFrameModelRef.current = scaleAndFrameModel;
  }, [scaleAndFrameModel]);

  // Set up Three.js Scene, Camera, Lights, OrbitControls & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.enableZoom = false; // Disable wheel zoom so page scrolls naturally
    controls.autoRotate = true; // Slowly spin automatically
    controls.autoRotateSpeed = 0.8; // Elegant architectural showcase speed
    controls.minDistance = 1;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI * 0.95; // prevent going completely below floor
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Light (front top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    // Fill Light with subtle Lumera gold warmth (front left)
    const fillLight = new THREE.DirectionalLight(0xd7b875, 0.65);
    fillLight.position.set(-6, 3, 5);
    scene.add(fillLight);

    // Rim / Backlight for sleek metallic enclosure edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Rear Cabinet Light: reveals the modular cabling, receiver box & locking hardware
    const backLight = new THREE.DirectionalLight(0xffffff, 1.25);
    backLight.position.set(0, 2, -8);
    scene.add(backLight);

    // 6. Hierarchy Groups
    const modelWrapper = new THREE.Group();
    scene.add(modelWrapper);
    modelWrapperRef.current = modelWrapper;

    const dimensionGuides = new THREE.Group();
    scene.add(dimensionGuides);
    dimensionGuidesRef.current = dimensionGuides;

    // 7. Load GLTF / GLB Model
    const loader = new GLTFLoader();
    setIsLoading(true);
    setLoadError(null);

    const targetUrl = modelUrl.startsWith("/") ? modelUrl : `/${modelUrl}`;

    loader.load(
      targetUrl,
      (gltf) => {
        const loadedModel = gltf.scene;

        // Compute natural model bounds
        const baseBox = new THREE.Box3().setFromObject(loadedModel);
        const baseSize = baseBox.getSize(new THREE.Vector3());
        const baseCenter = baseBox.getCenter(new THREE.Vector3());

        baseSizeRef.current = baseSize;
        baseCenterRef.current = baseCenter;

        // Center loaded model at origin
        loadedModel.position.set(-baseCenter.x, -baseCenter.y, -baseCenter.z);
        modelWrapper.add(loadedModel);

        // Find the front screen mesh and set UVs
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Apply refined materials
            if (child.name.includes("Cube_Material002_0") || child.material?.name === "Material.002") {
              screenMeshRef.current = child;

              // Ensure UV coordinates map cleanly 0..1
              const uvAttr = child.geometry.attributes.uv;
              if (uvAttr && uvAttr.count === 4) {
                uvAttr.setXY(0, 1, 0); // Bottom Right
                uvAttr.setXY(1, 1, 1); // Top Right
                uvAttr.setXY(2, 0, 1); // Top Left
                uvAttr.setXY(3, 0, 0); // Bottom Left
                uvAttr.needsUpdate = true;
              }
            } else if (child.name.includes("Cube_Material001_0") || child.material?.name === "Material.001") {
              // Bezel & Frame enclosure: Anodized matte obsidian aluminum
              child.material = new THREE.MeshStandardMaterial({
                color: 0x111215,
                metalness: 0.85,
                roughness: 0.35,
              });
            } else if (
              child.name.includes("Text") ||
              child.name.includes("Cylinder") ||
              child.name.includes("Mball")
            ) {
              // Hide legacy monitor buttons / text labels from original 3D asset
              child.visible = false;
            }
          }
        });

        // Create the realistic LED cabinet rear plane covering the whole back of the 3D model
        const backPlaneGeo = new THREE.PlaneGeometry(baseSize.x, baseSize.y);
        const backMaterial = new THREE.MeshStandardMaterial({
          color: 0x111215,
          roughness: 0.45,
          metalness: 0.35,
          side: THREE.FrontSide,
        });
        const backMesh = new THREE.Mesh(backPlaneGeo, backMaterial);
        backMesh.name = "Screen_Back_Cabinet";
        // Position flush on the rear surface of the cabinet (facing backwards towards -Z)
        backMesh.position.set(0, 0, -baseSize.z / 2 - 0.003);
        backMesh.rotation.y = Math.PI;
        modelWrapper.add(backMesh);
        backMeshRef.current = backMesh;

        // Load the realistic modular LED cabinet rear texture
        const backTexLoader = new THREE.TextureLoader();
        backTexLoader.load("/images/behind_led.jfif", (backTexture) => {
          backTexture.colorSpace = THREE.SRGBColorSpace;
          backTexture.wrapS = THREE.ClampToEdgeWrapping;
          backTexture.wrapT = THREE.ClampToEdgeWrapping;
          backTextureRef.current = backTexture;

          backMaterial.color.setHex(0xffffff);
          backMaterial.map = backTexture;
          backMaterial.bumpMap = backTexture;
          backMaterial.bumpScale = 0.015;
          backMaterial.needsUpdate = true;
        });

        // Load Screen Texture
        const texLoader = new THREE.TextureLoader();
        texLoader.load("/images/download.webp", (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          screenTextureRef.current = texture;

          if (screenMeshRef.current && showImageRef.current) {
            screenMeshRef.current.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.2,
              metalness: 0.05,
              emissive: 0xffffff,
              emissiveMap: texture,
              emissiveIntensity: 0.25,
            });
          }
        });

        isLoadedRef.current = true;
        setIsLoading(false);

        // Trigger initial scale and framing
        scaleAndFrameModelRef.current(dimensionsRef.current.widthM, dimensionsRef.current.heightM, true);
      },
      undefined,
      (err) => {
        console.error("Failed to load 3D GLB model:", err);
        setLoadError("Could not load 3D model. Please verify file path.");
        setIsLoading(false);
      }
    );

    // 8. Animation & Projection Render Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);

      // Project 3D Measurement Label Anchors to 2D Screen Space directly on DOM
      if (isLoadedRef.current && containerRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const cHeight = containerRef.current.clientHeight;

        const updateBadge = (el: HTMLDivElement | null, point: THREE.Vector3) => {
          if (!el) return;
          const p = point.clone().project(camera);
          const isFront = p.z < 1.0;
          if (!isFront) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            return;
          }
          const x = ((p.x + 1) * cWidth) / 2;
          const y = ((-p.y + 1) * cHeight) / 2;
          el.style.opacity = "1";
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        };

        updateBadge(widthBadgeRef.current, widthAnchorRef.current);
        updateBadge(heightBadgeRef.current, heightAnchorRef.current);
        updateBadge(depthBadgeRef.current, depthAnchorRef.current);
      }
    };
    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = newW / newH;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      if (screenTextureRef.current) screenTextureRef.current.dispose();
      if (backTextureRef.current) backTextureRef.current.dispose();
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [modelUrl]);

  // Re-scale whenever target dimensions change
  useEffect(() => {
    if (isLoadedRef.current) {
      scaleAndFrameModelRef.current(widthM, heightM, true);
    }
  }, [widthM, heightM]);

  // Update screen texture on toggle
  useEffect(() => {
    const screenMesh = screenMeshRef.current;
    if (!screenMesh) return;

    if (showImage && screenTextureRef.current) {
      screenMesh.material = new THREE.MeshStandardMaterial({
        map: screenTextureRef.current,
        roughness: 0.2,
        metalness: 0.05,
        emissive: 0xffffff,
        emissiveMap: screenTextureRef.current,
        emissiveIntensity: 0.25,
      });
    } else {
      // Standby high-tech obsidian micro-LED matrix material
      screenMesh.material = new THREE.MeshStandardMaterial({
        color: 0x070709,
        roughness: 0.4,
        metalness: 0.2,
        emissive: 0xd7b875,
        emissiveIntensity: 0.04,
      });
    }
  }, [showImage]);

  // Reset view button handler
  const handleResetCamera = () => {
    if (!modelWrapperRef.current) return;
    const box = new THREE.Box3().setFromObject(modelWrapperRef.current);
    fitCameraToModel(box, true);
  };

  // Sync auto-rotation state with OrbitControls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Convert dimensions for labels
  const widthDisplay = unit === "metric" ? `${measuredDims.width.toFixed(2)} m` : `${(measuredDims.width * 3.28084).toFixed(1)} ft`;
  const heightDisplay = unit === "metric" ? `${measuredDims.height.toFixed(2)} m` : `${(measuredDims.height * 3.28084).toFixed(1)} ft`;
  const depthDisplay = `${Math.round(measuredDims.depth * 1000)} mm`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[580px] overflow-hidden rounded-xl select-none ${className}`}
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-[#D7B875] animate-spin mb-3" />
          <span className="text-xs uppercase tracking-widest text-[#D7B875] font-semibold">
            Loading 3D LED Display...
          </span>
        </div>
      )}

      {/* Load Error State */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/90 p-6 text-center">
          <span className="text-red-500 text-sm font-medium mb-2">{loadError}</span>
          <span className="text-xs text-zinc-500">Falling back to dimensional visualization.</span>
        </div>
      )}

      {/* 3D Measurement Labels Projected in Real-Time */}
      {!isLoading && (
        <>
          {/* 1. Width Dimension Label Badge (Anchored above 3D model) */}
          <div
            ref={widthBadgeRef}
            className="absolute top-0 left-0 pointer-events-none will-change-transform z-20"
            style={{ opacity: 0 }}
          >
            <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 border border-[#D7B875] text-[11px] sm:text-xs font-semibold shadow-md backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
              <span className="text-zinc-950 font-bold">Width: <span className="text-[#D7B875]">{widthDisplay}</span></span>
              <span className="text-zinc-500 font-normal">({cols} {cols === 1 ? "panel" : "panels"})</span>
            </div>
          </div>

          {/* 2. Height Dimension Label Badge (Anchored to the left of 3D model) */}
          <div
            ref={heightBadgeRef}
            className="absolute top-0 left-0 pointer-events-none will-change-transform z-20"
            style={{ opacity: 0 }}
          >
            <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 border border-[#D7B875] text-[11px] sm:text-xs font-semibold shadow-md backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
              <span className="text-zinc-950 font-bold">Height: <span className="text-[#D7B875]">{heightDisplay}</span></span>
              <span className="text-zinc-500 font-normal">({rows} {rows === 1 ? "panel" : "panels"})</span>
            </div>
          </div>

          {/* 3. Depth Dimension Label Badge (Anchored along cabinet profile) */}
          <div
            ref={depthBadgeRef}
            className="absolute top-0 left-0 pointer-events-none will-change-transform z-20"
            style={{ opacity: 0 }}
          >
            <div className="px-2.5 py-0.5 rounded-full bg-white/95 border border-[#E5E5E0] text-zinc-700 text-[10px] font-medium shadow-xs backdrop-blur-md whitespace-nowrap">
              Depth: {depthDisplay}
            </div>
          </div>
        </>
      )}

      {/* Floating 3D Navigation Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Toggle Auto-Rotation Spin */}
        <button
          type="button"
          onClick={() => setIsAutoRotating((prev) => !prev)}
          title={isAutoRotating ? "Pause 3D auto-spin" : "Start 3D auto-spin"}
          aria-label={isAutoRotating ? "Pause auto-spin" : "Start auto-spin"}
          className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-xs font-inter flex items-center gap-1.5 transition-all cursor-pointer shadow-xs backdrop-blur-md active:scale-95"
        >
          {isAutoRotating ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#D7B875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
              </svg>
              <span className="hidden sm:inline">Pause Spin</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">Auto-Spin</span>
            </>
          )}
        </button>

        {/* Reset Camera View Button */}
        <button
          type="button"
          onClick={handleResetCamera}
          title="Reset 3D camera to front elevation"
          aria-label="Reset camera view"
          className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-xs font-inter flex items-center gap-1.5 transition-all cursor-pointer shadow-xs backdrop-blur-md active:scale-95"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Reset View</span>
        </button>

        {/* Toggle Image Texture */}
        {onToggleShowImage && (
          <button
            type="button"
            onClick={onToggleShowImage}
            aria-label={showImage ? "Remove image from LED screen" : "Show image on LED screen"}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-xs font-inter flex items-center gap-1.5 transition-all cursor-pointer shadow-xs backdrop-blur-md active:scale-95"
          >
            {showImage ? (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Remove Image</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-[#D7B875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Show Image</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom Controls / Ratio Grid (In place of Drag to Rotate div) */}
      {bottomSlot || children ? (
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 px-2 pointer-events-auto">
          {bottomSlot || children}
        </div>
      ) : (
        /* Fallback 3D Interaction Hint Badge (Bottom Center) */
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-20">
          <div className="px-3.5 py-1 rounded-full bg-white/90 border border-[#E5E5E0] text-zinc-500 text-[10px] sm:text-[11px] font-medium backdrop-blur-sm shadow-xs flex items-center gap-2">
            <span>Drag to Rotate</span>
            <span className="text-zinc-400">•</span>
            <span>Right-Click to Pan</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LedScreen3DViewer;
