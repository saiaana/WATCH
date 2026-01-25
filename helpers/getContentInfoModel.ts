import { formatContentYear } from '@/features/movies/formatContentYear';
import { loadContentPageData } from '@/features/movies/loadContentPageData';
import { mapToContentInfo } from '@/features/movies/mapToContentInfo';
import { mapToMainCast } from '@/features/movies/mapToMainCast';
import { mapToRatingAndCastListInfo } from '@/features/movies/mapToRatingAndCastListInfo';
import { getSimilarContent } from '@/features/similar/service';
import type { MediaContent } from '@/types/media';

export async function getContentInfoModel(contentId: string, type: 'movie' | 'tv') {
  const raw = await loadContentPageData(type, contentId);
  const content = raw.content;

  if (!content) {
    return {
      content: null,
      info: null,
      ratingAndCast: null,
      mainCast: [],
      videoId: null,
      directors: [],
      similarGenres: [],
      similar: [],
      yearDisplay: null,
    };
  }

  const info = mapToContentInfo(content);

  const yearDisplay = formatContentYear({
    year: info.year,
    startYear: info.startYear,
    endYear: info.endYear,
    numberOfSeasons: info.numberOfSeasons,
  });

  const ratingAndCast = mapToRatingAndCastListInfo(content, raw.actors);

  const mainCast = mapToMainCast(raw.actors);

  const genreIds = raw.genres.map((g) => g.id);
  const topActors = raw.actors.slice(0, 5);
  const topDirectors = raw.directors.slice(0, 3);
  const originalLanguage = (content as { original_language?: string })?.original_language;
  const originCountries = Array.isArray(
    (content as { origin_country?: string | string[] })?.origin_country,
  )
    ? (content as { origin_country: string[] }).origin_country
    : (content as { origin_country?: string })?.origin_country
      ? [(content as { origin_country: string }).origin_country]
      : [];

  let similar: MediaContent[] = [];
  try {
    const similarResult = await getSimilarContent({
      type,
      contentId: Number(contentId),
      genres: genreIds,
      actors: topActors,
      directors: topDirectors,
      originalLanguage,
      originCountries: originCountries.length > 0 ? originCountries : undefined,
      page: 1,
    });
    similar = similarResult.items as MediaContent[];
  } catch (error) {
    console.error('Failed to load similar content:', error);
    similar = [];
  }

  const similarGenres = raw.genres;
  const directors = raw.directors;
  const videoId = raw.videoId;
  const posterUrl = info.posterUrl;
  const title = info.title;

  return {
    content,
    info,
    ratingAndCast,
    mainCast,
    directors,
    videoId,
    similarGenres,
    similar,
    yearDisplay,
    posterUrl,
    title,
  };
}
