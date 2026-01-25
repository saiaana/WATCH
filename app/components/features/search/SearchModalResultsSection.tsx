import { memo, useCallback, useMemo, useState, useEffect, useRef, useTransition } from 'react';
import { getContentLink } from '@/helpers/routes';
import ContentCard from '@/app/components/features/content/ContentCard';
import CardGrid from '@/app/components/ui/CardGrid';
import PersonCard from '@/app/components/ui/PersonCard';
import { useIntersectionObserver } from '@/hooks/ui/useIntersectionObserver';
import type { CardItem } from '@/features/cards/mapToCardItem';
import type { ContentType } from '@/types/media';
import type { SearchPerson } from './types';

interface SearchModalResultsSectionProps {
  title: string;
  items: CardItem[] | SearchPerson[];
  contentType: ContentType | 'person';
  onClose: () => void;
}

const INITIAL_RENDER_LIMIT = 10;
const LAZY_LOAD_THRESHOLD = 5;

function SearchModalResultsSection({
  title,
  items,
  contentType,
  onClose,
}: SearchModalResultsSectionProps) {
  const [, startTransition] = useTransition();
  const previousItemsLengthRef = useRef(items.length);
  const isInitialMountRef = useRef(true);

  const handleCardClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(items.length, INITIAL_RENDER_LIMIT),
  );

  const { elementRef: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: false,
  });

  useEffect(() => {
    const previousLength = previousItemsLengthRef.current;
    const currentLength = items.length;

    if (currentLength < previousLength || isInitialMountRef.current) {
      startTransition(() => {
        setVisibleCount(Math.min(currentLength, INITIAL_RENDER_LIMIT));
      });
      isInitialMountRef.current = false;
    } else if (currentLength > previousLength) {
      startTransition(() => {
        setVisibleCount((prev) => {
          if (prev >= previousLength) {
            return Math.min(currentLength, prev + (currentLength - previousLength));
          }
          return prev;
        });
      });
    }

    previousItemsLengthRef.current = currentLength;
  }, [items.length, startTransition]);

  useEffect(() => {
    if (!isIntersecting || visibleCount >= items.length) return;

    let rafId: number;
    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(() => {
        startTransition(() => {
          setVisibleCount((prev) => Math.min(prev + LAZY_LOAD_THRESHOLD, items.length));
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isIntersecting, visibleCount, items.length, startTransition]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const hasMore = visibleCount < items.length;
  if (contentType === 'person') {
    const people = visibleItems as SearchPerson[];
    return (
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">{title}</h2>
        <CardGrid columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} gap="small">
          {people.map((person) => (
            <div
              key={person.id}
              onClick={handleCardClick}
              className="will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <PersonCard
                id={person.id}
                name={person.name}
                profilePath={person.profile_path}
                knownForDepartment={person.known_for_department}
              />
            </div>
          ))}
        </CardGrid>
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-4"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '1px' }}
          />
        )}
      </div>
    );
  }

  const cardItems = visibleItems as CardItem[];
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">{title}</h2>
        <CardGrid columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} gap="small">
        {cardItems.map((item) => (
          <div
            key={item.id}
            onClick={handleCardClick}
            className="will-change-transform min-w-0 w-full"
            style={{ transform: 'translateZ(0)' }}
          >
            <ContentCard 
              item={item} 
              linkTo={getContentLink(item.id, contentType as ContentType)}
              className="w-full"
            />
          </div>
        ))}
      </CardGrid>
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="h-4"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '1px' }}
        />
      )}
    </div>
  );
}

export default memo(SearchModalResultsSection);
