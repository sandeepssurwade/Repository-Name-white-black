"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Star, Heart, RotateCw, Check, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { ProductGlyph } from "./ProductGlyph";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";
import { Reveal } from "@/components/ui/Reveal";
import { getRelated } from "@/lib/data/products";

const ProductScene3D = dynamic(() => import("@/components/three/ProductScene3D").then((m) => m.ProductScene3D), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-ink-soft" />,
});

export function ProductDetail({ product }: { product: Product }) {
  const [view, setView] = useState<"gallery" | "360">("gallery");
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [color, setColor] = useState(product.colors[0].name);
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const addToCart = useStore((s) => s.addToCart);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addRecentlyViewed = useStore((s) => s.addRecentlyViewed);
  const isWishlisted = wishlist.includes(product.id);

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  const related = getRelated(product, 4);
  const activeColorHex = product.colors.find((c) => c.name === color)?.hex ?? product.colors[0].hex;

  const handleAdd = () => {
    addToCart({ productId: product.id, size, color, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="bg-ink min-h-screen pt-28">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-content px-5 md:px-10 flex items-center gap-2 text-xs text-paper/40 mb-8">
        <Link href="/" className="hover:text-gold-bright transition-colors" data-cursor="hover">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${product.category}`} className="hover:text-gold-bright transition-colors capitalize" data-cursor="hover">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-paper/70">{product.name}</span>
      </div>

      <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery / 360 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setView("gallery")}
              className={cn(
                "text-[11px] tracking-widest2 uppercase px-3 py-1.5 border",
                view === "gallery" ? "border-gold-bright text-gold-bright" : "border-line-inverse text-paper/50"
              )}
              data-cursor="hover"
            >
              Gallery
            </button>
            <button
              onClick={() => setView("360")}
              className={cn(
                "text-[11px] tracking-widest2 uppercase px-3 py-1.5 border flex items-center gap-1.5",
                view === "360" ? "border-gold-bright text-gold-bright" : "border-line-inverse text-paper/50"
              )}
              data-cursor="hover"
            >
              <RotateCw size={11} /> 360° View
            </button>
          </div>

          {view === "gallery" ? (
            <>
              <div className="aspect-square rounded-md overflow-hidden mb-3">
                <ProductGlyph category={product.category} gradient={product.gradient} className="w-full h-full" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden border-2 transition-colors",
                      activeImage === i ? "border-gold-bright" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    data-cursor="hover"
                  >
                    <ProductGlyph category={product.category} gradient={product.gradient} className="w-full h-full" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="aspect-square rounded-md overflow-hidden bg-ink-soft relative">
              <ProductScene3D category={product.category} colorA={activeColorHex} colorB="#e3c17a" />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest2 uppercase text-paper/40">
                Drag to rotate
              </p>
            </div>
          )}
        </div>

        {/* Purchase panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-3">{product.line}</p>
          <h1 className="font-display text-3xl md:text-4xl text-paper mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.round(product.rating) ? "fill-gold-bright text-gold-bright" : "text-stone"}
                />
              ))}
            </div>
            <span className="text-paper/45 text-xs">{product.reviewCount} reviews</span>
            <span className="text-paper/20">·</span>
            <span className="text-paper/45 text-xs font-mono">SKU {product.sku}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-gold-bright font-mono text-2xl">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-stone font-mono text-base line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="text-paper/60 text-sm leading-relaxed mb-8">{product.description}</p>

          <div className="mb-6">
            <p className="text-xs tracking-widest2 uppercase text-stone mb-3">
              Color — <span className="text-paper/70">{color}</span>
            </p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={cn(
                    "w-9 h-9 rounded-full border-2 transition-all",
                    color === c.name ? "border-gold-bright scale-110" : "border-transparent"
                  )}
                  data-cursor="hover"
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs tracking-widest2 uppercase text-stone mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "px-4 py-2.5 text-xs font-mono border transition-colors",
                    size === s ? "border-gold-bright text-gold-bright bg-gold-bright/10" : "border-line-inverse text-paper/70 hover:border-paper/40"
                  )}
                  data-cursor="hover"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={handleAdd}
              className={cn(
                "flex-1 py-4 text-xs tracking-widest2 uppercase transition-colors flex items-center justify-center gap-2",
                added ? "bg-gold text-ink" : "bg-paper text-ink hover:bg-gold-bright"
              )}
              data-cursor="hover"
            >
              {added ? (
                <>
                  <Check size={14} /> Added to Bag
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-14 border border-line-inverse flex items-center justify-center hover:border-gold-bright transition-colors"
              aria-label="Toggle wishlist"
              data-cursor="hover"
            >
              <Heart size={16} className={isWishlisted ? "fill-gold-bright text-gold-bright" : "text-paper"} strokeWidth={1.5} />
            </button>
          </div>

          <div className="border-t border-line-inverse pt-6 mt-8 space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm text-paper/80" data-cursor="hover">
                Materials &amp; Craft
                <ChevronRight size={14} className="transition-transform group-open:rotate-90" />
              </summary>
              <ul className="mt-3 space-y-1.5">
                {product.materials.map((m) => (
                  <li key={m} className="text-paper/50 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-bright" /> {m}
                  </li>
                ))}
              </ul>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm text-paper/80" data-cursor="hover">
                The Story
                <ChevronRight size={14} className="transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-paper/50 text-sm leading-relaxed">{product.story}</p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm text-paper/80" data-cursor="hover">
                Shipping &amp; Returns
                <ChevronRight size={14} className="transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-paper/50 text-sm leading-relaxed">
                Complimentary shipping across India on all orders. 14-day returns from our Ranip
                store or by courier pickup.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mx-auto max-w-content px-5 md:px-10 py-24 border-t border-line-inverse mt-20">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">Customer Reviews</p>
          <h2 className="font-display text-3xl md:text-4xl text-paper mb-12">
            {product.rating.toFixed(1)} out of 5 — {product.reviewCount} reviews
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <div className="border border-line-inverse rounded-md p-6 h-full">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={12} className={s < r.rating ? "fill-gold-bright text-gold-bright" : "text-stone"} />
                  ))}
                </div>
                <p className="text-paper text-sm font-medium mb-2">{r.title}</p>
                <p className="text-paper/50 text-sm leading-relaxed mb-4">{r.body}</p>
                <p className="text-paper/35 text-xs font-mono">{r.author} · {r.date}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-content px-5 md:px-10 pb-28">
        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-4">You May Also Like</p>
          <h2 className="font-display text-3xl md:text-4xl text-paper mb-12">Related Pieces</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} onQuickView={setQuickView} />
            </Reveal>
          ))}
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
}
