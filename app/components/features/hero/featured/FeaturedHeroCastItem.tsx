import type { Actor } from '@/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { getActorLink } from '@/helpers/routes';
import { getProfileUrl } from '@/helpers/getTmdbImageUrl';
import { memo } from 'react';

interface FeaturedHeroCastItemProps {
  actor?: Actor;
}

function FeaturedHeroCastItem({ actor }: FeaturedHeroCastItemProps) {
  if (!actor) return null;

  const href = getActorLink(actor.id, actor.name);
  const imageUrl = getProfileUrl(actor.profile_path, 'w45');

  return (
    <Link href={href} className="cast-item-base group">
      {actor.profile_path && (
        <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full border border-white/30">
          <Image src={imageUrl} alt={actor.name} fill className="object-cover" unoptimized />
        </div>
      )}
      <span className="text-sm font-medium text-neutral-200 drop-shadow-md group-hover:text-white">
        {actor.name}
      </span>
    </Link>
  );
}

export default memo(FeaturedHeroCastItem);
