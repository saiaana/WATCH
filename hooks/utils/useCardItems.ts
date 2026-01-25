'use client';

import { useMemo } from 'react';
import type { Genre } from '@/types/common';
import type { MediaContent, ContentType } from '@/types/media';
import { mapToCardItem } from '@/features/cards/mapToCardItem';
import type { CardItem } from '@/features/cards/mapToCardItem';

export function useCardItems(
  content: MediaContent[],
  genres: Genre[],
  contentType: ContentType,
): CardItem[] {
  return useMemo(() => {
    if (!content.length || !genres.length) return [];
    return content.map((item) => mapToCardItem(item, genres, { type: contentType }));
  }, [content, genres, contentType]);
}
