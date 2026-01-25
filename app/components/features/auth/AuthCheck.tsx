'use client';

import { useAuthCheck } from '@/hooks/auth/useAuthCheck';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isChecking } = useAuthCheck({ redirectTo: '/' });

  if (isAuthenticated === true || isChecking) {
    return null;
  }

  return <>{children}</>;
}
