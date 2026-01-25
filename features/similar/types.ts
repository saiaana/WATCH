import type { Actor, CrewMember } from '@/types/common';
import type { MediaContent } from '@/types/media';

export interface SimilarFilters {
  genres: number[];
  actors: Actor[];
  directors: CrewMember[];
  originalLanguage?: string;
  originCountries?: string[];
  excludeId: number;
}

export interface ScoredItem {
  item: MediaContent;
  score: number;
}
