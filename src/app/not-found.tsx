import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl">🔇</p>
      <h1 className="text-3xl font-black">404</h1>
      <p className="text-zinc-400">
        Esta canción no existe en la playlist. / This track isn&apos;t in the
        playlist.
      </p>
      <Link
        href="/"
        className="rounded-full bg-spotify px-6 py-3 font-bold text-black transition-transform hover:scale-105"
      >
        Inicio / Home
      </Link>
    </div>
  );
}
