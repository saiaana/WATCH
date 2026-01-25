import { NextResponse } from 'next/server';
import { handleApiError, createErrorResponse } from '@/lib/middleware/error-handler';
import { validateSearchQuery } from '@/lib/middleware/validation';
import { checkRateLimit, getClientIP } from '@/lib/middleware/rate-limit';
import { tmdbClient } from '@/lib/server/tmdb-client';
import type { TMDBMovie, TMDBTvShow } from '@/lib/server/tmdb-client';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface Recommendations {
  movies?: string[];
  tvShows?: string[];
}

export async function POST(req: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP, 5, 60 * 1000);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: rateLimitResult.message || 'Rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          resetAt: rateLimitResult.resetAt,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    const body = await req.json();
    const { prompt: promptRaw } = body;

    // Validate prompt
    const promptValidation = validateSearchQuery(promptRaw);
    if (!promptValidation.isValid) {
      return createErrorResponse(promptValidation.error!, 400, true);
    }
    const prompt = promptValidation.value!;

    // OpenAI config
    const openAiUrl =
      process.env.OPEN_AI_API_URL || 'https://api.openai.com/v1/chat/completions';
    const openAiKey = process.env.OPEN_AI_API_KEY;

    if (!openAiKey) {
      return createErrorResponse('OpenAI API key is not configured', 500, true);
    }

    // OpenAI request
    const openAiRequestBody = {
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a recommendation engine. Output valid JSON only.',
        },
        {
          role: 'user',
          content: `
              User request: "${prompt}"

              Return recommendations in this JSON format:
              {
                "movies": ["Movie title", ...],
                "tvShows": ["TV show title", ...]
              }

              Rules:
              - Use original English titles
              - Max 6 items per category
              - If only movies or only TV shows are requested, return only that field
              - No extra text, JSON only
              `,
        },
      ],
      max_tokens: 300,
      response_format: { type: 'json_object' },
    };

    const openAiResponse = await fetch(openAiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openAiRequestBody),
    });

    if (!openAiResponse.ok) {
      const errorData = await openAiResponse.json().catch(() => ({}));
      return createErrorResponse(
        `OpenAI API error: ${errorData.error?.message || openAiResponse.statusText}`,
        openAiResponse.status,
        true,
      );
    }

    const openAiData: OpenAIResponse = await openAiResponse.json();
    const content = openAiData.choices[0]?.message?.content;

    if (!content) {
      return createErrorResponse('No content received from OpenAI', 500, true);
    }

    let recommendations: Recommendations;
    try {
      recommendations = JSON.parse(content);
    } catch {
      return createErrorResponse('Failed to parse OpenAI response', 500, true);
    }

    if (
      (!recommendations.movies || recommendations.movies.length === 0) &&
      (!recommendations.tvShows || recommendations.tvShows.length === 0)
    ) {
      return createErrorResponse('No recommendations generated', 422, true);
    }

    const searchMovie = async (title: string): Promise<TMDBMovie | null> => {
      try {
        const searchResult = await tmdbClient.searchContent('movie', title, 1);
        if (searchResult.results?.length) {
          return await tmdbClient.getContent(
            'movie',
            searchResult.results[0].id.toString(),
          );
        }
        return null;
      } catch {
        return null;
      }
    };

    const searchTvShow = async (title: string): Promise<TMDBTvShow | null> => {
      try {
        const searchResult = await tmdbClient.searchContent('tv', title, 1);
        if (searchResult.results?.length) {
          return await tmdbClient.getContent(
            'tv',
            searchResult.results[0].id.toString(),
          );
        }
        return null;
      } catch {
        return null;
      }
    };

    const moviePromises =
      recommendations.movies?.map((title) => searchMovie(title)) || [];
    const tvShowPromises =
      recommendations.tvShows?.map((title) => searchTvShow(title)) || [];

    const [movieResults, tvShowResults] = await Promise.all([
      Promise.allSettled(moviePromises),
      Promise.allSettled(tvShowPromises),
    ]);

    const movies = movieResults
      .filter((r) => r.status === 'fulfilled' && r.value)
      .map((r) => (r as PromiseFulfilledResult<TMDBMovie>).value);

    const tvShows = tvShowResults
      .filter((r) => r.status === 'fulfilled' && r.value)
      .map((r) => (r as PromiseFulfilledResult<TMDBTvShow>).value);

    const response = NextResponse.json({ movies, tvShows });

    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set(
      'X-RateLimit-Remaining',
      rateLimitResult.remaining.toString(),
    );
    response.headers.set(
      'X-RateLimit-Reset',
      new Date(rateLimitResult.resetAt).toISOString(),
    );

    return response;
  } catch (error) {
    return handleApiError(error, 'AI_RECOMMENDATIONS', true);
  }
}