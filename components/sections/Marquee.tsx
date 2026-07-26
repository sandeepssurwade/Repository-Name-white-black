export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-line-inverse py-6 overflow-hidden bg-ink">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-paper/15 px-8 flex items-center gap-8 shrink-0"
          >
            {item}
            <span className="text-gold-bright/40 text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
