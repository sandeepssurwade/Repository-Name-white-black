import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Belts",
  description: "Hand-finished leather belts from WHITE & BLACK, The Fashion Hub.",
};

export default function BeltsPage() {
  const products = getByCategory("belts");
  return (
    <CollectionPage
      category="belts"
      tagline={categoryMeta.belts.tagline}
      intro="The finishing line of any outfit, cut from full-grain leather and fitted with solid brass hardware."
      products={products}
    />
  );
}
