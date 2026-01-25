import { GenresResponse } from '@/types/movieTypes';
import type { Actor } from '@/types/common';

async function handleApiResponse<T>(response: Response, defaultErrorMessage: string): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
    const errorMessage = errorData.error || `${defaultErrorMessage}: ${response.status}`;
    console.error('API Error:', errorMessage, errorData);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getContentByCategory(
  type: 'movie' | 'tv',
  category: string,
  page: number = 1,
  signal?: AbortSignal,
): Promise<{ content: unknown[]; totalPages: number; totalResults: number }> {
  const res = await fetch(
    `/api/content/byCategory?type=${type}&category=${encodeURIComponent(category)}&page=${page}`,
    {
      method: 'GET',
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await handleApiResponse<{
    items: unknown[];
    totalPages: number;
    totalResults: number;
  }>(res, 'Failed to load content by category');

  return {
    content: data.items,
    totalPages: data.totalPages,
    totalResults: data.totalResults,
  };
}

export async function getGenres(): Promise<GenresResponse> {
  const res = await fetch('/api/content/genres', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleApiResponse<GenresResponse>(res, 'Failed to load genres');
}

export async function getTrailerUrl(movieTitle: string): Promise<string | null> {
  const res = await fetch('/api/youtube/trailer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieTitle }),
  });

  const data = await handleApiResponse<{ trailerUrl: string | null }>(
    res,
    'Failed to fetch trailer',
  );

  return data.trailerUrl;
}

export async function getContentByActor(
  id: number,
  page: number = 1,
  contentType: 'movie' | 'tv',
  signal?: AbortSignal,
) {
  const endpoint = `/api/content/byActor/${contentType}?id=${id}&page=${page}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleApiResponse<{ items: unknown[]; totalPages: number; page: number }>(
    res,
    'Failed to fetch content by actor id',
  );
}

export async function getSimilarContent(
  id: number,
  type: 'movie' | 'tv',
  page: number = 1,
  signal?: AbortSignal,
) {
  const endpoint = `/api/content/similar?id=${id}&type=${type}&page=${page}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    signal,

    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleApiResponse<{
    items: unknown[];
    totalPages: number;
    page: number;
    hasMore?: boolean;
  }>(res, 'Failed to fetch similar content');
}

export async function getContentByGenre(
  type: 'movie' | 'tv',
  genreIds: number[],
  page: number = 1,
  signal?: AbortSignal,
): Promise<{ content: unknown[]; totalPages: number; totalResults: number }> {
  const genreIdsParam = genreIds.join(',');
  const res = await fetch(
    `/api/content/byGenre?type=${type}&genreIds=${genreIdsParam}&page=${page}`,
    {
      method: 'GET',
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await handleApiResponse<{
    items: unknown[];
    totalPages: number;
    totalResults: number;
  }>(res, 'Failed to load content by genre');

  return {
    content: data.items,
    totalPages: data.totalPages,
    totalResults: data.totalResults,
  };
}

export async function getContentByDirector(
  id: number,
  page: number = 1,
  contentType: 'movie' | 'tv',
  signal?: AbortSignal,
) {
  const endpoint = `/api/content/byDirector/${contentType}?id=${id}&page=${page}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleApiResponse<{ items: unknown[]; totalPages: number; page: number }>(
    res,
    'Failed to fetch content by director id',
  );
}

export async function searchByType(
  type: 'movie' | 'tv' | 'person',
  query: string,
  page: number = 1,
  signal?: AbortSignal,
) {
  const res = await fetch('/api/search/by-type', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, query, page }),
  });

  const data = await handleApiResponse<{
    items: unknown[];
    totalPages: number;
    totalResults: number;
  }>(res, 'Failed to search content');

  return {
    items: data.items || [],
    totalPages: data.totalPages || 1,
    totalResults: data.totalResults || 0,
  };
}

export async function searchPersonByName(
  name: string,
  signal?: AbortSignal,
): Promise<number | null> {
  const data = await searchByType('person', name, 1, signal);
  const persons = data.items || [];

  if (Array.isArray(persons) && persons.length > 0) {
    const firstPerson = persons[0] as { id?: number };
    return firstPerson.id ?? null;
  }

  return null;
}

export async function getActors(
  id: string,
  type: 'movie' | 'tv',
  signal?: AbortSignal,
): Promise<Actor[]> {
  const res = await fetch(`/api/content/actors?id=${encodeURIComponent(id)}&type=${type}`, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await handleApiResponse<Actor[] | { error: string }>(res, 'Failed to load actors');

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}
