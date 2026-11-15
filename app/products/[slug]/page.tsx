import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProductSlugs,
  PRODUCT_DETAILS,
} from "@/data/product-details";
import {
  ProductHero,
  ProductAbout,
  ProductPerformance,
  ProductRefreshRate,
  ProductEyeCare,
  ProductGallery,
  ProductRelated,
  ProductProtection,
} from "@/components/product-detail";
import ProductParts from "@/components/product-detail/product-parts";
import ProductDivider from "@/components/product-detail/product-divider";
import AboutCta from "@/components/about/about-cta";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_DETAILS[slug] || PRODUCT_DETAILS["lumera-matrix"];

  if (!product) {
    return {
      title: "Product Not Found | Lumera Pro Architect",
    };
  }

  return {
    title: `${product.name} | ${product.headline} | Lumera`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${product.headline}`,
      description: product.description,
      images: [product.heroImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = PRODUCT_DETAILS[slug] || PRODUCT_DETAILS["lumera-matrix"];

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D7B875] selection:text-black">

      {/* 1. Product Hero */}
      <ProductHero product={product} />

      {/* 2. Small Product About Section */}
      <ProductAbout product={product} />

      {/* 3. Product Closer Look Grid */}
      <ProductParts />

      {/* 4. Core Visual Performance (Ultimate Visuals & True Color) */}
      <ProductPerformance product={product} />

  
      {/* 5. Precise Low-Grayscale Color Reproduction Unified Card */}
      <ProductDivider />

      {/* 4. Health & Safety Standards (Healthy Eye Care & EMC Safety) */}
      <ProductEyeCare product={product} />

          
      {/* 4. 120Hz High Frame Rate Motion Capture */}
      <ProductRefreshRate product={product} />



      {/* 6. Protection Features */}
      <ProductProtection />

        {/* 4. Photographic Product Gallery (Application Scenario) */}
      <Suspense fallback={null}>
        <ProductGallery product={product} />
      </Suspense>

      {/* 8. Related Architectural Displays */}
      <ProductRelated currentProductId={product.id} />

      <AboutCta/>

      {/* 9. Contact CTA */}
      {/* <AboutCta /> */}
    </main>
  );
}
