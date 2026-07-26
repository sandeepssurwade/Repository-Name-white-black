"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "@/components/product/QuickView";
import { Product } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="bg-ink min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Saved</p>
        <h1 className="font-display text-4xl md:text-6xl text-paper mb-14">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="py-20 text-center border border-line-inverse rounded-md">
            <p className="text-paper/60 mb-6">Nothing saved yet. Start building your edit.</p>
            <Link href="/shoes" className="inline-block bg-paper text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors" data-cursor="hover">
              Explore Shoes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} onQuickView={setQuickView} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
}
