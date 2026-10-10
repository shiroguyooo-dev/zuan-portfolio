'use client';

import { useEffect } from 'react';

/* Cursor-following aura + card spotlight + scroll reveal, all in one.
   Mounted once in layout. Pure DOM effects, no deps. */
export default function FX() {
  useEffect(() => {
    // 1) spotlight follows pointer on cards
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('.card-hover') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // 2) scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((n) => io.observe(n));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
