import { Category } from "@/lib/types";

const glyphs: Record<Category, string> = {
  shoes:
    "M20 78 C 35 60, 45 40, 70 34 C 95 28, 120 32, 145 40 C 165 46, 175 56, 178 66 C 180 74, 172 80, 160 80 L 30 80 C 24 80, 18 82, 20 78 Z M 60 40 L 55 62 M 82 36 L 78 60 M 104 34 L 101 58",
  watches:
    "M100 40 A40 40 0 1 1 99.9 40 M100 60 L100 100 M100 100 L124 112 M86 24 L114 24 L114 40 L86 40 Z M86 160 L114 160 L114 144 L86 144 Z",
  clothes:
    "M70 30 L100 44 L130 30 L150 46 L138 64 L128 58 L128 160 L72 160 L72 58 L62 64 L50 46 Z",
  wallets:
    "M24 60 L176 60 L176 140 L24 140 Z M24 60 L60 40 L176 40 L176 60 M120 90 L160 90 L160 110 L120 110 Z",
  perfumes:
    "M90 30 L110 30 L110 46 L120 56 L120 80 L80 80 L80 56 L90 46 Z M80 80 L120 80 L124 170 L76 170 Z M88 100 L112 100 M88 118 L112 118 M88 136 L112 136",
  belts:
    "M20 100 L180 100 M60 78 L60 122 L140 122 L140 78 Z M85 85 L95 95 M95 85 L85 95 M105 105 L115 115 M115 105 L105 115",
};

export function ProductGlyph({
  category,
  gradient,
  accent = "#e3c17a",
  className,
}: {
  category: Category;
  gradient: [string, string];
  accent?: string;
  className?: string;
}) {
  const gid = `grad-${category}-${gradient[0].replace("#", "")}`;
  return (
    <svg viewBox="0 0 200 200" className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
        <radialGradient id={`${gid}-sheen`} cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${gid})`} />
      <rect width="200" height="200" fill={`url(#${gid}-sheen)`} />
      <path
        d={glyphs[category]}
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.92}
      />
    </svg>
  );
}
