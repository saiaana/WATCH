import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import ContentCard from '@/app/components/features/content/ContentCard';
import type { CardItem } from '@/features/cards/mapToCardItem';
import EmptyState from '@/app/components/ui/EmptyState';
import { dedupeById } from '@/helpers/dedupeById';

interface ContentGridProps {
  items: CardItem[];
  emptyStateIcon?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  getLinkTo: (item: CardItem) => string;
  className?: string;
}

function ContentGrid({
  items,
  emptyStateIcon = '🎬',
  emptyStateTitle = 'No content found',
  emptyStateDescription = 'Check back later for new content',
  getLinkTo,
  className,
}: ContentGridProps) {
  // Deduplicate items by id to prevent duplicate keys
  const uniqueItems = dedupeById(items);

  if (uniqueItems.length === 0) {
    return (
      <EmptyState
        icon={emptyStateIcon}
        title={emptyStateTitle}
        description={emptyStateDescription}
        className={cn('w-full py-20', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5 2xl:grid-cols-6',
        className,
      )}
    >
      {uniqueItems.map((item) => {
        return (
          <div key={item.id} className="flex w-full max-w-[300px] justify-center">
            <ContentCard item={item} linkTo={getLinkTo(item)} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(ContentGrid);
