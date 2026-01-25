import { tmdbClient } from '@/lib/server/tmdb-client';
import type { TMDBMovie, TMDBTvShow } from '@/lib/server/tmdb-client';
import { TMDBCrewTvItem, mapCrewToTvShow } from '@/lib/mappers/server/mapCrewToTvShow';
import { sortByPopularity } from '@/utils/sortByPopularity';
import { paginate, type PaginatedResponse } from '@/utils/pagination';
import { TV_DIRECTOR_JOBS } from '@/constants/crew';
import type { ContentType } from '@/types/media';

export async function getContentByDirector<T extends ContentType>(
  contentType: T,
  directorId: number,
  page: number,
): Promise<PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>> {
  if (contentType === 'movie') {
    return getMoviesByDirector(directorId, page) as Promise<
      PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>
    >;
  } else {
    return getTvByDirector(directorId, page) as Promise<
      PaginatedResponse<T extends 'movie' ? TMDBMovie : TMDBTvShow>
    >;
  }
}

async function getMoviesByDirector(
  directorId: number,
  page: number,
): Promise<PaginatedResponse<TMDBMovie>> {
  const data = await tmdbClient.getContentByDirector('movie', directorId, page);

  return {
    items: data.results ?? [],
    page: data.page ?? page,
    totalPages: data.total_pages ?? 1,
    totalResults: data.total_results ?? 0,
  };
}

async function getTvByDirector(
  directorId: number,
  page: number,
): Promise<PaginatedResponse<TMDBTvShow>> {
  const credits = await tmdbClient.getTvByDirector(directorId);

  if (!credits?.crew || !Array.isArray(credits.crew)) {
    return paginate([], page);
  }

  const unique = new Map<number, TMDBTvShow>();

  for (const credit of credits.crew as TMDBCrewTvItem[]) {
    if (!credit.id) continue;
    if (!credit.job || !TV_DIRECTOR_JOBS.has(credit.job)) continue;
    if (unique.has(credit.id)) continue;

    unique.set(credit.id, mapCrewToTvShow(credit));
  }

  const sorted = sortByPopularity(Array.from(unique.values()));

  return paginate(sorted, page);
}
