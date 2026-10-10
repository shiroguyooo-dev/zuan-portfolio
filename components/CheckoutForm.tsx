'use client';

import { useState } from 'react';
import { rupiah, site } from '@/lib/db';

export default function CheckoutForm({
  productId,
  slug,
  name,
  price,
}: {
  productId: string;
  slug: string;
  name: string;
  price: number;
}) {
  const [buyerName, setBuyerName] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [ref, setRef] = useState('');

  const total = price * qty;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, buyerName, contact, note, qty }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'checkout gagal');
      setRef(data.ref);
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="glass rounded-2xl p-6 shadow-card">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-lime/20 text-2xl">
          ✓
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold">Order diterima!</h3>
        <p className="mt-2 text-sm text-white/60">
          Kode order lo: <span className="font-mono text-neon">{ref}</span>
        </p>
        <p className="mt-4 text-sm text-white/60">
          Kirim kode ini via WhatsApp buat konfirmasi & pembayaran. Setelah bayar,
          produk langsung dikirim.
        </p>
        <a
          href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
            `Halo, gua mau bayar order ${ref} — ${name} (${qty}x, ${rupiah(total)})`
          )}`}
          className="btn-neon mt-5 block rounded-xl px-5 py-3 text-center text-sm"
        >
          Konfirmasi via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow-card">
      <h3 className="font-display text-lg font-semibold">Checkout</h3>
      <p className="mt-1 text-sm text-white/50">Isi data, order langsung diproses.</p>

      <label className="mt-5 block text-xs uppercase tracking-wide text-white/45">
        Nama
        <input
          required
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-neon/50"
          placeholder="Nama lo"
        />
      </label>

      <label className="mt-4 block text-xs uppercase tracking-wide text-white/45">
        WA / Email
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-neon/50"
          placeholder="08xx atau email"
        />
      </label>

      <label className="mt-4 block text-xs uppercase tracking-wide text-white/45">
        Jumlah
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-lg"
          >
            −
          </button>
          <span className="w-10 text-center font-display text-lg">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(Math.min(99, qty + 1))}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-lg"
          >
            +
          </button>
        </div>
      </label>

      <label className="mt-4 block text-xs uppercase tracking-wide text-white/45">
        Catatan (opsional)
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-neon/50"
          placeholder="Request khusus…"
        />
      </label>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-white/50">Total</span>
        <span className="font-display text-xl font-bold text-neon">{rupiah(total)}</span>
      </div>

      {state === 'error' && (
        <p className="mt-3 text-sm text-red-400">Checkout gagal. Coba lagi.</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-neon mt-5 w-full rounded-xl px-5 py-3.5 text-sm disabled:opacity-60"
      >
        {state === 'loading' ? 'Memproses…' : 'Buat Order'}
      </button>
      <p className="mt-3 text-center text-[11px] text-white/40">
        Pembayaran dikonfirmasi manual via WhatsApp.
      </p>
    </form>
  );
}
