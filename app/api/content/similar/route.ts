import { NextResponse } from 'next/server';
import { validateContentType, validatePage } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';
import { getSimilarContent } from '@/features/similar/service';
import { loadContentPageData } from '@/features/movies/loadContentPageData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // -------------------------
    // 1️⃣ Validation
    // -------------------------
    const id = searchParams.get('id');
    if (!id) {
      return createErrorResponse('id is required', 400);
    }

    const typeValidation = validateContentType(searchParams.get('type'));
    if (!typeValidation.isValid) {
      return createErrorResponse(typeValidation.error!, 400);
    }

    const pageValidation = validatePage(searchParams.get('page'));
    if (!pageValidation.isValid) {
      return createErrorResponse(pageValidation.error!, 400);
    }

    const type = typeValidation.value!;
    const page = pageValidation.value;
    const contentId = Number(id);

    // -------------------------
    // 2️⃣ Load base content data using unified function
    // -------------------------
    const raw = await loadContentPageData(type, String(contentId));

    if (!raw.content) {
      return createErrorResponse('Content not found', 404);
    }

    // -------------------------
    // 3️⃣ Build filters (with same limits as before)
    // -------------------------
    const genreIds = raw.genres.map((g) => g.id);
    const actors = raw.actors.slice(0, 5); // Top 5 actors
    const directors = raw.directors.slice(0, 3); // Top 3 directors
    const originalLanguage = (raw.content as { original_language?: string })?.original_language;
    const originCountries = Array.isArray(
      (raw.content as { origin_country?: string | string[] })?.origin_country,
    )
      ? (raw.content as { origin_country: string[] }).origin_country
      : (raw.content as { origin_country?: string })?.origin_country
        ? [(raw.content as { origin_country: string }).origin_country]
        : [];

    // -------------------------
    // 4️⃣ Similar content use-case
    // -------------------------
    const { items, hasMore, totalPages } = await getSimilarContent({
      type,
      contentId,
      genres: genreIds,
      actors,
      directors,
      originalLanguage,
      originCountries: originCountries.length > 0 ? originCountries : undefined,
      page,
    });

    // -------------------------
    // 5️⃣ Response
    // -------------------------
    return NextResponse.json({
      items,
      page,
      totalPages,
      hasMore,
    });
  } catch (error) {
    return handleApiError(error, 'GET_SIMILAR_CONTENT');
  }
}
