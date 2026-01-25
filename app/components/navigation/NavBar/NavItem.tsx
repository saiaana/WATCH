'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { SvgIconComponent } from '@mui/icons-material';
import { memo, useTransition, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  name: string;
  href: string;
  Icon: SvgIconComponent;
  isCollapsed?: boolean;
}

function NavItemComponent({ name, href, Icon, isCollapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      startTransition(() => {
        router.push(href);
      });
    },
    [href, router],
  );

  const handleMouseEnter = useCallback(() => {
    // Prefetch страницу при hover для мгновенной загрузки
    if (!active) {
      router.prefetch(href);
    }
  }, [href, router, active]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'nav-item-base group relative',
        isCollapsed ? 'justify-center px-2 py-3' : 'gap-4 px-4 py-3',
        active ? 'nav-item-active' : 'nav-item-inactive',
        isPending && 'cursor-wait opacity-70',
      )}
      title={isCollapsed ? name : undefined}
      aria-busy={isPending}
    >
      {active && <div className="nav-item-indicator" />}

      <span
        className={cn(
          'nav-item-icon-base relative',
          active
            ? 'nav-item-icon-active'
            : 'nav-item-icon-inactive group-hover:scale-110 group-hover:text-purple-400',
          isPending && 'opacity-60',
        )}
      >
        <Icon fontSize="medium" />
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-1 w-1 animate-pulse rounded-full bg-current" />
          </span>
        )}
      </span>

      {!isCollapsed && (
        <span
          className={cn(
            'nav-item-label-base',
            active ? 'nav-item-label-active' : 'nav-item-label-inactive group-hover:font-medium',
            isPending && 'opacity-60',
          )}
        >
          {name}
        </span>
      )}

      <div
        className={cn(
          'nav-item-glow',
          active ? 'nav-item-glow-active' : 'group-hover:opacity-100',
          isPending && 'opacity-50',
        )}
      />
    </Link>
  );
}

export const NavItem = memo(NavItemComponent);
