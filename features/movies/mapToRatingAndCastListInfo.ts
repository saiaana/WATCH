import type { Actor } from '@/types/common';
import { normalizeProfilePath } from '@/helpers/normalizeProfilePath';
import { MediaContent } from '@/types/media';

export interface RatingAndCastListModel {
  vote_average: number;
  vote_count: number;
  actors: Actor[];
}

export function mapToRatingAndCastListInfo(
  movie: MediaContent,
  actors: Actor[],
): RatingAndCastListModel {
  return {
    vote_average: movie.vote_average || 0,
    vote_count: movie.vote_count || 0,
    actors: actors.map((actor) => ({
      id: actor.id,
      name: actor.name,
      profile_path: normalizeProfilePath(actor.profile_path) || null,
      character: actor.character,
    })),
  };
}
