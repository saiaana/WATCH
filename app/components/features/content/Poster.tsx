'use client';

import { memo, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

interface PosterProps {
  src: string;
  alt: string;
  visible?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function Poster({
  src,
  alt,
  visible = true,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 320px, 300px',
  priority = false,
}: PosterProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || error) {
    return (
      <div className="bg-placeholder flex h-full w-full items-center justify-center">
        <span className="text-4xl text-zinc-500">🎬</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/50">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={90}
        className={cn(
          'object-cover transition-all duration-500',
          visible ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          className,
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}

export default memo(Poster);
