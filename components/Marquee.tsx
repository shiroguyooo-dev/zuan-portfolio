'use client';

/* Infinite horizontal marquee of tech/brand words. Duplicated track for seam. */
export default function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];
  return (
    <div className="group relative overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee">
        {track.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap font-display text-2xl font-bold text-white/25 transition-colors hover:text-white md:text-3xl"
          >
            {w}
            <span className="text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
