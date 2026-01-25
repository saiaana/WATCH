'use client';

import { memo, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FeaturedHeroBackgroundProps {
  poster: string;
  title: string;
}

function FeaturedHeroBackground({ poster, title }: FeaturedHeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
      )}
      <div className="relative h-full w-full">
        <Image
          src={poster}
          alt={title}
          fill
          priority
          sizes="100vw"
          quality={100}
          className={cn(
            'animate-vertical-pan object-cover will-change-transform',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}

export default memo(FeaturedHeroBackground);
