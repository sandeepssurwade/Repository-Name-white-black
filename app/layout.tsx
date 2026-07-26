import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import FloatingContact from "@/components/layout/FloatingContact";
import CustomCursor from "@/components/cursor/CustomCursor";
import GoldThread from "@/components/sections/GoldThread";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whiteandblack.example.com"),
  title: {
    default: "WHITE & BLACK — The Fashion Hub | Luxury Shoes, Watches & Leather Goods",
    template: "%s | WHITE & BLACK",
  },
  description:
    "WHITE & BLACK — The Fashion Hub. Luxury crafted shoes, watches, clothing, wallets, perfumes and belts, from our atelier in Ranip, Ahmedabad.",
  keywords: [
    "luxury shoes",
    "luxury fashion Ahmedabad",
    "designer watches India",
    "premium leather goods",
    "White and Black Fashion Hub",
  ],
  openGraph: {
    title: "WHITE & BLACK — The Fashion Hub",
    description: "Luxury Crafted For Every Step.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "WHITE & BLACK — The Fashion Hub",
    description: "Luxury Crafted For Every Step.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-paper">
        <SmoothScrollProvider>
          <CustomCursor />
          <GoldThread />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <FloatingContact />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
