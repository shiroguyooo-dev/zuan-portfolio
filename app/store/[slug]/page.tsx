import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';
import { rupiah } from '@/lib/db';

export const dynamic = 'force-dynamic';

function safeArr(s: unknown): string[] {
  if (Array.isArray(s)) return s as string[];
  if (typeof s === 'string') { try { return JSON.parse(s); } catch { return []; } }
  return [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  let p: any = null;
  try {
    p = await prisma.product.findUnique({ where: { slug: params.slug } });
  } catch {
    p = null;
  }
  if (!p || !p.active) notFound();

  const features = safeArr(p.features);
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <nav className="text-sm text-white/45">
        <a href="/store" className="hover:text-neon">Store</a>
        <span className="mx-2">/</span>
        <span className="text-white/70">{p.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* left: info */}
        <div>
          <div className="flex items-center gap-3">
            {p.badge && (
              <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-[11px] font-bold text-violet-300">
                {p.badge}
              </span>
            )}
            {off > 0 && (
              <span className="rounded-full border border-lime-400/30 bg-lime-500/15 px-3 py-1 text-[11px] font-bold text-lime-300">
                Hemat {off}%
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">{p.name}</h1>
          <p className="mt-2 text-lg text-white/60">{p.tagline}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-neon">
              {rupiah(p.price)}
            </span>
            {p.compareAt && (
              <span className="pb-1 text-lg text-white/35 line-through">
                {rupiah(p.compareAt)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-white/65">{p.description}</p>

          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime/15 text-[11px] text-lime">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4 text-xs text-white/45">
            <span>Stok: {p.stock}</span>
            <span>·</span>
            <span>Garansi & support via WA</span>
          </div>
        </div>

        {/* right: checkout */}
        <CheckoutForm
          productId={p.id}
          slug={p.slug}
          name={p.name}
          price={p.price}
        />
      </div>
    </section>
  );
}
