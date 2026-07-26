"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "@/components/product/QuickView";
import { Product } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.line.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="bg-ink min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Search</p>
        <div className="flex items-center gap-4 border-b border-line-inverse pb-6 mb-14">
          <SearchIcon size={22} strokeWidth={1.3} className="text-paper/40" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shoes, watches, wallets…"
            className="flex-1 bg-transparent font-display text-3xl md:text-5xl text-paper placeholder:text-paper/25 outline-none"
          />
        </div>

        {query && (
          <p className="text-paper/45 text-sm mb-8">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {results.map((p, i) => (
            <Reveal key={p.id} delay={(i % 8) * 60}>
              <ProductCard product={p} onQuickView={setQuickView} />
            </Reveal>
          ))}
        </div>
      </div>
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
}
