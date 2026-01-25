import { NextResponse } from 'next/server';
import { cache } from '@/lib/cache';

interface YouTubeResponse {
  items?: Array<{
    id: {
      videoId: string;
    };
  }>;
}

// Cache YouTube trailer URLs for 24 hours to reduce API quota usage
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { movieTitle } = body;

    if (!movieTitle || typeof movieTitle !== 'string' || movieTitle.trim().length === 0) {
      return NextResponse.json({ error: 'movieTitle is required' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = `youtube_trailer:${movieTitle.trim().toLowerCase()}`;
    const cached = cache.get<{ trailerUrl: string | null }>(cacheKey);
    if (cached !== null) {
      return NextResponse.json(cached);
    }

    // YouTube API is optional - if not configured, return null
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const youtubeSearchUrl = process.env.YOUTUBE_SEARCH_URL;

    if (!youtubeApiKey || !youtubeSearchUrl) {
      console.warn('[YOUTUBE_TRAILER] YouTube API not configured, returning null');
      const result = { trailerUrl: null };
      cache.set(cacheKey, result, CACHE_TTL);
      return NextResponse.json(result);
    }

    const query = `${movieTitle.trim()} trailer`;
    const url = `${youtubeSearchUrl}?part=snippet&q=${encodeURIComponent(query)}&key=${youtubeApiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      let errorDetails: string;
      try {
        const errorData = await res.json();
        errorDetails = JSON.stringify(errorData, null, 2);
        
        // Check for specific YouTube API errors
        if (errorData.error) {
          const youtubeError = errorData.error;
          if (youtubeError.errors) {
            const firstError = youtubeError.errors[0];
            console.error(`[YOUTUBE_TRAILER] YouTube API error ${res.status}:`, {
              reason: firstError.reason,
              message: firstError.message,
              domain: firstError.domain,
              fullError: errorDetails,
            });
            
            // Common YouTube API errors:
            // - quotaExceeded: Daily quota exceeded
            // - keyInvalid: API key is invalid
            // - ipRefererBlocked: IP address or referer blocked
            // - accessNotConfigured: YouTube Data API not enabled
            if (firstError.reason === 'quotaExceeded') {
              console.warn(
                '[YOUTUBE_TRAILER] ⚠️ YouTube API quota exceeded. ' +
                'Daily quota limit reached. Quota resets at midnight Pacific Time. ' +
                'Consider: 1) Upgrading quota in Google Cloud Console, 2) Using multiple API keys, ' +
                '3) Increasing cache TTL to reduce API calls. ' +
                'Returning null for now - trailers will be unavailable until quota resets.',
              );
              // Cache null result for 1 hour to avoid repeated failed requests
              const result = { trailerUrl: null };
              cache.set(cacheKey, result, 60 * 60 * 1000); // 1 hour
              return NextResponse.json(result);
            } else if (firstError.reason === 'keyInvalid') {
              console.error('[YOUTUBE_TRAILER] YouTube API key is invalid. Please check YOUTUBE_API_KEY environment variable.');
            } else if (firstError.reason === 'accessNotConfigured') {
              console.error('[YOUTUBE_TRAILER] YouTube Data API v3 is not enabled. Please enable it in Google Cloud Console.');
            }
          } else {
            console.error(`[YOUTUBE_TRAILER] YouTube API error ${res.status}:`, errorDetails);
          }
        } else {
          console.error(`[YOUTUBE_TRAILER] YouTube API error ${res.status}:`, errorDetails);
        }
      } catch {
        const errorText = await res.text().catch(() => 'Unknown error');
        console.error(`[YOUTUBE_TRAILER] YouTube API error ${res.status} (non-JSON response):`, errorText);
        errorDetails = errorText;
      }
      
      // Return null instead of error - YouTube is optional
      // Cache null result for 1 hour to avoid repeated failed requests
      const result = { trailerUrl: null };
      cache.set(cacheKey, result, 60 * 60 * 1000); // 1 hour
      return NextResponse.json(result);
    }

    const data = (await res.json()) as YouTubeResponse;

    let result: { trailerUrl: string | null };
    if (data.items?.length > 0) {
      const videoId = data.items[0].id.videoId;
      result = {
        trailerUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
    } else {
      result = { trailerUrl: null };
    }

    // Cache the result for 24 hours
    cache.set(cacheKey, result, CACHE_TTL);
    return NextResponse.json(result);
  } catch (error) {
    // YouTube API is optional - log error but return null instead of 500
    console.error('[YOUTUBE_TRAILER] Error:', error);
    return NextResponse.json({ trailerUrl: null });
  }
}
