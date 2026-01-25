'use client';

import { ReactNode, useTransition, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface ContentCardLayoutProps {
  poster: ReactNode;
  overlay?: ReactNode;
  ratingBadge?: ReactNode;
  title: ReactNode;
  genres?: ReactNode;
  gradientLine?: ReactNode;
  linkTo: string;
  className?: string;
  character?: ReactNode;
  knownForDepartment?: ReactNode;
  isPending?: boolean;
}

export default function ContentCardLayout({
  isPending: externalIsPending,
  poster,
  overlay,
  ratingBadge,
  title,
  genres,
  gradientLine,
  knownForDepartment,
  linkTo,
  character,
  className,
}: ContentCardLayoutProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pending = externalIsPending || isPending;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      startTransition(() => {
        router.push(linkTo);
      });
    },
    [linkTo, router],
  );

  const handleMouseEnter = useCallback(() => {
    router.prefetch(linkTo);
  }, [linkTo, router]);

  return (
    <div className={cn('content-card-wrapper group', className, pending && 'opacity-80')}>
      <Link
        href={linkTo}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn('content-card-link', pending && 'pointer-events-none cursor-wait')}
        aria-busy={pending}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              'relative h-full w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]',
              pending && 'opacity-70',
            )}
          >
            {poster}
          </div>
          {overlay}
        </div>
        {ratingBadge && (
          <div className={cn('absolute right-3 top-3 z-20', pending && 'opacity-60')}>
            {ratingBadge}
          </div>
        )}
        <div className={cn('content-card-overlay', pending && 'opacity-70')}>
          <div className="w-full space-y-1 text-left">
            {title}
            {character}
          </div>
          {knownForDepartment && (
            <div className="flex max-w-full flex-wrap gap-1.5">{knownForDepartment}</div>
          )}
          {genres}
          {gradientLine}
        </div>
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <LoadingSpinner />
          </div>
        )}
      </Link>
    </div>
  );
}
