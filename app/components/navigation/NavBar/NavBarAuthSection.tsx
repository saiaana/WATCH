import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Link from 'next/link';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface NavBarAuthSectionProps {
  isCollapsed: boolean;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const authButtonBase = cn(
  'group w-full flex items-center rounded-lg',
  'text-base font-medium text-neutral-400',
  'transition-all duration-200',
  'border border-transparent cursor-pointer',
);

function NavBarAuthSection({ isCollapsed, isAuthenticated, handleLogout }: NavBarAuthSectionProps) {
  return (
    <div
      className={cn(
        'border-t border-zinc-800/50 transition-all duration-200',
        isCollapsed ? 'p-2' : 'p-4',
      )}
    >
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className={cn(
            authButtonBase,
            'hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400',
            isCollapsed ? 'justify-center px-2 py-3' : 'gap-4 px-4 py-3',
          )}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <span className="transition-transform duration-200 group-hover:scale-110">
            <LogoutOutlinedIcon fontSize="medium" />
          </span>
          {!isCollapsed && <span className="group-hover:font-medium">Logout</span>}
        </button>
      ) : (
        <Link
          href="/login"
          className={cn(
            authButtonBase,
            'hover:border-purple-500/20 hover:bg-purple-500/10 hover:text-purple-400',
            isCollapsed ? 'justify-center px-2 py-3' : 'gap-4 px-4 py-3',
          )}
          title={isCollapsed ? 'Log In' : undefined}
        >
          <span className="transition-transform duration-200 group-hover:scale-110">
            <LoginOutlinedIcon fontSize="medium" />
          </span>
          {!isCollapsed && <span className="group-hover:font-medium">Log In</span>}
        </Link>
      )}
    </div>
  );
}

export default memo(NavBarAuthSection);
