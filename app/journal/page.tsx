import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGlyph } from "@/components/product/ProductGlyph";

export const metadata: Metadata = {
  title: "Journal",
  description: "The WHITE & BLACK Fashion Journal — notes on craft, material, and style.",
};

const articles = [
  {
    title: "The Anatomy of a Hand-Burnished Toe",
    excerpt:
      "What separates a burnished finish from a painted one, and why our Atelier Line takes nine extra hours to complete.",
    category: "shoes" as const,
    gradient: ["#141414", "#3a2f22"] as [string, string],
    tag: "Craft",
  },
  {
    title: "Reading a Dial: A Short Guide",
    excerpt:
      "Indices, hands, and complications explained simply — everything to look for before buying your next watch.",
    category: "watches" as const,
    gradient: ["#101012", "#2b2e33"] as [string, string],
    tag: "Guide",
  },
  {
    title: "Why We Still Goodyear-Welt",
    excerpt:
      "A construction method that costs more and takes longer, and why we won't build our formal line any other way.",
    category: "shoes" as const,
    gradient: ["#161212", "#4a1f24"] as [string, string],
    tag: "Craft",
  },
  {
    title: "One Coat, Every Season",
    excerpt: "How to build a capsule outerwear rotation around a single, well-made overcoat.",
    category: "clothes" as const,
    gradient: ["#121412", "#2c3226"] as [string, string],
    tag: "Style",
  },
  {
    title: "The Scent of a Workshop",
    excerpt: "How Noir de Cuir became our best-selling fragrance, built from the same notes as our tannery floor.",
    category: "perfumes" as const,
    gradient: ["#0f0f10", "#3d3226"] as [string, string],
    tag: "Fragrance",
  },
  {
    title: "Buying Your First Luxury Watch",
    excerpt: "A practical, no-nonsense guide for a first purchase that will still make sense in ten years.",
    category: "watches" as const,
    gradient: ["#131313", "#2a2a2c"] as [string, string],
    tag: "Guide",
  },
];

export default function JournalPage() {
  return (
    <main className="bg-ink min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">The Journal</p>
        <h1 className="font-display text-4xl md:text-6xl text-paper mb-16 max-w-2xl text-balance">
          Notes on craft, material, and the way we work.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <article className="group cursor-pointer" data-cursor="hover">
                <div className="aspect-[4/3] rounded-md overflow-hidden mb-5">
                  <ProductGlyph
                    category={a.category}
                    gradient={a.gradient}
                    className="w-full h-full transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                </div>
                <p className="text-[11px] tracking-widest2 uppercase text-gold-bright mb-2">{a.tag}</p>
                <h2 className="font-display text-xl text-paper mb-2 group-hover:text-gold-bright transition-colors">
                  {a.title}
                </h2>
                <p className="text-paper/50 text-sm leading-relaxed">{a.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
