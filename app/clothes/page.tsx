import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Clothes",
  description: "Tailored outerwear, knitwear and suiting from WHITE & BLACK, The Fashion Hub.",
};

export default function ClothesPage() {
  const products = getByCategory("clothes");
  return (
    <CollectionPage
      category="clothes"
      tagline={categoryMeta.clothes.tagline}
      intro="Cloth sourced from mills we've worked with for years, cut into silhouettes built to be worn, not just photographed."
      products={products}
    />
  );
}
