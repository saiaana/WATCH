'use client';

import { useRouter } from 'next/navigation';
import { getActorLink } from '@/helpers/routes';
import { memo, useCallback } from 'react';
import ActorRow from './ActorRow';
import { Actor } from '@/types/common';

interface ActorListProps {
  actors: Actor[];
}

function ActorList({ actors }: ActorListProps) {
  const router = useRouter();

  const goToActorPage = useCallback(
    (actorId: number, actorName: string) => {
      router.push(getActorLink(actorId, actorName));
    },
    [router],
  );
  if (actors.length === 0) {
    return null;
  }

  return (
    <div className="custom-scrollbar max-h-[40vh] w-full overflow-y-auto pr-2">
      <div className="space-y-2">
        {actors.map((actor) => (
          <ActorRow key={actor.id} actor={actor} onClick={goToActorPage} />
        ))}
      </div>
    </div>
  );
}

export default memo(ActorList);
