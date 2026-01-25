'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors';
import { supabase } from '@/lib/supabase';

interface UseAuthCheckOptions {
  redirectTo?: string;
  onAuthenticated?: () => void;
}

interface UseAuthCheckReturn {
  user: ReturnType<typeof selectUser>;
  isChecking: boolean;
  isAuthenticated: boolean | null;
}

export function useAuthCheck(options: UseAuthCheckOptions = {}): UseAuthCheckReturn {
  const { redirectTo, onAuthenticated } = options;
  const router = useRouter();
  const user = useSelector(selectUser);
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (user) {
      setHasSession(true);
      setIsChecking(false);

      if (redirectTo) {
        router.replace(redirectTo);
      }

      if (onAuthenticated) {
        onAuthenticated();
      }
    }
  }, [user, redirectTo, router, onAuthenticated]);

  useEffect(() => {
    if (user) {
      return;
    }

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const authenticated = !!session?.user;
        setHasSession(authenticated);

        if (authenticated) {
          if (redirectTo) {
            router.replace(redirectTo);
          }
          if (onAuthenticated) {
            onAuthenticated();
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setHasSession(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [user, redirectTo, router, onAuthenticated]);

  const isAuthenticated = user ? true : hasSession;

  return {
    user,
    isChecking,
    isAuthenticated,
  };
}
