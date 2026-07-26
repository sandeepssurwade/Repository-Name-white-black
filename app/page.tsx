import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import CollectionsGrid from "@/components/sections/CollectionsGrid";
import ScrollStory from "@/components/sections/ScrollStory";
import Craft from "@/components/sections/Craft";
import BestSellers from "@/components/sections/BestSellers";
import StoreVisit from "@/components/sections/StoreVisit";
import { bestSellers, getByCategory } from "@/lib/data/products";

export default function HomePage() {
  const shoes = getByCategory("shoes");

  return (
    <main className="bg-ink">
      <Hero />
      <Marquee items={["Shoes", "Watches", "Clothes", "Wallets", "Perfumes", "Belts"]} />
      <CollectionsGrid />
      <ScrollStory products={shoes.slice(0, 8)} />
      <Craft />
      <BestSellers products={bestSellers} />
      <StoreVisit />
    </main>
  );
}
