'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/db';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/store', label: 'Store' },
    { href: '/#work', label: 'Work' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-ink/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-neon to-violet text-ink font-display font-bold">
            {site.owner[0]}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {site.owner}<span className="text-neon">.</span>
          </span>
        </Link>

        <div className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/store" className="btn-neon ml-2 rounded-lg px-4 py-2 text-sm">
            Buka Store
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 md:hidden"
          aria-label="menu"
        >
          <span className="text-lg">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store"
            onClick={() => setOpen(false)}
            className="btn-neon mt-2 block rounded-lg px-3 py-3 text-center text-sm"
          >
            Buka Store
          </Link>
        </div>
      )}
    </header>
  );
}
