"use client";

import { useMemo, useState } from "react";
import { Product, Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Filters, SortKey } from "./Filters";
import { QuickView } from "./QuickView";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGlyph } from "./ProductGlyph";

export function CollectionPage({
  category,
  tagline,
  intro,
  products,
}: {
  category: Category;
  tagline: string;
  intro: string;
  products: Product[];
}) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const uniqueColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const filtered = useMemo(() => {
    let list = activeColor ? products.filter((p) => p.colors.some((c) => c.name === activeColor)) : [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [products, activeColor, sort]);

  const heroProduct = products[0];

  return (
    <main className="bg-ink min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {heroProduct && (
            <ProductGlyph category={category} gradient={heroProduct.gradient} className="w-full h-full opacity-70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        </div>
        <div className="relative mx-auto max-w-content px-5 md:px-10 pb-16 w-full">
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">The Collection</p>
          <h1 className="font-display text-[13vw] md:text-7xl leading-[0.95] text-paper mb-4 capitalize">
            <RevealText text={category} />
          </h1>
          <p className="text-paper/60 max-w-md text-sm md:text-base">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 md:px-10 py-14">
        <Reveal>
          <p className="text-paper/60 max-w-2xl text-sm md:text-base leading-relaxed">{intro}</p>
        </Reveal>

        <Filters
          colors={uniqueColors}
          activeColor={activeColor}
          onColor={setActiveColor}
          sort={sort}
          onSort={setSort}
          count={filtered.length}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 mt-10">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 8) * 60}>
              <ProductCard product={p} onQuickView={setQuickViewProduct} />
            </Reveal>
          ))}
        </div>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  );
}
