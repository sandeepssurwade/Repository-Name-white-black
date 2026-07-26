export type Category =
  | "shoes"
  | "watches"
  | "clothes"
  | "wallets"
  | "perfumes"
  | "belts";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  category: Category;
  name: string;
  line: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  story: string;
  materials: string[];
  sku: string;
  gradient: [string, string];
  reviews: Review[];
}

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  qty: number;
}
