import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat');
  const products = await prisma.product.findMany({
    where: { active: true, ...(cat ? { category: cat } : {}) },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json({
    products: products.map((p) => ({ ...p, features: safeArr(p.features) })),
  });
}

function safeArr(s: unknown): string[] {
  if (Array.isArray(s)) return s as string[];
  if (typeof s === 'string') { try { return JSON.parse(s); } catch { return []; } }
  return [];
}
