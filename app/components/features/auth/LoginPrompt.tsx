'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/app/components/ui/Button';

interface LoginPromptProps {
  icon?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function LoginPrompt({
  icon = '🔐',
  title = 'Access Your Favorites',
  description = 'Log in to save and manage your favorite movies and TV shows in one place',
  className,
}: LoginPromptProps) {
  return (
    <div className={cn('flex min-h-[500px] flex-col items-center justify-center px-4', className)}>
      <div className="mb-6 animate-fadeIn text-6xl">{icon}</div>
      <h2 className="mb-3 text-center text-2xl font-bold text-neutral-300 md:text-3xl">{title}</h2>
      <p className="mb-8 max-w-md text-center text-base text-neutral-500">{description}</p>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Button href="/login" variant="gradient" size="large" className="hover:scale-105">
          Log In
        </Button>
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span>New here?</span>
          <Link
            href="/signup"
            className="font-semibold text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
