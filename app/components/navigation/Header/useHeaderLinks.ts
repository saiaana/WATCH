import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

export interface HeaderLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ fontSize?: string; className?: string }>;
}

export function useHeaderLinks() {
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();
  const isAuthenticated = !!user;

  const mobileMenuLinks: HeaderLink[] = [
    { name: 'Movies', href: '/movies', icon: LocalMoviesIcon },
    { name: 'TV Shows', href: '/tvshows', icon: LiveTvOutlinedIcon },
    ...(isAuthenticated
      ? [{ name: 'Favorites', href: '/favorites', icon: FavoriteBorderOutlinedIcon }]
      : []),
    { name: 'Trending', href: '/trending', icon: TrendingUpOutlinedIcon },
    { name: 'Top Rated', href: '/top-rated', icon: StarBorderOutlinedIcon },
    { name: 'Upcoming', href: '/upcoming', icon: CalendarTodayOutlinedIcon },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return {
    mobileMenuLinks,
    isActive,
    isAuthenticated,
  };
}
