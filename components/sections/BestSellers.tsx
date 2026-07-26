"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "@/components/product/QuickView";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BestSellers({ products }: { products: Product[] }) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <section className="mx-auto max-w-content px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Most Worn</p>
            <h2 className="font-display text-4xl md:text-6xl text-paper text-balance">Best Sellers</h2>
          </div>
          <Link
            href="/shoes"
            className="hidden sm:flex items-center gap-2 text-paper/60 hover:text-gold-bright text-sm transition-colors"
            data-cursor="hover"
          >
            View All <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {products.slice(0, 4).map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProductCard product={p} onQuickView={setQuickView} />
          </Reveal>
        ))}
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
