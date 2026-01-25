import type { TMDBTvShow, TMDBMovie } from '@/lib/server/tmdb-client';

type SortableContent = TMDBTvShow | TMDBMovie;

export function sortByPopularity<T extends SortableContent>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const scoreA = a.popularity ?? (a.vote_average ?? 0) * (a.vote_count ?? 0);
    const scoreB = b.popularity ?? (b.vote_average ?? 0) * (b.vote_count ?? 0);

    return scoreB - scoreA;
  });
}
