import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useHeaderLinks } from './useHeaderLinks';
import GenreSelector from '@/app/components/features/genre/GenreSelector';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isNavBarHovered?: boolean;
}

function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  const { mobileMenuLinks, isActive } = useHeaderLinks();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="animate-in slide-in-from-top-2 fixed left-0 right-0 top-14 z-40 border-b border-zinc-800/50 bg-zinc-900/95 shadow-xl duration-200 sm:top-16 md:hidden">
      <nav className="space-y-2 px-4 py-4">
        {mobileMenuLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 ease-in-out',
                'focus:outline-none focus:ring-2 focus:ring-purple-500/50 active:scale-95',
                active
                  ? 'border-purple-500/30 bg-purple-500/20 text-purple-300 shadow-md shadow-purple-500/10'
                  : 'border-transparent text-neutral-300 hover:border-purple-500/20 hover:bg-zinc-800/50 hover:text-purple-300',
              )}
            >
              <Icon
                fontSize="small"
                className={cn(
                  'transition-transform duration-200',
                  active ? 'scale-110' : 'group-hover:scale-110',
                )}
              />
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          );
        })}
        <div className="pt-2">
          <GenreSelector variant="mobile" />
        </div>
      </nav>
    </div>
  );
}

export default memo(HeaderMobileMenu);
