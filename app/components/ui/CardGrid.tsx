'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

const gapClasses = {
  small: 'gap-2 sm:gap-3',
  medium: 'gap-3 sm:gap-4 md:gap-6',
  large: 'gap-4 sm:gap-6 md:gap-8',
} as const;

// Default grid classes (for backward compatibility)
const defaultGridClasses = 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

// Grid columns mapping for Tailwind classes
const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
};

const smGridColsMap: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7',
  8: 'sm:grid-cols-8',
};

const mdGridColsMap: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  7: 'md:grid-cols-7',
  8: 'md:grid-cols-8',
};

const lgGridColsMap: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
};

const xlGridColsMap: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  7: 'xl:grid-cols-7',
  8: 'xl:grid-cols-8',
};

// Generate grid classes from columns prop
function getGridClasses(columns?: CardGridProps['columns']): string {
  if (!columns) {
    return defaultGridClasses;
  }

  const classes: string[] = ['grid'];

  // Base (xs) - default to 2 if not specified
  const xsCols = columns.xs ?? 2;
  classes.push(gridColsMap[xsCols] || `grid-cols-${xsCols}`);

  if (columns.sm) {
    classes.push(smGridColsMap[columns.sm] || `sm:grid-cols-${columns.sm}`);
  }

  if (columns.md) {
    classes.push(mdGridColsMap[columns.md] || `md:grid-cols-${columns.md}`);
  }

  if (columns.lg) {
    classes.push(lgGridColsMap[columns.lg] || `lg:grid-cols-${columns.lg}`);
  }

  if (columns.xl) {
    classes.push(xlGridColsMap[columns.xl] || `xl:grid-cols-${columns.xl}`);
  }

  return classes.join(' ');
}

export default function CardGrid({
  children,
  columns,
  gap = 'medium',
  className,
}: CardGridProps) {
  const gridClasses = getGridClasses(columns);

  return (
    <div
      className={cn(gridClasses, gapClasses[gap], className)}
      style={{
        contain: 'layout style paint',
        willChange: 'contents',
      }}
    >
      {children}
    </div>
  );
}
