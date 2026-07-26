"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductGlyph } from "@/components/product/ProductGlyph";
import Link from "next/link";

export default function CartDrawer() {
  const isOpen = useStore((s) => s.isCartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);

  const lines = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((l) => l.product);

  const total = lines.reduce((sum, l) => sum + (l.product?.price ?? 0) * l.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-ink-soft z-[80] flex flex-col border-l border-line-inverse"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-line-inverse">
              <p className="font-display text-xl text-paper">Your Bag ({lines.length})</p>
              <button onClick={() => setOpen(false)} aria-label="Close cart" data-cursor="hover">
                <X size={20} className="text-paper" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {lines.length === 0 && (
                <p className="text-paper/50 text-sm">Your bag is empty. Time to explore the collection.</p>
              )}
              {lines.map((l) => (
                <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-4">
                  <div className="w-20 h-24 rounded-md overflow-hidden shrink-0">
                    <ProductGlyph
                      category={l.product!.category}
                      gradient={l.product!.gradient}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-paper text-sm font-medium truncate">{l.product!.name}</p>
                    <p className="text-paper/45 text-xs font-mono mt-1">
                      {l.color} / {l.size}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-line-inverse rounded-full">
                        <button
                          className="p-1.5"
                          onClick={() => updateQty(l.productId, l.size, l.color, l.qty - 1)}
                          data-cursor="hover"
                        >
                          <Minus size={12} className="text-paper" />
                        </button>
                        <span className="text-xs text-paper w-5 text-center font-mono">{l.qty}</span>
                        <button
                          className="p-1.5"
                          onClick={() => updateQty(l.productId, l.size, l.color, l.qty + 1)}
                          data-cursor="hover"
                        >
                          <Plus size={12} className="text-paper" />
                        </button>
                      </div>
                      <span className="text-gold-bright text-sm font-mono">
                        {formatPrice(l.product!.price * l.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(l.productId, l.size, l.color)}
                    aria-label="Remove"
                    data-cursor="hover"
                    className="text-paper/30 hover:text-gold-bright transition-colors self-start"
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {lines.length > 0 && (
              <div className="px-6 py-6 border-t border-line-inverse">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-paper/60 text-sm">Subtotal</span>
                  <span className="text-paper font-mono text-lg">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-gold-bright text-ink py-4 text-xs tracking-widest2 uppercase hover:bg-paper transition-colors"
                  data-cursor="hover"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
