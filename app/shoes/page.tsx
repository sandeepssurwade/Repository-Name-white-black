import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Shoes",
  description: "The Shoes Collection — luxury crafted footwear from WHITE & BLACK, The Fashion Hub.",
};

export default function ShoesPage() {
  const products = getByCategory("shoes");
  return (
    <CollectionPage
      category="shoes"
      tagline={categoryMeta.shoes.tagline}
      intro="Twenty-two silhouettes, one house standard: full-grain leather, hand-burnished edges, and a last built for a full day on your feet. This is the collection the atelier was founded on."
      products={products}
    />
  );
}
