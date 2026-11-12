import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProductSlugs,
  PRODUCT_DETAILS,
} from "@/data/product-details";
import {
  ProductHero,
  ProductPerformance,
  ProductSpecs,
  ProductGallery,
  ProductRelated,
  ProductProtection,
} from "@/components/product-detail";
import AboutCta from "@/components/about/about-cta";
import ProductParts from "@/components/product-detail/product-parts";

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

      {/* 3. Comprehensive Technical Specifications */}
      <ProductSpecs product={product} /> 

      <ProductProtection/>

      {/* 2. Core Performance Benchmarks */}
      <ProductPerformance imageSrc={product.heroImage} productName={product.name} />


      <ProductParts/>

      {/* 8. Photographic Product Gallery */}
      <ProductGallery product={product} />

      {/* 9. Documentation & Engineering Downloads
      <ProductDownloads product={product} /> */}

      {/* 10. Related Architectural Displays */}
      <ProductRelated currentProductId={product.id} />

      <AboutCta/>
    </main>
  );
}
