import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/server/tmdb-client';
import { validateContentType } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');
    if (!id) {
      return createErrorResponse('id is required', 400);
    }
    const typeValidation = validateContentType(searchParams.get('type'));
    if (!typeValidation.isValid) {
      return createErrorResponse(typeValidation.error!, 400);
    }
    const type = typeValidation.value!;

    const credits = await tmdbClient.getCredits(type, id);

    return NextResponse.json(credits.cast ?? []);
  } catch (error) {
    return handleApiError(error, 'GET_ACTORS');
  }
}
