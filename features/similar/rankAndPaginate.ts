import type { MediaContent } from '@/types/media';
import type { SimilarFilters } from './types';
import { SIMILAR_CONFIG } from './config';
import { calculateScore } from './scoring';

export function rankAndPaginate(items: MediaContent[], filters: SimilarFilters) {
  const pageSize = SIMILAR_CONFIG.pageSize;

  const unique = Array.from(new Map(items.map((item) => [item.id, item])).values()).filter(
    (item) => item.id !== filters.excludeId,
  );

  const scored = unique
    .map((item) => ({
      item,
      score: calculateScore(item, filters),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) =>
      b.score !== a.score
        ? b.score - a.score
        : (b.item.vote_average ?? 0) - (a.item.vote_average ?? 0),
    );

  const paginatedItems = scored.slice(0, pageSize).map((s) => s.item);
  const hasMore = scored.length >= pageSize;

  return {
    items: paginatedItems,
    hasMore,
  };
}
