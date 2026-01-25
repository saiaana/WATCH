declare namespace NodeJS {
  interface ProcessEnv {
    // TMDB API (use either API_KEY or BEARER_TOKEN)
    TMDB_BASE_URL?: string;
    TMDB_API_KEY?: string;
    TMDB_BEARER_TOKEN?: string;
    // Legacy support
    THE_MOVIEDB_API_KEY?: string;
    NEXT_PUBLIC_TMDB_BEARER_TOKEN?: string;

    // YouTube API (optional)
    YOUTUBE_API_KEY?: string;
    YOUTUBE_SEARCH_URL?: string;

    // OpenAI API (optional, for AI recommendations)
    OPEN_AI_API_URL?: string;
    OPEN_AI_API_KEY?: string;

    // Supabase (required for auth/favorites)
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
