import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/middleware/error-handler';

interface YouTubeResponse {
  items?: Array<{
    id: {
      videoId: string;
    };
  }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { movieTitle } = body;

    if (!movieTitle || typeof movieTitle !== 'string' || movieTitle.trim().length === 0) {
      return NextResponse.json({ error: 'movieTitle is required' }, { status: 400 });
    }

    const query = `${movieTitle.trim()} trailer`;
    const url = `${process.env.YOUTUBE_SEARCH_URL}?part=snippet&q=${encodeURIComponent(
      query,
    )}&key=${process.env.YOUTUBE_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to search YouTube trailer');
    }

    const data = (await res.json()) as YouTubeResponse;

    if (data.items?.length > 0) {
      const videoId = data.items[0].id.videoId;
      return NextResponse.json({
        trailerUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }

    return NextResponse.json({ trailerUrl: null });
  } catch (error) {
    return handleApiError(error, 'YOUTUBE_TRAILER');
  }
}
