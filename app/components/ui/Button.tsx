'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'gradient' | 'outlined';
type ButtonSize = 'default' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  large: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  gradient: 'btn-gradient',
  outlined: cn(
    'group relative flex items-center justify-center gap-2',
    'bg-zinc-800/80 hover:bg-zinc-700/80',
    'text-white font-bold rounded-xl',
    'border border-zinc-700/50 hover:border-purple-500/50',
    'shadow-lg transition-all duration-300',
    'hover:scale-105 active:scale-95',
  ),
};

export default function Button({
  children,
  href,
  variant = 'gradient',
  size = 'default',
  className,
  ...buttonProps
}: ButtonProps) {
  const classes = cn(variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
