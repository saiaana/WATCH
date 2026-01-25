import type { Actor } from '@/types/common';
import { getActorLink } from '@/helpers/routes';
import { normalizeProfilePath } from '@/helpers/normalizeProfilePath';

export interface MainCastActorModel {
  id: number;
  name: string;
  profilePath: string | null;
  link: string;
  character?: string;
}

const MAIN_CAST_SIZE = 10;

export function mapToMainCast(
  actors: Actor[],
  limit: number = MAIN_CAST_SIZE,
): MainCastActorModel[] {
  const mainCast = actors.slice(0, limit);

  return mainCast.map((actor) => ({
    id: actor.id,
    name: actor.name,
    profilePath: normalizeProfilePath(actor.profile_path),
    link: getActorLink(actor.id, actor.name),
    character: actor.character,
  }));
}
