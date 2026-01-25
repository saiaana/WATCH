import { NextResponse } from 'next/server';
import { getContentByDirector } from '@/lib/services/director.service';
import { validateId, validatePage, validateContentType } from '@/lib/middleware/validation';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';

export async function GET(req: Request, { params }: { params: Promise<{ contentType: string }> }) {
  try {
    const { searchParams } = new URL(req.url);
    const { contentType: contentTypeParam } = await params;

    // Validate contentType from route params
    const contentTypeValidation = validateContentType(contentTypeParam);
    if (!contentTypeValidation.isValid) {
      return createErrorResponse(contentTypeValidation.error!, 400, true);
    }
    const contentType = contentTypeValidation.value!;

    // Validate id parameter
    const idValidation = validateId(searchParams.get('id'));
    if (!idValidation.isValid) {
      return createErrorResponse(idValidation.error!, 400, true);
    }
    const directorId = Number(searchParams.get('id'));

    // Validate page parameter
    const pageValidation = validatePage(searchParams.get('page'));
    if (!pageValidation.isValid) {
      return createErrorResponse(pageValidation.error!, 400, true);
    }
    const page = pageValidation.value;

    // Get content by director
    const result = await getContentByDirector(contentType, directorId, page);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error, 'GET_CONTENT_BY_DIRECTOR', true);
  }
}
