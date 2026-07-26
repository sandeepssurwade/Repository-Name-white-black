# WHITE & BLACK — The Fashion Hub

A cinematic, luxury e-commerce experience built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, React Three Fiber, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. This requires normal internet access — `next/font/google` fetches
Fraunces, Inter and IBM Plex Mono at build time, and Google's map embed is used on the Contact,
About and homepage "Visit Us" sections.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Design system

- **Color**: matte black (`ink` #0b0b0c), warm bone white (`paper` #f6f4ef), soft stone gray,
  antique gold (`gold` #b98f4e / `gold-bright` #e3c17a for accents), brushed silver.
- **Type**: Fraunces (display serif, editorial headlines), Inter (body), IBM Plex Mono
  (prices, SKUs, timestamps — a nod to shoemaking tags and ledgers).
- **Signature element — The Gold Thread**: a stitched gold line pinned to the right edge of the
  viewport (`components/sections/GoldThread.tsx`) whose fill tracks scroll progress, referencing
  the shoemaking craft behind the "Luxury Crafted For Every Step" tagline.

## Structure

```
app/                     Next.js App Router routes
  page.tsx               Homepage (3D hero, storytelling scroll, best sellers, store visit)
  shoes/ watches/ clothes/ wallets/ perfumes/ belts/
                          Each has page.tsx (collection) and [slug]/page.tsx (product detail)
  cart/ wishlist/ search/ journal/ contact/ faq/ about/
  layout.tsx              Fonts, providers, nav/footer/cart-drawer chrome
  loading.tsx              Luxury loading screen
  not-found.tsx            404 page
  sitemap.ts / robots.ts   SEO

components/
  three/                 Procedural R3F scenes (ProceduralShoe, FloatingAccessories,
                         HeroScene, ProductScene3D — all built from primitives, no external
                         model files, per project spec)
  product/               ProductCard, ProductGlyph (editorial gradient+line-art placeholder
                         imagery), CollectionPage template, ProductDetail template, Filters,
                         QuickView
  sections/               Hero, Marquee, CollectionsGrid, ScrollStory (pinned GSAP horizontal
                         gallery), Craft, BestSellers, StoreVisit, GoldThread
  layout/                Navbar, Footer, CartDrawer, FloatingContact (WhatsApp/Call)
  ui/                    MagneticButton, Reveal, RevealText
  providers/              SmoothScrollProvider (Lenis + GSAP ScrollTrigger wiring)

lib/
  data/products.ts       48 dummy luxury products across all six collections
  store.ts                Zustand store: cart, wishlist, recently viewed, compare list
  types.ts / utils.ts
```

## Notes on placeholder imagery

No product photography was supplied, so every product uses `ProductGlyph`: a procedural
gradient plate with a hand-drawn line-art glyph per category, generated entirely in SVG. This
keeps the visual language consistent and on-brand rather than using generic stock photography
or broken image links. Swap in real photography by replacing `ProductGlyph` usage with
`next/image` once assets are available — the component boundary is intentionally isolated for
that purpose.

## Business information

WHITE & BLACK — The Fashion Hub, Ranip, Ahmedabad, Gujarat, India
+91 76008 47294 · Mon–Sat 11:00 AM–9:30 PM · Sun 11:00 AM–9:00 PM
