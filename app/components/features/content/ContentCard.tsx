'use client';

import { memo } from 'react';
import { CardItem } from '@/features/cards/mapToCardItem';
import Badge from '@/app/components/ui/Badge';
import GradientLine from '@/app/components/ui/GradientLine';
import ContentCardLayout from './ContentCardLayout';
import Poster from './Poster';
import GradientOverlay from '@/app/components/ui/GradientOverlay';

type ContentCardProps = {
  className?: string;
  item: CardItem;
  linkTo: string;
};

const ContentCardComponent = ({ item, linkTo, className }: ContentCardProps) => {
  if (!item) return null;

  const poster = (
    <Poster
      src={item.poster}
      alt={item.title}
      className="h-full w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
    />
  );
  const overlay = <GradientOverlay />;
  const ratingBadge = <Badge type="rating" value={item.rating} />;
  const title = <h3 className="card-title">{item.title}</h3>;
  const genres = (
    <div className="flex flex-wrap gap-1.5">
      {item.genres
        .split(', ')
        .slice(0, 2)
        .map((genre) => (
          <Badge key={genre} type="genre" value={genre} />
        ))}
    </div>
  );
  const gradientLine = (
    <GradientLine
      variant="accent"
      className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 transition-transform duration-300 motion-safe:group-hover:scale-x-100"
    />
  );

  return (
    <ContentCardLayout
      linkTo={linkTo}
      className={className}
      poster={poster}
      overlay={overlay}
      ratingBadge={ratingBadge}
      title={title}
      genres={genres}
      gradientLine={gradientLine}
    />
  );
};

export default memo(ContentCardComponent);
