"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shoes", label: "Shoes" },
  { href: "/watches", label: "Watches" },
  { href: "/clothes", label: "Clothes" },
  { href: "/wallets", label: "Wallets" },
  { href: "/perfumes", label: "Perfumes" },
  { href: "/belts", label: "Belts" },
  { href: "/journal", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const setCartOpen = useStore((s) => s.setCartOpen);

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-line-inverse py-3" : "py-6"
      )}
    >
      <div className="mx-auto max-w-content px-5 md:px-10 flex items-center justify-between">
        <Link href="/" className="font-display text-lg md:text-xl tracking-[0.28em] text-paper" data-cursor="hover">
          WHITE&nbsp;&amp;&nbsp;BLACK
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] tracking-widest2 uppercase text-paper/75 hover:text-gold-bright transition-colors duration-300"
              data-cursor="hover"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <Link href="/search" aria-label="Search" data-cursor="hover" className="text-paper/85 hover:text-gold-bright transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" data-cursor="hover" className="relative text-paper/85 hover:text-gold-bright transition-colors">
            <Heart size={18} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full bg-gold text-ink flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Cart"
            data-cursor="hover"
            onClick={() => setCartOpen(true)}
            className="relative text-paper/85 hover:text-gold-bright transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full bg-gold text-ink flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden text-paper"
            aria-label="Menu"
            onClick={() => setOpen(true)}
            data-cursor="hover"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-5 py-6">
            <span className="font-display tracking-[0.28em] text-paper">WHITE &amp; BLACK</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-paper">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 mt-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 border-b border-line-inverse font-display text-3xl text-paper"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-5 py-8 text-paper/50 text-xs font-mono">
            Ranip, Ahmedabad, Gujarat — +91 76008 47294
          </div>
        </div>
      )}
    </header>
  );
}
