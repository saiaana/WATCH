import ContentCardLayout from './ContentCardLayout';

export default function ContentCardSkeleton({ className = '' }: { className?: string }) {
  const poster = (
    <div className="skeleton-bg relative h-full w-full animate-pulse overflow-hidden" />
  );
  const ratingBadge = (
    <div className="skeleton-base inline-flex h-6 w-16 items-center gap-1.5 rounded-xl px-3 py-1.5 sm:h-7 sm:w-20" />
  );
  const title = (
    <div className="skeleton-base line-clamp-2 h-10 w-3/4 rounded-md text-sm font-semibold leading-snug md:h-12 md:text-base" />
  );

  const genres = (
    <div className="flex flex-wrap gap-1.5">
      <div className="skeleton-base inline-flex h-6 w-16 items-center gap-1.5 rounded-xl px-3 py-1.5" />
      <div className="skeleton-base inline-flex h-6 w-20 items-center gap-1.5 rounded-xl px-3 py-1.5" />
    </div>
  );

  const gradientLine = null;

  return (
    <ContentCardLayout
      poster={poster}
      ratingBadge={ratingBadge}
      title={title}
      genres={genres}
      gradientLine={gradientLine}
      linkTo="#"
      className={className}
    />
  );
}
