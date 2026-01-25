// Validate TMDB configuration (server-only)
function validateTmdbConfig() {
  const apiKey = process.env.TMDB_API_KEY || process.env.THE_MOVIEDB_API_KEY || '';
  const bearer = process.env.TMDB_BEARER_TOKEN || process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN || '';

  if (!apiKey && !bearer) {
    throw new Error(
      '❌ TMDB API configuration is missing. Please set either TMDB_API_KEY or TMDB_BEARER_TOKEN in your environment variables.',
    );
  }

  return {
    baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    apiKey,
    bearer,
  };
}

// This file is server-only, so validation runs at module load time
const tmdbConfig = validateTmdbConfig();

export const env = {
  tmdb: tmdbConfig,
};
