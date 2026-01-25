import { memo } from 'react';
import { cn } from '@/lib/utils';
import Logo from '../Header/Logo';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';

function NavBarHeader({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={cn('transition-all duration-200', isCollapsed ? 'p-4' : 'p-6')}>
      {isCollapsed ? (
        <div className="flex items-center justify-center">
          <div className="logo-icon-compact">
            <TheaterComedyRoundedIcon className="text-white" sx={{ fontSize: 24 }} />
          </div>
        </div>
      ) : (
        <Logo />
      )}
    </div>
  );
}

export default memo(NavBarHeader);
