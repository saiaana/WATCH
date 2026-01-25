import { NextResponse } from 'next/server';

export interface ApiErrorResponse {
  error: string;
  items?: unknown[];
  page?: number;
  totalPages?: number;
  totalResults?: number;
}

export function createErrorResponse(
  error: string,
  status: number = 500,
  includePagination: boolean = false,
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    error,
  };

  if (includePagination) {
    response.items = [];
    response.page = 1;
    response.totalPages = 1;
    response.totalResults = 0;
  }

  return NextResponse.json(response, {
    status,
  });
}

export function handleApiError(
  error: unknown,
  context: string,
  includePagination: boolean = false,
): NextResponse<ApiErrorResponse> {
  console.error(`[${context}]`, error);

  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

  return createErrorResponse(
    `Failed to ${context.toLowerCase()}: ${errorMessage}`,
    500,
    includePagination,
  );
}
