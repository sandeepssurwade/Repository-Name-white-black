import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ProductGlyph } from "@/components/product/ProductGlyph";
import { getByCategory } from "@/lib/data/products";
import StoreVisit from "@/components/sections/StoreVisit";

export const metadata: Metadata = {
  title: "Brand Story",
  description: "The story of WHITE & BLACK — The Fashion Hub, an atelier in Ranip, Ahmedabad.",
};

const milestones = [
  { year: "The Idea", text: "Founded on a simple belief: a wardrobe built from six categories, held to one uncompromising standard, beats a hundred disposable trends." },
  { year: "The Atelier", text: "A small team of leather-workers, tailors and finishers set up in Ranip, choosing craft over scale from day one." },
  { year: "The Signature", text: "The Onyx Sneaker and Monolith Derby become the house's defining silhouettes — worn far longer than any season demanded." },
  { year: "Today", text: "Six collections, one storefront, and a growing house of clients who return for the fit, not the logo." },
];

export default function AboutPage() {
  const gallery = [
    getByCategory("shoes")[2],
    getByCategory("watches")[1],
    getByCategory("clothes")[0],
    getByCategory("perfumes")[2],
  ];

  return (
    <main className="bg-ink min-h-screen">
      <section className="pt-40 pb-24 mx-auto max-w-content px-5 md:px-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-6">The Brand Story</p>
        <h1 className="font-display text-5xl md:text-7xl text-paper max-w-3xl leading-[1.05] text-balance">
          <RevealText text="Restraint is the loudest thing we make." />
        </h1>
        <p className="mt-8 text-paper/60 max-w-xl text-base leading-relaxed">
          WHITE &amp; BLACK — The Fashion Hub began as a single storefront in Ranip, Ahmedabad,
          built on a conviction that luxury doesn&apos;t need to shout. Every collection since has
          followed the same rule: fewer pieces, made better.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2 md:px-5">
        {gallery.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className="aspect-[3/4]">
            <ProductGlyph category={p.category} gradient={p.gradient} className="w-full h-full rounded-sm" />
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-content px-5 md:px-10 py-28">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">How We Got Here</p>
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-16 max-w-lg text-balance">
            A short, honest timeline.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 100}>
              <div className="border-t border-gold pt-5">
                <p className="font-display text-xl text-paper mb-3">{m.year}</p>
                <p className="text-paper/55 text-sm leading-relaxed">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StoreVisit />
    </main>
  );
}
