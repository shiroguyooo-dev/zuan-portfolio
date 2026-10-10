import Link from 'next/link';
import { site } from '@/lib/db';

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl font-semibold">
              Let&apos;s build something.
            </h3>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              {site.tagline}
            </p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="btn-neon mt-6 inline-block rounded-lg px-5 py-3 text-sm"
            >
              Chat via WhatsApp
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">Socials</p>
            <ul className="mt-4 space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-white/70 transition hover:text-neon"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>{site.email}</li>
              <li>+{site.whatsapp}</li>
              <li>{site.location}</li>
            </ul>
            <Link
              href="/store"
              className="mt-4 inline-block text-sm text-neon hover:underline"
            >
              Lihat semua produk →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} {site.owner}. Built with Next.js.</p>
          <p className="font-display tracking-wide">{site.handle}</p>
        </div>
      </div>
    </footer>
  );
}
