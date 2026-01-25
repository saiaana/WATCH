'use client';

import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { getLastContentPage } from '@/hooks/ui/useContentNavigation';

const LogoComponent = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = Boolean(user);

  const navigateHome = () => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    const lastContentPage = getLastContentPage();
    router.push(lastContentPage === 'tv' ? '/tvshows' : '/movies');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Go to home"
      onClick={navigateHome}
      onKeyDown={(e) => e.key === 'Enter' && navigateHome()}
      className="group z-10 flex cursor-pointer select-none items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
    >
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] sm:p-2.5">
        <TheaterComedyRoundedIcon className="text-lg text-white sm:text-xl md:text-2xl" />

        <span className="pointer-events-none absolute inset-0 rounded-xl bg-purple-500/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-sm font-semibold tracking-wide text-transparent transition-all duration-300 group-hover:bg-[position:100%_0] sm:text-base md:text-xl">
        WATCH
      </span>
    </div>
  );
};

export default memo(LogoComponent);
