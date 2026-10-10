import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Token gate for the admin console. Change ADMIN_TOKEN in .env.
function authed(req: Request) {
  const token = req.headers.get('x-admin-token') ?? '';
  return Boolean(token) && token === (process.env.ADMIN_TOKEN ?? 'admin-dev-token');
}

// list all orders
export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: { select: { name: true, slug: true } } },
  });
  return NextResponse.json({ orders });
}

// update one order's status
export async function PATCH(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  const allowed = ['pending', 'paid', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'status invalid' }, { status: 400 });
  }
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, order });
}
