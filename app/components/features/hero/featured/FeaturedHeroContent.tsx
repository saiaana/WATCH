'use client';

import Badge from '@/app/components/ui/Badge';
import FeaturedHeroCastSection from './FeaturedHeroCastSection';
import type { Actor } from '@/types/common';
import { FeaturedHeroModel } from '@/features/featuredHero/types';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

interface Props {
  hero: FeaturedHeroModel;
  actors: Actor[];
  isLoadingActors: boolean;
}
function FeaturedHeroContent({ hero, actors, isLoadingActors }: Props) {
  const router = useRouter();

  return (
    <div className="hero-content-container">
      <div className="relative max-w-5xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {hero.rating && <Badge type="rating" value={hero.rating} />}
          <div className="flex flex-wrap gap-2">
            {hero.genres.map((genre) => (
              <Badge key={genre} type="genre" value={genre} />
            ))}
          </div>
        </div>
        <h1 onClick={() => router.push(hero.link)} className="hero-title">
          {hero.title}
        </h1>
        {hero.overview && (
          <p className="mb-7 max-w-2xl text-[17px] leading-relaxed text-neutral-200/90 sm:mb-9">
            {hero.overview}
          </p>
        )}
        <FeaturedHeroCastSection cast={actors} isLoading={isLoadingActors} />
      </div>
    </div>
  );
}

export default memo(FeaturedHeroContent);
