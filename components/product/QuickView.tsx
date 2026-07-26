"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductGlyph } from "./ProductGlyph";
import { useStore } from "@/lib/store";
import { useState } from "react";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const addToCart = useStore((s) => s.addToCart);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-3xl w-[calc(100%-2rem)] md:w-full bg-ink-soft z-[80] rounded-lg overflow-hidden border border-line-inverse"
            initial={{ opacity: 0, scale: 0.95, y: "-45%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-45%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <ProductGlyph category={product.category} gradient={product.gradient} className="w-full h-full" />
              </div>
              <div className="p-8 relative">
                <button onClick={onClose} className="absolute top-5 right-5 text-paper/60 hover:text-gold-bright" data-cursor="hover">
                  <X size={20} strokeWidth={1.5} />
                </button>
                <p className="text-[11px] tracking-widest2 uppercase text-stone mb-2">{product.line}</p>
                <h3 className="font-display text-2xl text-paper mb-3">{product.name}</h3>
                <p className="text-gold-bright font-mono text-lg mb-4">{formatPrice(product.price)}</p>
                <p className="text-paper/60 text-sm leading-relaxed mb-6">{product.description}</p>

                <p className="text-xs tracking-widest2 uppercase text-stone mb-2">Color</p>
                <div className="flex gap-2 mb-5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${color === c.name ? "border-gold-bright scale-110" : "border-transparent"}`}
                      data-cursor="hover"
                      aria-label={c.name}
                    />
                  ))}
                </div>

                <p className="text-xs tracking-widest2 uppercase text-stone mb-2">Size</p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-1.5 text-xs border font-mono transition-colors ${size === s ? "border-gold-bright text-gold-bright" : "border-line-inverse text-paper/70"}`}
                      data-cursor="hover"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart({
                        productId: product.id,
                        size: size ?? product.sizes[0],
                        color: color ?? product.colors[0].name,
                        qty: 1,
                      });
                      onClose();
                    }}
                    className="flex-1 bg-gold-bright text-ink text-xs tracking-widest2 uppercase py-3.5 hover:bg-paper transition-colors"
                    data-cursor="hover"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/${product.category}/${product.slug}`}
                    onClick={onClose}
                    className="flex-1 border border-line-inverse text-paper text-xs tracking-widest2 uppercase py-3.5 flex items-center justify-center hover:border-gold-bright transition-colors"
                    data-cursor="hover"
                  >
                    Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
