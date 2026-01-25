import { tmdbClient } from '@/lib/server/tmdb-client';
import { SIMILAR_CONFIG } from './config';
import type { Actor, CrewMember } from '@/types/common';

export async function fetchSimilarCandidates({
  type,
  page,
  genres,
  actors,
  directors,
}: {
  type: 'movie' | 'tv';
  page: number;
  genres: number[];
  actors: Actor[];
  directors: CrewMember[];
}) {
  const { sources } = SIMILAR_CONFIG;

  const pagesToFetch = [page];

  const results = await Promise.all([
    ...genres
      .slice(0, sources.genres)
      .flatMap((id) =>
        pagesToFetch.map((p) => tmdbClient.getContentByGenre(type, [id], p).catch(() => null)),
      ),

    ...actors
      .slice(0, sources.actors)
      .flatMap((a) =>
        pagesToFetch.map((p) => tmdbClient.getContentByActor(type, a.id, p).catch(() => null)),
      ),

    ...directors
      .slice(0, sources.directors)
      .flatMap((d) =>
        pagesToFetch.map((p) => tmdbClient.getContentByDirector(type, d.id, p).catch(() => null)),
      ),
  ]);

  const validResults = results.filter((res): res is NonNullable<typeof res> => res !== null);
  const items = validResults.flatMap((res) => res?.results ?? []);
  const maxTotalPages = validResults.reduce((max, res) => Math.max(max, res?.total_pages ?? 1), 1);

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: items as any,
    totalPages: maxTotalPages,
  };
}
