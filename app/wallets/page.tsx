import type { Metadata } from "next";
import { CollectionPage } from "@/components/product/CollectionPage";
import { getByCategory, categoryMeta } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Wallets",
  description: "Hand-finished leather wallets and small goods from WHITE & BLACK, The Fashion Hub.",
};

export default function WalletsPage() {
  const products = getByCategory("wallets");
  return (
    <CollectionPage
      category="wallets"
      tagline={categoryMeta.wallets.tagline}
      intro="The smallest objects in the house get the same attention as the largest — cut from the same hides as our shoes, and finished by hand."
      products={products}
    />
  );
}
