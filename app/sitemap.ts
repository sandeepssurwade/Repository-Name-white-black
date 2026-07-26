import { MetadataRoute } from "next";
import { products, categoryMeta } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://whiteandblack.example.com";
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/journal",
    "/search",
    "/wishlist",
    "/cart",
    ...Object.keys(categoryMeta).map((c) => `/${c}`),
  ];

  const productRoutes = products.map((p) => `/${p.category}/${p.slug}`);

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
