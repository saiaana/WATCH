import Image from 'next/image';
import imdbLogo from '@/public/imdb-logo.png';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  type: 'rating' | 'genre' | 'year' | 'person' | 'playing';
  value?: string | number;
  className?: string;
  truncate?: boolean;
}

const variants = {
  rating: cn(
    'badge-base px-3 py-1.5 rounded-xl',
    'text-white text-xs sm:text-sm font-semibold',
    'bg-gradient-to-b from-black/70 to-black/40',
    'border-white/15 shadow-black/30',
  ),
  genre: cn(
    'badge-base px-3 py-1.5 rounded-xl',
    'text-purple-200 text-xs font-semibold',
    'bg-gradient-to-b from-purple-500/20 to-purple-500/10',
    'border-purple-300/20 hover:border-purple-300/35 hover:bg-purple-500/20',
  ),
  year: cn(
    'badge-base px-3 py-1.5 rounded-xl',
    'text-neutral-200/80 text-sm sm:text-base font-medium',
    'bg-gradient-to-b from-white/10 to-white/5',
    'border-white/10 hover:border-white/20 hover:text-neutral-200',
  ),
  person: cn(
    'badge-base px-1 py-1 rounded-xl flex items-start justify-start',
    'text-purple-100 text-xs',
    'bg-gradient-to-b from-purple-800/50 to-purple-900/30',
    'border-purple-300/15 hover:border-purple-300/25 hover:bg-purple-800/55',
  ),
  playing: cn(
    'badge-base px-2 py-1 rounded-lg',
    'text-purple-100 text-xs font-semibold',
    'bg-gradient-to-b from-purple-600/25 to-purple-700/10',
    'border-purple-300/20 shadow-purple-900/20',
    'animate-[badgeGlow_2.4s_ease-in-out_infinite]',
  ),
} as const;

function Badge({ type, value, className }: BadgeProps) {
  if (value === undefined || value === null || value === '') return null;

  const formattedValue =
    type === 'rating' && typeof value === 'number'
      ? value.toFixed(1)
      : type === 'rating' && typeof value === 'string' && !isNaN(parseFloat(value))
        ? parseFloat(value).toFixed(1)
        : value;

  const withIcon = type === 'rating';

  return (
    <span className={cn(variants[type], className)}>
      {withIcon && (
        <span className="relative h-4 w-9 opacity-90 sm:h-[18px] sm:w-10">
          <Image
            src={imdbLogo}
            alt="IMDb"
            fill
            sizes="40px"
            className="object-contain"
            priority={false}
          />
        </span>
      )}

      <span className="leading-none">
        {formattedValue}
        <span className="ml-0.5 opacity-80"></span>
      </span>
    </span>
  );
}

export default memo(Badge);
