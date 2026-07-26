import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Watches",
  description: "The Timepiece Edit — precision watches from WHITE & BLACK, The Fashion Hub.",
};

export default function WatchesPage() {
  const products = getByCategory("watches");
  return (
    <CollectionPage
      category="watches"
      tagline={categoryMeta.watches.tagline}
      intro="Cased in steel and titanium, finished by hand. Every dial in this edit is designed to be read at a glance and worn for a decade."
      products={products}
    />
  );
}
