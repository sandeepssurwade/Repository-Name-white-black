"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductGlyph } from "@/components/product/ProductGlyph";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);
  const [promo, setPromo] = useState("");
  const [placed, setPlaced] = useState(false);

  const lines = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((l) => l.product);

  const subtotal = lines.reduce((sum, l) => sum + (l.product?.price ?? 0) * l.qty, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <main className="bg-ink min-h-screen pt-32 pb-28 flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <CheckCircle2 size={40} className="text-gold-bright mx-auto mb-6" strokeWidth={1.2} />
          <h1 className="font-display text-3xl text-paper mb-4">Order placed</h1>
          <p className="text-paper/60 text-sm mb-8">
            Thank you — this is a demo checkout. Our Ranip team will be in touch to confirm sizing
            and delivery. For anything urgent, call +91 76008 47294.
          </p>
          <Link href="/" className="inline-block bg-paper text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors" data-cursor="hover">
            Continue Exploring
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-ink min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <h1 className="font-display text-4xl md:text-6xl text-paper mb-14">Your Bag</h1>

        {lines.length === 0 ? (
          <div className="py-20 text-center border border-line-inverse rounded-md">
            <p className="text-paper/60 mb-6">Your bag is empty.</p>
            <Link href="/shoes" className="inline-block bg-paper text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors" data-cursor="hover">
              Explore the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12">
            <div className="space-y-6">
              {lines.map((l) => (
                <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-5 border-b border-line-inverse pb-6">
                  <div className="w-28 h-32 rounded-md overflow-hidden shrink-0">
                    <ProductGlyph category={l.product!.category} gradient={l.product!.gradient} className="w-full h-full" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] tracking-widest2 uppercase text-stone mb-1">{l.product!.line}</p>
                        <p className="text-paper font-display text-lg">{l.product!.name}</p>
                        <p className="text-paper/45 text-xs font-mono mt-1">{l.color} / {l.size}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(l.productId, l.size, l.color)}
                        className="text-paper/30 hover:text-gold-bright transition-colors"
                        data-cursor="hover"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line-inverse rounded-full">
                        <button className="p-2" onClick={() => updateQty(l.productId, l.size, l.color, l.qty - 1)} data-cursor="hover">
                          <Minus size={13} className="text-paper" />
                        </button>
                        <span className="text-sm text-paper w-6 text-center font-mono">{l.qty}</span>
                        <button className="p-2" onClick={() => updateQty(l.productId, l.size, l.color, l.qty + 1)} data-cursor="hover">
                          <Plus size={13} className="text-paper" />
                        </button>
                      </div>
                      <span className="text-gold-bright font-mono">{formatPrice(l.product!.price * l.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-paper/40 text-xs tracking-widest2 uppercase hover:text-gold-bright transition-colors" data-cursor="hover">
                Clear Bag
              </button>
            </div>

            <div className="border border-line-inverse rounded-md p-7 h-fit">
              <h2 className="font-display text-xl text-paper mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Subtotal</span>
                  <span className="text-paper font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Shipping</span>
                  <span className="text-gold-bright font-mono">Complimentary</span>
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 bg-transparent border border-line-inverse px-3 py-2.5 text-sm text-paper placeholder:text-paper/35 outline-none focus:border-gold-bright transition-colors"
                />
                <button className="border border-line-inverse px-4 text-xs tracking-widest2 uppercase text-paper/70 hover:border-gold-bright transition-colors" data-cursor="hover">
                  Apply
                </button>
              </div>
              <div className="flex justify-between items-center border-t border-line-inverse pt-5 mb-7">
                <span className="text-paper">Total</span>
                <span className="text-gold-bright font-mono text-xl">{formatPrice(total)}</span>
              </div>
              <MagneticButton
                onClick={() => setPlaced(true)}
                className="w-full bg-gold-bright text-ink py-4 text-xs tracking-widest2 uppercase hover:bg-paper transition-colors"
              >
                Checkout
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
