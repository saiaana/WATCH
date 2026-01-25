import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/server/tmdb-client';
import type { Genre } from '@/types/common';
import { createErrorResponse } from '@/lib/middleware/error-handler';

export async function GET() {
  try {
    const [movie, tv] = await Promise.all([
      tmdbClient.getGenres('movie'),
      tmdbClient.getGenres('tv'),
    ]);

    const genres = Array.from(
      new Map<number, Genre>([...movie.genres, ...tv.genres].map((g) => [g.id, g])).values(),
    ).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ genres });
  } catch {
    return createErrorResponse('Failed to fetch genres', 500);
  }
}
