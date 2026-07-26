import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-ink min-h-screen flex flex-col items-center justify-center text-center px-5">
      <p className="text-xs tracking-widest2 uppercase text-gold-bright mb-6">Error 404</p>
      <h1 className="font-display text-6xl md:text-8xl text-paper mb-6">Not Found</h1>
      <p className="text-paper/55 text-sm max-w-sm mb-10">
        The piece you&apos;re looking for isn&apos;t in this season&apos;s collection. Let&apos;s get
        you back to the atelier.
      </p>
      <Link
        href="/"
        className="bg-paper text-ink px-8 py-4 text-xs tracking-widest2 uppercase hover:bg-gold-bright transition-colors"
        data-cursor="hover"
      >
        Return Home
      </Link>
    </main>
  );
}
