'use client';

import { cn } from '@/lib/utils';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import type { RootState } from '@/store';
import { useLogout } from '@/hooks/auth/useLogout';
import { useSelector } from 'react-redux';
import NavBarHeader from './NavBarHeader';
import NavBarAuthSection from './NavBarAuthSection';
import { NavItem } from './NavItem';
import { memo } from 'react';

const BASE_LINKS = [
  { name: 'Movies', href: '/movies', icon: LocalMoviesIcon },
  { name: 'TV Shows', href: '/tvshows', icon: LiveTvOutlinedIcon },
  { name: 'Trending', href: '/trending', icon: TrendingUpOutlinedIcon },
  { name: 'Top Rated', href: '/top-rated', icon: StarBorderOutlinedIcon },
  {
    name: 'Upcoming',
    href: '/upcoming',
    icon: CalendarTodayOutlinedIcon,
  },
];

const FAVORITES_LINK = {
  name: 'Favorites',
  href: '/favorites',
  icon: FavoriteBorderOutlinedIcon,
};

interface NavBarProps {
  isCollapsed?: boolean;
}

function NavBar({ isCollapsed = false }: NavBarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;

  const navLinks = isAuthenticated
    ? [BASE_LINKS[0], BASE_LINKS[1], FAVORITES_LINK, BASE_LINKS[2], BASE_LINKS[3], BASE_LINKS[4]]
    : BASE_LINKS;

  const handleLogout = useLogout();

  return (
    <div className="flex h-full flex-col border-r border-zinc-800/50 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <NavBarHeader isCollapsed={isCollapsed} />

      <nav
        className={cn(
          'flex-1 space-y-2 overflow-y-auto transition-all duration-200',
          isCollapsed ? 'px-2 py-4' : 'px-4 py-6',
        )}
      >
        {navLinks.map((link) => (
          <NavItem
            key={link.name}
            name={link.name}
            href={link.href}
            Icon={link.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <NavBarAuthSection
        isCollapsed={isCollapsed}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default memo(NavBar);
