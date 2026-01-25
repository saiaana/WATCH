type ImageSize =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'original';

interface GetTmdbImageUrlOptions {
  size?: ImageSize;
  fallback?: string;
}

const DEFAULT_FALLBACK = '/poster.png';
const TMDB_BASE_URL = 'https://image.tmdb.org/t/p';

export function getTmdbImageUrl(
  path: string | null | undefined,
  options: GetTmdbImageUrlOptions = {},
): string {
  const { size = 'w500', fallback = DEFAULT_FALLBACK } = options;

  if (!path) {
    return fallback;
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${TMDB_BASE_URL}/${size}/${normalizedPath}`;
}

export function getPosterUrl(
  posterPath: string | null | undefined,
  size: ImageSize = 'w500',
): string {
  return getTmdbImageUrl(posterPath, { size, fallback: DEFAULT_FALLBACK });
}

export function getBackdropUrl(
  backdropPath: string | null | undefined,
  size: ImageSize = 'original',
): string {
  return getTmdbImageUrl(backdropPath, { size, fallback: DEFAULT_FALLBACK });
}

export function getProfileUrl(
  profilePath: string | null | undefined,
  size: ImageSize = 'w500',
): string {
  return getTmdbImageUrl(profilePath, { size, fallback: DEFAULT_FALLBACK });
}
