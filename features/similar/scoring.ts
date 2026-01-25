import type { MediaContent } from '@/types/media';
import type { SimilarFilters } from './types';
import { SIMILAR_CONFIG } from './config';
import { JOB_DIRECTOR } from '@/constants/crew';

export function calculateScore(item: MediaContent, filters: SimilarFilters): number {
  const { genres, actors, directors, originalLanguage, originCountries } = filters;
  const { weights } = SIMILAR_CONFIG;

  let score = 0;

  if (originCountries && originCountries.length > 0) {
    const itemCountries = Array.isArray(item.origin_country)
      ? item.origin_country
      : item.origin_country
        ? [item.origin_country]
        : [];

    const hasMatchingCountry = itemCountries.some((country) => originCountries.includes(country));

    if (hasMatchingCountry) {
      score += weights.country;
    }
  }

  if (item.genre_ids?.length && genres.length) {
    score += item.genre_ids.filter((id) => genres.includes(id)).length * weights.genre;
  }

  if (item.cast?.length && actors.length) {
    const castIds = new Set(item.cast.map((a) => a.id));
    score += actors.filter((a) => castIds.has(a.id)).length * weights.actor;
  }

  if (item.crew?.length && directors.length) {
    const directorIds = new Set(item.crew.filter((c) => c.job === JOB_DIRECTOR).map((d) => d.id));

    score += directors.filter((d) => directorIds.has(d.id)).length * weights.director;
  }

  if (originalLanguage && item.original_language) {
    if (item.original_language === originalLanguage) {
      score += weights.language;
    }
  }

  score += Math.min((item.vote_average ?? 0) * 0.1, weights.ratingBoostMax);

  score += Math.min((item.vote_count ?? 0) / 10000, weights.votesBoostMax);

  return score;
}
