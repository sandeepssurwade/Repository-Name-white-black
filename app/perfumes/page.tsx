import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Perfumes",
  description: "The Fragrance House — signature scents from WHITE & BLACK, The Fashion Hub.",
};

export default function PerfumesPage() {
  const products = getByCategory("perfumes");
  return (
    <CollectionPage
      category="perfumes"
      tagline={categoryMeta.perfumes.tagline}
      intro="Composed to echo the house's materials — leather, amber, vetiver — this edit is scent as an extension of what you're already wearing."
      products={products}
    />
  );
}
