'use client';

import Link from 'next/link';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import Button from '@/app/components/ui/Button';

export default function HeroAuthSection() {
  const { isAuthenticated, isChecking } = useAuthCheck();

  if (isAuthenticated === true || isChecking) {
    return null;
  }

  return (
    <div className="flex animate-fadeIn flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <Button href="/login" variant="outlined" size="default" className="hover:scale-105">
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
  );
}
