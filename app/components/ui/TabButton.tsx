'use client';

import { cn } from '@/lib/utils';
import HoverGlow from './HoverGlow';

interface TabButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ label, icon, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'tab-button-base group',
        isActive ? 'tab-button-active' : 'tab-button-inactive',
      )}
    >
      <span className="relative z-10">
        {icon} {label}
      </span>
      {isActive && <HoverGlow />}
    </button>
  );
}
