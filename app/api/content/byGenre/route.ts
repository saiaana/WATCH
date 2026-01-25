import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/server/tmdb-client';
import { validateContentType, validatePage, validateGenreIds } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate type
    const typeValidation = validateContentType(searchParams.get('type'));
    if (!typeValidation.isValid) {
      return createErrorResponse(typeValidation.error!, 400, true);
    }
    const type = typeValidation.value!;

    // Validate page
    const pageValidation = validatePage(searchParams.get('page'));
    if (!pageValidation.isValid) {
      return createErrorResponse(pageValidation.error!, 400, true);
    }
    const page = pageValidation.value;

    // Validate genreIds
    const genreIdsValidation = validateGenreIds(searchParams.get('genreIds'));
    if (!genreIdsValidation.isValid) {
      return createErrorResponse(genreIdsValidation.error!, 400, true);
    }
    const genreIds = genreIdsValidation.value!;

    const data = await tmdbClient.getContentByGenre(type, genreIds, page);

    return NextResponse.json({
      items: data.results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    });
  } catch (error) {
    return handleApiError(error, 'GET_CONTENT_BY_GENRE', true);
  }
}
