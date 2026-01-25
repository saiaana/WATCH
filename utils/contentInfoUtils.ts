import { Genre } from '@/types/common';
import { MediaContent } from '@/types/media';

export function getContentTitle(content: MediaContent): string {
  if ('title' in content && content.title) return content.title;
  if ('name' in content && content.name) return content.name;
  return '';
}

export function getContentRating(content: MediaContent): string {
  return content.vote_average ? content.vote_average.toFixed(1) : '—';
}

export function getContentReleaseYear(content: MediaContent): string | undefined {
  const releaseDate = content.release_date || content.first_air_date;
  return releaseDate && typeof releaseDate === 'string'
    ? new Date(releaseDate).getFullYear().toString()
    : undefined;
}

export function getContentCountries(content: MediaContent): string[] {
  const countries = content.production_countries;
  if (!countries || !Array.isArray(countries)) {
    return [];
  }
  return countries.map((c) => (typeof c === 'string' ? c : (c as { name: string }).name));
}

export function getContentGenres(content: MediaContent): string | undefined {
  return content.genres
    ? content.genres.map((g) => (typeof g === 'string' ? g : g.name)).join(', ')
    : undefined;
}

export function getTvShowYearsAndNumberOfSeasons(content: MediaContent): {
  startYear: string | undefined;
  endYear: string | undefined;
  numberOfSeasons: number | undefined;
} {
  // Type guard: check if content is a TvShow (has 'name' field which is required for TvShow)
  const isTvShow =
    'name' in content && typeof content.name === 'string' && !('title' in content && content.title);
  if (!isTvShow) {
    return { startYear: undefined, endYear: undefined, numberOfSeasons: undefined };
  }

  const data = content as {
    first_air_date?: string;
    last_air_date?: string;
    number_of_seasons?: number;
  };

  return {
    startYear:
      data.first_air_date && typeof data.first_air_date === 'string'
        ? new Date(data.first_air_date).getFullYear().toString()
        : undefined,
    endYear:
      data.last_air_date && typeof data.last_air_date === 'string'
        ? new Date(data.last_air_date).getFullYear().toString()
        : undefined,
    numberOfSeasons: data.number_of_seasons,
  };
}

export function getContentCardGenres(genres: Genre[], content: MediaContent): string | undefined {
  // Try to use content.genres (array of objects Genre), if it exists
  if (content.genres && Array.isArray(content.genres) && content.genres.length > 0) {
    const genreNames = content.genres
      .slice(0, 2)
      .map((g) => (typeof g === 'string' ? g : g.name))
      .filter(Boolean)
      .join(', ');
    if (genreNames) return genreNames;
  }

  if (!genres || !Array.isArray(genres) || genres.length === 0) {
    return undefined;
  }

  const genreMap = new Map<number, string>();
  genres.forEach((g) => genreMap.set(g.id, g.name));

  const genreNames = (content.genre_ids || [])
    .slice(0, 2)
    .map((id) => genreMap.get(id))
    .filter(Boolean)
    .join(', ');

  return genreNames || undefined;
}
