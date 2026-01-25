export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateId(id: unknown): ValidationResult {
  const idNum = Number(id);

  if (!Number.isFinite(idNum) || idNum <= 0) {
    return {
      isValid: false,
      error: 'id must be a valid positive number',
    };
  }

  return { isValid: true };
}

export function validatePage(
  page: unknown,
  defaultValue: number = 1,
): {
  isValid: boolean;
  error?: string;
  value: number;
} {
  if (page === null || page === undefined) {
    return { isValid: true, value: defaultValue };
  }

  const pageNum = Number(page);

  if (Number.isNaN(pageNum) || pageNum < 1) {
    return {
      isValid: false,
      error: 'page must be a positive number',
      value: defaultValue,
    };
  }

  return { isValid: true, value: pageNum };
}

export function validateContentType(type: unknown): ValidationResult & { value?: 'movie' | 'tv' } {
  if (type !== 'movie' && type !== 'tv') {
    return {
      isValid: false,
      error: 'type must be "movie" or "tv"',
    };
  }

  return { isValid: true, value: type };
}

export function validateGenreIds(genreIdsParam: string | null): ValidationResult & {
  value?: number[];
} {
  if (!genreIdsParam) {
    return {
      isValid: false,
      error: 'genreIds query param is required',
    };
  }

  const genreIds = genreIdsParam
    .split(',')
    .map(Number)
    .filter((id) => !Number.isNaN(id) && id > 0);

  if (genreIds.length === 0) {
    return {
      isValid: false,
      error: 'genreIds must contain valid positive numbers',
    };
  }

  return { isValid: true, value: genreIds };
}

export function validateCategory(
  category: string | null,
  allowedCategories: readonly string[],
  contentType: 'movie' | 'tv',
): ValidationResult {
  if (!category) {
    return {
      isValid: false,
      error: 'category is required',
    };
  }

  if (!allowedCategories.includes(category)) {
    return {
      isValid: false,
      error: `Invalid category for ${contentType}. Allowed: ${allowedCategories.join(', ')}`,
    };
  }

  return { isValid: true };
}

export function validateSearchQuery(query: unknown): ValidationResult & { value?: string } {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return {
      isValid: false,
      error: 'Search query is required',
    };
  }

  return { isValid: true, value: query.trim() };
}

export function validateSearchType(
  type: unknown,
): ValidationResult & { value?: 'movie' | 'tv' | 'person' } {
  if (!type || !['movie', 'tv', 'person'].includes(type as string)) {
    return {
      isValid: false,
      error: 'Invalid search type. Must be "movie", "tv", or "person"',
    };
  }

  return { isValid: true, value: type as 'movie' | 'tv' | 'person' };
}
