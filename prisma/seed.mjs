import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    slug: 'bug-wa',
    name: 'Bug WhatsApp',
    tagline: 'Paket bug & crash lengkap untuk WA',
    description:
      'Koleksi payload bug WhatsApp yang udah diuji: kirim dari chat, group, atau WA Business. Termasuk bug yang bikin WA lawan crash, force close, dan hang. Dikit-dikit update kalau WA nge-patch, lo dapet update gratis di pack yang sama.',
    price: 35000,
    compareAt: 75000,
    category: 'bug',
    badge: 'HOT',
    features: [
      '30+ payload siap pakai',
      'Support WA stable & WA Business',
      'Kirim via chat pribadi / group',
      'Update gratis saat WA nge-patch',
      'Ada guide cara pakai + anti-backfire',
    ],
    stock: 999,
    featured: true,
  },
  {
    slug: 'bug-wa-pro',
    name: 'Bug WhatsApp Pro',
    tagline: 'Bug premium — payload eksklusif + metode baru',
    description:
      'Versi Pro dari pack bug. Payload eksklusif yang belum beredar luas, metode kirim lewat flow baru (status, channel, business catalog), plus bypass proteksi terbaru WhatsApp. Dikirim lengkap dengan changelog.',
    price: 85000,
    compareAt: 150000,
    category: 'bug',
    badge: 'NEW',
    features: [
      'Payload eksklusif (tidak publik)',
      'Metode via status & channel',
      'Bypass proteksi WA terbaru',
      'Prioritas update 24 jam',
      'Support via WA pribadi',
    ],
    stock: 120,
    featured: true,
  },
  {
    slug: 'am-premium',
    name: 'AM Premium',
    tagline: 'Akses AM Premium siap pakai',
    description:
      'Akun AM Premium dengan semua fitur premium unlocked. Dikirim beserta data akun & panduan setup di device lo. Cocok buat yang mau akses penuh tanpa ribet.',
    price: 45000,
    compareAt: 90000,
    category: 'premium',
    badge: 'BEST',
    features: [
      'Semua fitur premium unlocked',
      'Data akun + panduan setup',
      'Aktivasi di device lo',
      'Garansi replace 3 hari',
      'Support via WA',
    ],
    stock: 250,
    featured: true,
  },
  {
    slug: 'am-premium-plus',
    name: 'AM Premium Plus',
    tagline: 'AM Premium + mod privacy & fitur ekstra',
    description:
      'Versi Plus dari AM Premium. Tambah mod privacy, opsi akses lanjutan, dan fitur ekstra yang nggak ada di versi biasa. Untuk yang mau kontrol penuh.',
    price: 75000,
    compareAt: 140000,
    category: 'premium',
    features: [
      'Semua fitur AM Premium',
      'Mod privacy tambahan',
      'Opsi akses lanjutan',
      'Fitur ekstra eksklusif',
      'Update fitur gratis 1 bulan',
    ],
    stock: 90,
    featured: true,
  },
  {
    slug: 'ai-wa-bot',
    name: 'AI WhatsApp Bot',
    tagline: 'Bot AI auto-reply di WhatsApp lo',
    description:
      'Bot yang jawab otomatis chat WA lo pakai AI. Bisa set kepribadian, bahasa (ID/EN), dan aturan balasan. Auto-reply 24/7, kualitas jawaban natural, tinggal scan QR.',
    price: 65000,
    compareAt: 120000,
    category: 'ai',
    badge: 'NEW',
    features: [
      'Auto-reply pakai AI (natural)',
      'Atur kepribadian bot (ID/EN)',
      'Setup tinggal scan QR',
      'Support chat pribadi & group',
      'Dashboard buat kelola balasan',
    ],
    stock: 300,
    featured: true,
  },
  {
    slug: 'ai-wa-assistant',
    name: 'AI WhatsApp Assistant',
    tagline: 'Asisten AI yang bantu kerjain tugas via WA',
    description:
      'Asisten AI yang lo bisa chat di WA buat minta tolong: rangkum chat, tulis balasan, bikin caption, jawab pertanyaan, translate. Seperti punya sekretaris pribadi di chat lo.',
    price: 55000,
    compareAt: 100000,
    category: 'ai',
    features: [
      'Rangkum chat panjang',
      'Draft balasan & caption',
      'Translate ID <-> EN',
      'Jawab pertanyaan apa aja',
      'Riwayat chat tersimpan',
    ],
    stock: 300,
    featured: true,
  },
  {
    slug: 'ai-wa-image',
    name: 'AI WhatsApp Image Generator',
    tagline: 'Bikin gambar dari chat WA',
    description:
      'Kirim prompt di WA, bot balikin gambar hasil AI. Text-to-image langsung di chat, tanpa buka aplikasi lain. Cocok buat konten, logo draft, atau ide visual cepat.',
    price: 60000,
    compareAt: 110000,
    category: 'ai',
    features: [
      'Text-to-image di WA',
      'Kirim gambar langsung di chat',
      'Beberapa gaya visual',
      'Batch generate',
      'Panduan prompt',
    ],
    stock: 150,
    featured: false,
  },
  {
    slug: 'bundle-all',
    name: 'Bundle Semua Produk',
    tagline: 'Ambil semua — hemat sampai 60%',
    description:
      'Semua produk dalam satu paket: Bug WA + Bug WA Pro + WA Premium + Premium Plus + dua bot AI. Harga bundel jauh lebih murah dari beli satuan. Paling worth buat yang mau lengkap.',
    price: 250000,
    compareAt: 620000,
    category: 'other',
    badge: 'BEST',
    features: [
      'Semua 7 produk di toko',
      'Hemat sampai 60%',
      'Update semua produk gratis 1 bulan',
      'Prioritas support',
    ],
    stock: 60,
    featured: true,
  },
];

async function main() {
  console.log('seeding products…');
  for (const p of products) {
    const data = { ...p, features: JSON.stringify(p.features) };
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    });
  }
  console.log(`done — ${products.length} products`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
