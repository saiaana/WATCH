'use client';

import { cn } from '@/lib/utils';
import { getSectionIcon } from '@/helpers/getSectionIcon';
import GradientLine from './GradientLine';

interface SectionHeaderProps {
  title: string;
  variant?: 'default' | 'large' | 'small';
  showIcon?: boolean;
  className?: string;
}

const variantClasses = {
  default: 'text-xl sm:text-2xl md:text-3xl',
  large: 'text-2xl sm:text-3xl lg:text-4xl',
  small: 'text-lg sm:text-xl md:text-2xl',
} as const;

const containerClasses = {
  default: 'gap-2 sm:gap-3 mb-4 sm:mb-6',
  large: 'gap-3 mb-6 sm:mb-8',
  small: 'gap-2 mb-3 sm:mb-4',
} as const;

const iconSizes = {
  default: 'text-2xl sm:text-3xl',
  large: 'text-3xl sm:text-4xl',
  small: 'text-xl sm:text-2xl',
} as const;

const titleGradient =
  'font-extrabold bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent tracking-tight drop-shadow-sm';

export default function SectionHeader({
  title,
  variant = 'default',
  showIcon = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center', containerClasses[variant], className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        {showIcon && (
          <span
            className={cn(iconSizes[variant], 'transition-transform duration-300 hover:scale-110')}
          >
            {getSectionIcon(title)}
          </span>
        )}
        <h2 className={cn(variantClasses[variant], titleGradient)}>{title}</h2>
      </div>
      <GradientLine variant="subtle" className="ml-4 flex-1 sm:ml-6" />
    </div>
  );
}
