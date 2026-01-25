import { memo } from 'react';
import { cn } from '@/lib/utils';

interface HeaderButtonProps {
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

function HeaderButton({ onClick, ariaLabel, children, className }: HeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn('header-button-base group', className)}
    >
      {children}
    </button>
  );
}

export default memo(HeaderButton);
