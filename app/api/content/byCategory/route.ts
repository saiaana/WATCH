import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/server/tmdb-client';
import { MOVIE_CATEGORIES, TV_SHOW_CATEGORIES } from '@/config/categories';
import { validateContentType, validatePage, validateCategory } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';

const CATEGORY_MAP = {
  movie: MOVIE_CATEGORIES,
  tv: TV_SHOW_CATEGORIES,
} as const;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate type
    const typeValidation = validateContentType(searchParams.get('type'));
    if (!typeValidation.isValid) {
      return createErrorResponse(typeValidation.error!, 400, true);
    }
    const type = typeValidation.value!;

    // Validate category
    const categoryValidation = validateCategory(
      searchParams.get('category'),
      CATEGORY_MAP[type],
      type,
    );
    if (!categoryValidation.isValid) {
      return createErrorResponse(categoryValidation.error!, 400, true);
    }
    const category = searchParams.get('category')!;

    // Validate page
    const pageValidation = validatePage(searchParams.get('page'));
    if (!pageValidation.isValid) {
      return createErrorResponse(pageValidation.error!, 400, true);
    }
    const page = pageValidation.value;

    const data = await tmdbClient.getContentByCategory(type, category, page);

    return NextResponse.json({
      items: data.results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    });
  } catch (error) {
    // Enhanced error message for API key issues
    if (error instanceof Error && error.message.includes('API key')) {
      return createErrorResponse(
        'TMDB API key is not configured. Please check your .env.local file.',
        500,
        true,
      );
    }

    return handleApiError(error, 'GET_CONTENT_BY_CATEGORY', true);
  }
}
