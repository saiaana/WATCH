import { tmdbClient } from '@/lib/server/tmdb-client';
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';
import type { TMDBResponse, TMDBContent, TMDBPerson } from '@/lib/server/tmdb-client';
import { validateSearchQuery, validateSearchType, validatePage } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';

type SearchType = 'movie' | 'tv' | 'person';

interface SearchRequestBody {
  query: string;
  type: SearchType;
  page?: number;
}

type SearchResult =
  | TMDBResponse<TMDBContent<'movie'>>
  | TMDBResponse<TMDBContent<'tv'>>
  | TMDBResponse<TMDBPerson>;

const handlers: Record<SearchType, (query: string, page?: number) => Promise<SearchResult>> = {
  movie: (query, page) => tmdbClient.searchContent('movie', query, page),
  tv: (query, page) => tmdbClient.searchContent('tv', query, page),
  person: (query, page) => tmdbClient.searchPerson(query, page),
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SearchRequestBody;
    const { query: queryRaw, type: typeRaw, page: pageRaw = 1 } = body;

    // Validate query
    const queryValidation = validateSearchQuery(queryRaw);
    if (!queryValidation.isValid) {
      return createErrorResponse(queryValidation.error!, 400, true);
    }
    const query = queryValidation.value!;

    // Validate type
    const typeValidation = validateSearchType(typeRaw);
    if (!typeValidation.isValid) {
      return createErrorResponse(typeValidation.error!, 400, true);
    }
    const type = typeValidation.value!;

    // Validate page
    const pageValidation = validatePage(pageRaw);
    if (!pageValidation.isValid) {
      return createErrorResponse(pageValidation.error!, 400, true);
    }
    const page = pageValidation.value;

    const cacheKey = ['search', type, query, page.toString()];

    // Передаем функцию в unstable_cache, чтобы она была кеширована
    // Функция делает запрос к API и возвращает данные
    const data = await unstable_cache(() => handlers[type](query, page), cacheKey, {
      revalidate: 300,
    })();

    return NextResponse.json({
      items: data.results ?? [],
      page: data.page ?? page,
      totalPages: data.total_pages ?? 0,
      totalResults: data.total_results ?? 0,
    });
  } catch (error) {
    return handleApiError(error, 'SEARCH_BY_TYPE', true);
  }
}
