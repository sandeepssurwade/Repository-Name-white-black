"use client";

import { cn } from "@/lib/utils";

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export function Filters({
  colors,
  activeColor,
  onColor,
  sort,
  onSort,
  count,
}: {
  colors: { name: string; hex: string }[];
  activeColor: string | null;
  onColor: (c: string | null) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  count: number;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-line-inverse">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs tracking-widest2 uppercase text-stone">{count} Pieces</span>
        <div className="w-px h-4 bg-line-inverse hidden md:block" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => onColor(null)}
            className={cn(
              "text-[11px] tracking-widest2 uppercase px-2 py-1",
              !activeColor ? "text-gold-bright" : "text-paper/50"
            )}
            data-cursor="hover"
          >
            All
          </button>
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => onColor(activeColor === c.name ? null : c.name)}
              aria-label={c.name}
              data-cursor="hover"
              style={{ backgroundColor: c.hex }}
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-all",
                activeColor === c.name ? "border-gold-bright scale-110" : "border-transparent"
              )}
            />
          ))}
        </div>
      </div>

      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortKey)}
        className="bg-transparent border border-line-inverse text-paper text-xs tracking-widest2 uppercase px-4 py-2.5 outline-none"
        data-cursor="hover"
      >
        <option value="featured" className="bg-ink">Featured</option>
        <option value="newest" className="bg-ink">Newest</option>
        <option value="price-asc" className="bg-ink">Price: Low to High</option>
        <option value="price-desc" className="bg-ink">Price: High to Low</option>
      </select>
    </div>
  );
}
