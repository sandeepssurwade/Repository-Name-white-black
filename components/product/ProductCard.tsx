"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { ProductGlyph } from "./ProductGlyph";

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const isWishlisted = wishlist.includes(product.id);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative"
    >
      <motion.div style={{ rotateX, rotateY, transformPerspective: 800 }} className="relative">
        <Link href={`/${product.category}/${product.slug}`} data-cursor="hover">
          <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-ink-soft">
            <ProductGlyph
              category={product.category}
              gradient={product.gradient}
              className="w-full h-full transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="text-[10px] tracking-widest2 uppercase bg-paper text-ink px-2 py-1">New</span>
              )}
              {product.isBestSeller && (
                <span className="text-[10px] tracking-widest2 uppercase bg-gold-bright text-ink px-2 py-1">
                  Best Seller
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              data-cursor="hover"
              aria-label="Toggle wishlist"
              className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center"
            >
              <Heart
                size={14}
                strokeWidth={1.5}
                className={cn("transition-colors", isWishlisted ? "fill-gold-bright text-gold-bright" : "text-paper")}
              />
            </button>

            <div
              className={cn(
                "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-400",
                hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ productId: product.id, size: product.sizes[Math.floor(product.sizes.length / 2)], color: product.colors[0].name, qty: 1 });
                }}
                data-cursor="hover"
                className="flex-1 bg-paper text-ink text-[11px] tracking-widest2 uppercase py-2.5"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView?.(product);
                }}
                data-cursor="hover"
                aria-label="Quick view"
                className="w-10 glass flex items-center justify-center"
              >
                <Eye size={14} strokeWidth={1.5} className="text-paper" />
              </button>
            </div>
          </div>
        </Link>
      </motion.div>

      <div className="pt-4 flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-widest2 uppercase text-stone mb-1">{product.line}</p>
          <Link href={`/${product.category}/${product.slug}`} className="text-paper text-sm hover:text-gold-bright transition-colors" data-cursor="hover">
            {product.name}
          </Link>
          <div className="flex gap-1.5 mt-2">
            {product.colors.map((c) => (
              <span key={c.name} className="w-3 h-3 rounded-full border border-line-inverse" style={{ backgroundColor: c.hex }} title={c.name} />
            ))}
          </div>
        </div>
        <div className="text-right shrink-0 pl-3">
          <span className="text-gold-bright font-mono text-sm">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <p className="text-stone text-xs line-through font-mono">{formatPrice(product.compareAtPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
