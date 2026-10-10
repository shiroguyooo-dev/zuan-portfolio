import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function makeRef() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${t}${r}`;
}

// create a new order (public — called from checkout)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, buyerName, contact, note, qty } = body ?? {};

    if (!productId || !buyerName || !contact) {
      return NextResponse.json({ error: 'data kurang lengkap' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.active) {
      return NextResponse.json({ error: 'produk tidak ada' }, { status: 404 });
    }
    if (product.stock <= 0) {
      return NextResponse.json({ error: 'stok habis' }, { status: 409 });
    }

    const count = Math.min(Math.max(1, Number(qty) || 1), product.stock);
    const total = product.price * count;

    const order = await prisma.order.create({
      data: {
        ref: makeRef(),
        productId: product.id,
        buyerName: String(buyerName).slice(0, 80),
        contact: String(contact).slice(0, 120),
        note: note ? String(note).slice(0, 400) : null,
        qty: count,
        total,
      },
    });

    await prisma.product.update({
      where: { id: product.id },
      data: { stock: { decrement: count } },
    });

    return NextResponse.json({ ok: true, ref: order.ref, total: order.total });
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
