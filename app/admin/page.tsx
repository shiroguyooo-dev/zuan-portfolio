'use client';

import { useEffect, useState } from 'react';
import { rupiah } from '@/lib/db';

type Order = {
  id: string;
  ref: string;
  buyerName: string;
  contact: string;
  qty: number;
  total: number;
  status: string;
  createdAt: string;
  product: { name: string; slug: string };
};

const statusColor: Record<string, string> = {
  pending: 'text-amber-300 border-amber-400/30 bg-amber-500/10',
  paid: 'text-cyan-300 border-cyan-400/30 bg-cyan-500/10',
  delivered: 'text-lime-300 border-lime-400/30 bg-lime-500/10',
  cancelled: 'text-red-300 border-red-400/30 bg-red-500/10',
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/orders', { headers: { 'x-admin-token': token } });
      if (!res.ok) throw new Error('token salah');
      const data = await res.json();
      setOrders(data.orders);
    } catch (e: any) {
      setError(e.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id: string, status: string) {
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((a, o) => a + o.total, 0);

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs uppercase tracking-widest text-violet">Admin</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Order Console</h1>

      <div className="mt-6 flex gap-2">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="admin token"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-neon/50"
        />
        <button onClick={load} className="btn-neon rounded-xl px-5 py-3 text-sm">
          {loading ? '…' : 'Masuk'}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {orders.length > 0 && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat label="Orders" value={String(orders.length)} />
            <Stat label="Revenue" value={rupiah(revenue)} />
            <Stat
              label="Pending"
              value={String(orders.filter((o) => o.status === 'pending').length)}
            />
            <Stat
              label="Delivered"
              value={String(orders.filter((o) => o.status === 'delivered').length)}
            />
          </div>

          <div className="mt-8 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-neon">{o.ref}</p>
                    <p className="mt-1 text-sm text-white/80">
                      {o.product?.name} · {o.qty}x ·{' '}
                      <span className="text-white/50">{o.buyerName}</span>
                    </p>
                    <p className="text-xs text-white/40">{o.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold">{rupiah(o.total)}</p>
                    <span
                      className={`mt-1 inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        statusColor[o.status] ?? 'text-white/60 border-white/20'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-3">
                  {['pending', 'paid', 'delivered', 'cancelled'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(o.id, s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                        o.status === s
                          ? 'border-neon/50 bg-neon/10 text-neon'
                          : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 font-display text-xl font-bold">{value}</p>
    </div>
  );
}
