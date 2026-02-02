export const MOVIE_RECOMMENDATION_PROMPT = `
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
`;
