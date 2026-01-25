import { tmdbClient } from '@/lib/server/tmdb-client';
import type { TMDBMovie, TMDBTvShow } from '@/lib/server/tmdb-client';
import { sortByPopularity } from '@/utils/sortByPopularity';
import { paginate, type PaginatedResponse } from '@/utils/pagination';
import type { ContentType } from '@/types/media';

export async function getContentByActor<T extends ContentType>(
  contentType: T,
  actorId: number,
  page: number,
): Promise<PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>> {
  if (contentType === 'movie') {
    return getMoviesByActor(actorId, page) as Promise<
      PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>
    >;
  } else {
    return getTvByActor(actorId, page) as Promise<
      PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>
    >;
  }
}

async function getMoviesByActor(
  actorId: number,
  page: number,
): Promise<PaginatedResponse<TMDBMovie>> {
  const data = await tmdbClient.getContentByActor('movie', actorId, page);

  return {
    items: data.results ?? [],
    page: data.page ?? page,
    totalPages: data.total_pages ?? 1,
    totalResults: data.total_results ?? 0,
  };
}

async function getTvByActor(actorId: number, page: number): Promise<PaginatedResponse<TMDBTvShow>> {
  const credits = await tmdbClient.getTvByActor(actorId);

  if (!credits?.cast || !Array.isArray(credits.cast)) {
    return paginate([], page);
  }

  const filtered = credits.cast.filter(
    (item) => item.vote_average != null && item.vote_count != null,
  );
  const sorted = sortByPopularity(filtered);

  return paginate(sorted, page);
}
