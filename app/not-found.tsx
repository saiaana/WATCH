import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | WATCH',
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-black px-4 text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-pink-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-9xl text-[12rem] font-extrabold leading-none text-transparent">
            404
          </h1>
        </div>

        <div className="mb-6 animate-bounce text-6xl">🎬</div>

        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Page Not Found</h2>

        <p className="mx-auto mb-12 max-w-md text-lg text-neutral-400 md:text-xl">
          Oops! The page you&apos;re looking for seems to have left the theater. It might have been
          moved, deleted, or never existed.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95"
          >
            <span className="text-lg">🏠</span>
            <span>Go Home</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
          </Link>

          <Link
            href="/movies"
            className="group relative flex items-center justify-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/80 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:bg-zinc-700/80 active:scale-95"
          >
            <span className="text-lg">🎬</span>
            <span>Browse Movies</span>
          </Link>
        </div>

        <div className="mt-16 border-t border-zinc-800/50 pt-8">
          <p className="mb-4 text-sm text-neutral-500">Or try these pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tvshows"
              className="text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
            >
              TV Shows
            </Link>
            <Link
              href="/trending"
              className="text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
            >
              Trending
            </Link>
            <Link
              href="/upcoming"
              className="text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
            >
              Upcoming
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
