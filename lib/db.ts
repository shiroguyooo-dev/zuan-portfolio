import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['error', 'warn'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Site-wide config. Swap these for your own.
export const site = {
  owner: 'Zuan',
  handle: '@zuan',
  tagline: 'Digital tools, WhatsApp utilities, and AI bots — built fast, shipped clean.',
  email: 'zuansieun@gmail.com',
  whatsapp: '62895628138844',
  location: 'Jakarta, ID',
  socials: [
    { label: 'WhatsApp', href: 'https://wa.me/62895628138844' },
    { label: 'GitHub', href: 'https://github.com/zuan' },
    { label: 'Instagram', href: 'https://instagram.com/zuan' },
    { label: 'Email', href: 'mailto:zuansieun@gmail.com' },
  ],
};

export const rupiah = (n: number) =>
  'Rp ' + n.toLocaleString('id-ID');
