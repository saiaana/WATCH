import { useMemo } from 'react';
import { dedupeById } from '@/helpers/dedupeById';
import { getContentType } from '@/helpers/contentType';
import { mapToCardItem, type CardItem } from '@/features/cards/mapToCardItem';
import type { BasePath, MediaContent } from '@/types/media';
import { Genre } from '@/types/common';

export function useContentSliderItems({
  content,
  genres,
  basePath,
}: {
  content: MediaContent[];
  genres: Genre[];
  basePath: BasePath;
}) {
  return useMemo(() => {
    if (!content || content.length === 0) {
      return [];
    }

    const contentType = getContentType(basePath);

    return dedupeById(content)
      .map((item) => {
        const cardItem = mapToCardItem(item, genres, { type: contentType });
        return cardItem ? { id: item.id, cardItem } : null;
      })
      .filter((item): item is { id: number; cardItem: CardItem } => item !== null);
  }, [content, genres, basePath]);
}
