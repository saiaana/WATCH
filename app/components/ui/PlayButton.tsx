'use client';

import { PlayCircle } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PlayButton({ size = 'md', className = '', ...props }: PlayButtonProps) {
  const sizeClasses = {
    sm: 'p-2 sm:p-3',
    md: 'p-3 sm:p-4',
    lg: 'p-4 sm:p-5',
  };

  const iconSizes = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  return (
    <button
      className={`rounded-full bg-black/70 ${sizeClasses[size]} flex items-center justify-center border-2 border-white/20 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500/50 ${className} `}
      {...props}
    >
      <PlayCircle size={iconSizes[size]} className="text-white sm:h-16 sm:w-16" />
    </button>
  );
}
