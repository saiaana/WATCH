export default function FeaturedHeroSkeleton() {
  const ratingAndGenres = (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="skeleton-base inline-flex h-6 w-16 items-center gap-1.5 rounded-xl px-3 py-1.5 sm:h-7 sm:w-20" />
      <div className="skeleton-base inline-flex h-6 w-20 items-center gap-1.5 rounded-xl px-3 py-1.5" />
      <div className="skeleton-base inline-flex h-6 w-24 items-center gap-1.5 rounded-xl px-3 py-1.5" />
    </div>
  );

  const title = (
    <div className="mb-5">
      <div className="skeleton-base mb-2 h-9 w-full animate-pulse rounded-lg sm:h-11 sm:w-4/5 md:h-14 lg:h-16" />
      <div className="skeleton-base h-7 w-3/4 animate-pulse rounded-lg sm:h-9 sm:w-2/3 md:h-12 lg:h-14" />
    </div>
  );

  const overview = (
    <div className="mb-7 max-w-2xl sm:mb-9">
      <div className="skeleton-base mb-2 h-[17px] w-full animate-pulse rounded leading-relaxed" />
      <div className="skeleton-base mb-2 h-[17px] w-5/6 animate-pulse rounded leading-relaxed" />
      <div className="skeleton-base h-[17px] w-4/6 animate-pulse rounded leading-relaxed" />
    </div>
  );

  const mainCast = (
    <div className="mb-6 hidden md:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Main Cast
      </p>
      <div className="grid grid-cols-3 items-center gap-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2"
          >
            <div className="h-7 w-7 flex-shrink-0 rounded-full bg-white/20" />
            <div className="h-4 w-20 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );

  const buttons = null;

  return (
    <div className="hero-content-container">
      <div className="relative max-w-5xl">
        {ratingAndGenres}
        {title}
        {overview}
        {mainCast}
        {buttons && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">{buttons}</div>
        )}
      </div>
    </div>
  );
}
