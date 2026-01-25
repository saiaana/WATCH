import { fetchContentData } from '@/lib/fetchContentData';
import type { Actor, CrewMember, Genre } from '@/types/common';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';

type ContentType = 'movie' | 'tv';

type ContentMap = {
  movie: Movie;
  tv: TvShow;
};

type LoadContentPageDataResponse<T extends ContentType> = {
  content: ContentMap[T] | null;
  actors: Actor[];
  directors: CrewMember[];
  genres: Genre[];
  videoId: string | null;
  isLoading: boolean;
};

export async function loadContentPageData<T extends ContentType>(
  type: T,
  id: string,
): Promise<LoadContentPageDataResponse<T>> {
  try {
    const result = await fetchContentData(type, id);
    const { content, actors, directors, videoId } = result;

    const genres = content.genres ?? [];

    return {
      content: content as ContentMap[T],
      actors: actors || [],
      directors: directors || [],
      genres,
      videoId,
      isLoading: false,
    };
  } catch (error) {
    const contentTypeLabel = type === 'movie' ? 'movie' : 'TV show';
    console.error(`Error loading ${contentTypeLabel} page data:`, error);
    return {
      content: null,
      actors: [],
      directors: [],
      genres: [],
      videoId: null,
      isLoading: true,
    };
  }
}
