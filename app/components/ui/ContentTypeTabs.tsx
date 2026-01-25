'use client';

import { cn } from '@/lib/utils';
import TabButton from './TabButton';
import type { TabType } from '@/types/media';

interface ContentTypeTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  availableTabs?: TabType[];
  className?: string;
}

export default function ContentTypeTabs({
  activeTab,
  onTabChange,
  availableTabs = ['movies', 'tv'],
  className,
}: ContentTypeTabsProps) {
  const handleMoviesClick = () => onTabChange('movies');
  const handleTvClick = () => onTabChange('tv');

  return (
    <div className={cn('mb-10 flex justify-center gap-4 sm:mb-12', className)}>
      {availableTabs.includes('movies') && (
        <TabButton
          label="Movies"
          icon="🎬"
          isActive={activeTab === 'movies'}
          onClick={handleMoviesClick}
        />
      )}
      {availableTabs.includes('tv') && (
        <TabButton
          label="TV Shows"
          icon="📺"
          isActive={activeTab === 'tv'}
          onClick={handleTvClick}
        />
      )}
    </div>
  );
}
