# Zuan — Portfolio & Store

Portfolio pribadi + toko digital. Dibangun pakai Next.js 14 (App Router),
Tailwind, Prisma, dan Postgres. Siap deploy ke Vercel.

## Fitur

- Landing page dengan hero, statistik animasi, portfolio, dan preview produk
- Store: katalog, filter kategori, halaman detail produk
- Checkout: form order → tersimpan di DB → konfirmasi via WhatsApp
- Admin console (`/admin`) dengan token gate: lihat & update status order
- Tema dark/neon, animasi scroll-reveal, cursor aura, count-up

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Vercel Postgres / Neon / Supabase / Postgres lokal)

## Jalanin lokal

```bash
npm install
cp .env.example .env          # isi DATABASE_URL + ADMIN_TOKEN
npx prisma db push            # bikin tabel
node prisma/seed.mjs          # isi 8 produk contoh
npm run dev                   # http://localhost:3000
```

Butuh Postgres jalan. Kalau belum ada:

```bash
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:17
# DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=public"
```

## Deploy ke Vercel

1. **Push ke GitHub**

   ```bash
   git init && git add -A && git commit -m "init"
   git remote add origin git@github.com:<user>/portfolio-store.git
   git push -u origin main
   ```

2. **Bikin database Postgres gratis**
   - Di dashboard Vercel: **Storage → Create Database → Postgres** (atau pakai Neon: https://neon.tech)
   - Copy connection string-nya.

3. **Import project di Vercel**
   - vercel.com → **Add New → Project** → pilih repo GitHub lo
   - Framework otomatis ke-detect: Next.js

4. **Set Environment Variables** (Project → Settings → Environment Variables)
   - `DATABASE_URL` = connection string Postgres lo (pakai yang pooled)
   - `ADMIN_TOKEN` = token rahasia buat halaman admin

5. **Deploy**
   - Vercel bakal jalanin `vercel.json`: `prisma generate && prisma db push && node prisma/seed.mjs && next build`
   - Tabel dibuat otomatis, produk di-seed otomatis.

6. **Selesai** → lo dapet `https://<nama-project>.vercel.app`

## Ganti domain sendiri

Setelah punya `.dev` / `.my.id` / `.com`:

Vercel → Project → **Settings → Domains** → Add domain lo →
arahkan DNS sesuai instruksi (biasanya `A` ke `76.76.21.21` atau `CNAME` ke `cname.vercel-dns.com`).

## Struktur

```
app/                halaman (landing, store, admin) + API routes
components/          navbar, footer, card, FX, dst
lib/db.ts           prisma client + config site (nama, kontak, sosial)
prisma/schema.prisma model Product, Order, Message
prisma/seed.mjs     8 produk contoh
public/art/         artwork SVG (hero + portfolio)
```

## Ubah data diri

Semua identitas ada di `lib/db.ts` → objek `site`: nama, handle, email,
nomor WhatsApp, sosmed. Ganti di situ, semua halaman ikut berubah.

## Keamanan

- `ADMIN_TOKEN` wajib diganti sebelum live (default `admin-dev-token`)
- Order di-create lewat `POST /api/orders` (publik, ada validasi stok)
- List & update order cuma lewat `GET/PATCH /api/admin/orders` (butuh header `x-admin-token`)
