import Link from 'next/link';
import { prisma, site } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import CountUp from '@/components/CountUp';
import Marquee from '@/components/Marquee';

export const dynamic = 'force-dynamic';

const work = [
  {
    title: 'WhatsApp Utility Suite',
    year: '2025',
    art: '/art/work-1.svg',
    desc: 'Toolkit internal buat kerja cepat di WhatsApp: auto-reply, ekspor chat, dan bot asisten.',
    tags: ['Node', 'Baileys', 'AI'],
  },
  {
    title: 'AM Automation Platform',
    year: '2025',
    art: '/art/work-2.svg',
    desc: 'Platform automation AM dengan dashboard, jadwal, dan modul akses premium.',
    tags: ['Next.js', 'Postgres', 'Queue'],
  },
  {
    title: 'AI Assistant Console',
    year: '2024',
    art: '/art/work-3.svg',
    desc: 'Konsol AI buat rangkum chat, draft balasan, dan translate — dipakai di WA & web.',
    tags: ['Python', 'LLM', 'FastAPI'],
  },
  {
    title: 'Realtime Ops Dashboard',
    year: '2024',
    art: '/art/work-4.svg',
    desc: 'Dashboard monitoring realtime dengan WebSocket, chart live, dan alerting.',
    tags: ['React', 'WS', 'Redis'],
  },
];

const skills = [
  'TypeScript', 'Next.js', 'React', 'Node.js', 'Python',
  'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Tailwind', 'LLM / AI', 'Automation',
];

export default async function Home() {
  let featured: any[] = [];
  try {
    featured = await prisma.product.findMany({
      where: { active: true, featured: true },
      orderBy: { createdAt: 'asc' },
      take: 6,
    });
  } catch {
    featured = [];
  }

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="grid-lines relative overflow-hidden">
        <img
          src="/art/hero.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime shadow-[0_0_12px_#a3e635]" />
            Available for work
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Hi, gua {site.owner}.
            <br />
            Gua bangun <span className="gradient-text">digital tools</span>
            <br className="hidden md:block" /> &amp; <span className="gradient-text">AI bots</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/60">{site.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/store" className="btn-neon rounded-xl px-6 py-3.5 text-sm">
              Jelajahi Store
            </Link>
            <a
              href="#work"
              className="rounded-xl border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:bg-white/5 hover:border-white/25"
            >
              Lihat Work
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: 50, s: '+', v: 'Project selesai' },
              { n: 3, s: 'th+', v: 'Tahun pengalaman' },
              { n: 100, s: '+', v: 'Client puas' },
              { n: 24, s: '/7', v: 'Support' },
            ].map((st) => (
              <div key={st.v}>
                <p className="font-display text-3xl font-bold text-white md:text-4xl">
                  <CountUp to={st.n} suffix={st.s} />
                </p>
                <p className="mt-1 text-sm text-white/50">{st.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <Marquee
          items={[
            'WhatsApp Tools', 'AI Bots', 'Automation', 'Digital Store',
            'Reverse Engineering', 'Web Apps', 'Premium Access', 'Full-Stack',
          ]}
        />
      </section>

      {/* ---------------- WORK ---------------- */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-20">
        <div className="reveal">
          <p className="text-xs uppercase tracking-widest text-neon">Portfolio</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Yang udah gua kerjain
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {work.map((w, i) => (
            <article
              key={w.title}
              className="card-hover glass reveal group overflow-hidden rounded-2xl shadow-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-[8/5] overflow-hidden">
                <img
                  src={w.art}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-display text-xs text-neon backdrop-blur">
                  {w.year}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-white/55">{w.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="reveal flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-violet">Store</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Produk unggulan
            </h2>
          </div>
          <Link href="/store" className="hidden text-sm text-neon hover:underline md:block">
            Semua produk →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
            Produk belum ke-seed.
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <ProductCard
                  p={{
                    slug: p.slug,
                    name: p.name,
                    tagline: p.tagline,
                    price: p.price,
                    compareAt: p.compareAt,
                    category: p.category,
                    badge: p.badge,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="reveal">
          <p className="text-xs uppercase tracking-widest text-lime">Stack</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Tools yang gua pakai tiap hari
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((s) => (
              <span
                key={s}
                className="glass rounded-xl px-4 py-2.5 text-sm text-white/75 transition hover:text-white hover:border-neon/30"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="glass grid-lines reveal relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold md:text-5xl">
            Butuh <span className="gradient-text">tool</span> atau{' '}
            <span className="gradient-text">bot</span> custom?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/60">
            Ceritain kebutuhan lo. Gua bantu dari konsep, build, sampai deploy.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="btn-neon rounded-xl px-6 py-3.5 text-sm"
            >
              Chat Sekarang
            </a>
            <Link
              href="/store"
              className="rounded-xl border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:bg-white/5"
            >
              Lihat Store
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
