import Link from 'next/link';
import { prisma } from '@/lib/db';
import ProductCard, { ProductView } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

const cats = [
  { key: 'all', label: 'Semua' },
  { key: 'bug', label: '🐞 Bug WA' },
  { key: 'premium', label: '💎 Premium' },
  { key: 'ai', label: '🤖 AI' },
  { key: 'other', label: '📦 Bundle' },
];

export default async function StorePage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const cat = searchParams.cat ?? 'all';
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { active: true, ...(cat !== 'all' ? { category: cat } : {}) },
      orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
    });
  } catch {
    products = [];
  }

  const parse = (p: any): ProductView => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    compareAt: p.compareAt,
    category: p.category,
    badge: p.badge,
    features: safeArr(p.features),
  });

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-neon">Store</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Digital <span className="gradient-text">Store</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Bug WhatsApp, AM Premium, dan AI WhatsApp. Beli, chat, langsung diproses.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {cats.map((c) => {
          const active = c.key === cat;
          return (
            <Link
              key={c.key}
              href={c.key === 'all' ? '/store' : `/store?cat=${c.key}`}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                active
                  ? 'border-neon/50 bg-neon/10 text-neon'
                  : 'border-white/10 bg-white/5 text-white/65 hover:text-white'
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/50">
          Belum ada produk di kategori ini.
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={parse(p)} />
          ))}
        </div>
      )}
    </section>
  );
}

function safeArr(s: unknown): string[] {
  if (Array.isArray(s)) return s as string[];
  if (typeof s === 'string') {
    try { return JSON.parse(s); } catch { return []; }
  }
  return [];
}
