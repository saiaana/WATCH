export const SIMILAR_CONFIG = {
  pageSize: 20,
  sources: {
    genres: 3,
    actors: 3,
    directors: 2,
  },
  weights: {
    country: 10,
    genre: 1,
    actor: 3,
    director: 5,
    language: 2,
    ratingBoostMax: 1,
    votesBoostMax: 0.5,
  },
};
