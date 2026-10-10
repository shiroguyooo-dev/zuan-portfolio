import Link from 'next/link';
import { rupiah } from '@/lib/db';

export type ProductView = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number | null;
  category?: string;
  badge?: string | null;
  features?: string[];
};

const catIcon: Record<string, string> = {
  bug: '🐞',
  premium: '💎',
  ai: '🤖',
  other: '📦',
};

const badgeStyle: Record<string, string> = {
  HOT: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
  NEW: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  BEST: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
};

export default function ProductCard({ p }: { p: ProductView }) {
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const icon = catIcon[p.category ?? 'other'] ?? '📦';

  return (
    <Link
      href={`/store/${p.slug}`}
      className="card-hover glass group relative flex flex-col rounded-2xl p-5 shadow-card"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10">
          {icon}
        </span>
        <div className="flex gap-2">
          {off > 0 && (
            <span className="rounded-full border border-lime-400/30 bg-lime-500/15 px-2.5 py-1 text-[10px] font-bold text-lime-300">
              -{off}%
            </span>
          )}
          {p.badge && (
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                badgeStyle[p.badge] ?? 'bg-white/10 text-white/70 border-white/20'
              }`}
            >
              {p.badge}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
        {p.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-white/55">{p.tagline}</p>

      <div className="mt-4 flex items-end gap-2">
        <span className="font-display text-xl font-bold text-neon">
          {rupiah(p.price)}
        </span>
        {p.compareAt && (
          <span className="pb-0.5 text-sm text-white/35 line-through">
            {rupiah(p.compareAt)}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-xs text-white/45">Lihat detail</span>
        <span className="text-neon transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
