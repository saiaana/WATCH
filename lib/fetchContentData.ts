import type { Actor, CrewMember } from '@/types/common';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { TMDBMovie, TMDBTvShow } from './server/tmdb-client';

type ContentType = 'movie' | 'tv';

type ContentMap = {
  movie: {
    content: Movie;
    tmdb: TMDBMovie;
  };
  tv: {
    content: TvShow;
    tmdb: TMDBTvShow;
  };
};

type FetchContentResult<T extends ContentType> = {
  content: ContentMap[T]['content'];
  actors: Actor[];
  directors: CrewMember[];
  videoId: string | null;
};

export async function fetchContentData<T extends ContentType>(
  type: T,
  id: string,
): Promise<FetchContentResult<T>> {
  const { tmdbClient } = await import('./server/tmdb-client');

  const contentData = await tmdbClient.getContent(type, id);

  const actors: Actor[] =
    contentData.credits?.cast?.map((actor) => ({
      id: actor.id,
      name: actor.name,
      profile_path: actor.profile_path,
      character: actor.character,
    })) ?? [];

  const { MOVIE_DIRECTOR_JOBS, TV_DIRECTOR_JOBS } = await import('@/constants/crew');
  const directorJobs = type === 'movie' ? MOVIE_DIRECTOR_JOBS : TV_DIRECTOR_JOBS;

  const directors: CrewMember[] =
    contentData.credits?.crew
      ?.filter((p) => directorJobs.has(p.job))
      .map((p) => ({
        id: p.id,
        name: p.name,
        job: p.job,
        profile_path: p.profile_path ?? undefined,
      })) ?? [];

  const videoId =
    contentData.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer')?.key ??
    null;

  return {
    content: contentData as ContentMap[T]['content'],
    actors,
    directors,
    videoId,
  };
}
