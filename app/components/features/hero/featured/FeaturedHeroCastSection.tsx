import type { Actor } from '@/types/common';
import FeaturedHeroCastItem from './FeaturedHeroCastItem';

interface Props {
  cast: Actor[];
  isLoading?: boolean;
}

export default function FeaturedHeroCastSection({ cast, isLoading }: Props) {
  const skeletonCount = 6;

  return (
    <div className="mb-6 hidden md:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Main Cast
      </p>

      <div className="grid grid-cols-3 items-center gap-3">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2"
              >
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-white/20" />
                <div className="h-4 w-20 rounded bg-white/20" />
              </div>
            ))
          : cast.map((actor) => <FeaturedHeroCastItem key={actor.id} actor={actor} />)}
      </div>
    </div>
  );
}
