'use client';

import { X } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'red';
}

export default function CloseButton({
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}: CloseButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5 sm:p-2',
    md: 'p-2 sm:p-3',
    lg: 'p-3 sm:p-4',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const variantClasses = {
    default: 'text-white hover:text-red-400 border-white/20 hover:border-red-500/50',
    red: 'text-red-400 hover:text-red-300 border-red-500/50 hover:border-red-400/70',
  };

  return (
    <button
      className={` ${sizeClasses[size]} rounded-lg bg-black/80 ${variantClasses[variant]} border shadow-lg transition-all duration-200 hover:scale-110 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${className} `}
      aria-label="Close"
      {...props}
    >
      <X size={iconSizes[size]} className="sm:h-6 sm:w-6" />
    </button>
  );
}
