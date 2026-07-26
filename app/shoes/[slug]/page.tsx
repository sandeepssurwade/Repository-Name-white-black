import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getByCategory, getBySlug } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return getByCategory("shoes").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getBySlug("shoes", params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${product.description} ${formatPrice(product.price)}.`,
  };
}

export default function ShoeDetailPage({ params }: { params: { slug: string } }) {
  const product = getBySlug("shoes", params.slug);
  if (!product) return notFound();
  return <ProductDetail product={product} />;
}
