import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-5 text-center">
      <div>
        <p className="font-display text-7xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Halaman nggak ada</h1>
        <p className="mt-2 text-white/55">Yang lo cari udah pindah atau nggak pernah ada.</p>
        <Link href="/" className="btn-neon mt-6 inline-block rounded-xl px-6 py-3 text-sm">
          Balik ke Home
        </Link>
      </div>
    </section>
  );
}
