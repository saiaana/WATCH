'use client';

import { memo, useState } from 'react';
import Image from 'next/image';

import { getActorLink } from '@/helpers/routes';
import { getProfileUrl } from '@/helpers/getTmdbImageUrl';
import ContentCardLayout from '@/app/components/features/content/ContentCardLayout';
import GradientLine from '@/app/components/ui/GradientLine';
import Badge from '@/app/components/ui/Badge';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

interface PersonCardProps {
  id: number;
  name: string;
  profilePath: string | null;
  character?: string;
  knownForDepartment?: string;
}

function PersonCard({ id, name, profilePath, knownForDepartment, character }: PersonCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = profilePath ? getProfileUrl(profilePath, 'w500') : '/poster.png';

  const departmentLabel =
    knownForDepartment === 'Acting'
      ? 'Actor'
      : knownForDepartment === 'Directing'
        ? 'Director'
        : null;

  return (
    <ContentCardLayout
      linkTo={getActorLink(id, name)}
      poster={
        <div className="relative h-full w-full">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/50">
              <LoadingSpinner size="sm" />
            </div>
          )}
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      }
      title={
        <h3 className="text-left text-xs leading-tight tracking-tight text-white md:text-sm">
          {name}
        </h3>
      }
      character={
        character ? (
          <Badge
            type="person"
            value={`as ${character}`}
            truncate
            className="max-w-full self-start"
          />
        ) : null
      }
      knownForDepartment={
        departmentLabel ? (
          <Badge type="person" value={departmentLabel} className="self-start" />
        ) : null
      }
      gradientLine={
        <GradientLine
          variant="accent"
          className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 transition-transform duration-300 motion-safe:group-hover:scale-x-100"
        />
      }
    />
  );
}

export default memo(PersonCard);
