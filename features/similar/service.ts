import type { Actor, CrewMember } from '@/types/common';
import { fetchSimilarCandidates } from './fetchCandidates';
import { rankAndPaginate } from './rankAndPaginate';

export async function getSimilarContent({
  type,
  contentId,
  genres,
  actors,
  directors,
  originalLanguage,
  originCountries,
  page,
}: {
  type: 'movie' | 'tv';
  contentId: number;
  genres: number[];
  actors: Actor[];
  directors: CrewMember[];
  originalLanguage?: string;
  originCountries?: string[];
  page: number;
}) {
  const { items: candidates, totalPages: apiTotalPages } = await fetchSimilarCandidates({
    type,
    page,
    genres,
    actors,
    directors,
  });

  const { items, hasMore } = rankAndPaginate(candidates, {
    genres,
    actors,
    directors,
    originalLanguage,
    originCountries,
    excludeId: contentId,
  });

  const totalPages = hasMore ? Math.max(page + 1, apiTotalPages) : page;

  return {
    items,
    hasMore,
    totalPages,
  };
}
