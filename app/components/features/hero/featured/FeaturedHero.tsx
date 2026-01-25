import type { Genre } from '@/types/common';
import { useFeaturedHero } from '@/hooks/content/critical/useFeaturedHero';
import { selectFeaturedItem } from '@/features/featuredHero/selectFeaturedItem';
import FeaturedHeroBackground from './FeaturedHeroBackground';
import GradientLine from '@/app/components/ui/GradientLine';
import FeaturedHeroContent from './FeaturedHeroContent';
import { useMemo } from 'react';
import { MediaContent } from '@/types/media';

interface FeaturedHeroProps {
  content: MediaContent[];
  genres: Genre[];
}

export default function FeaturedHero({ content, genres }: FeaturedHeroProps) {
  const item = useMemo(() => selectFeaturedItem(content), [content]);
  const { hero, actors, isLoadingActors } = useFeaturedHero({ item, genres });

  if (!hero) {
    return null;
  }

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden md:h-[600px] lg:h-[700px]">
      <FeaturedHeroBackground poster={hero.backdropUrl} title={hero.title} />
      <FeaturedHeroContent hero={hero} actors={actors} isLoadingActors={isLoadingActors} />
      <GradientLine variant="full" className="absolute bottom-0 left-0 right-0 z-20 h-1" />
    </div>
  );
}
