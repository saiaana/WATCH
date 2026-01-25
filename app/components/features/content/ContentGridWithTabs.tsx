'use client';

import React from 'react';
import ContentGridLayout from '@/app/components/layout/ContentGridLayout';
import type { CardItem } from '@/features/cards/mapToCardItem';
import type { TabContent } from '@/types/component';
import LoadingState from '@/app/components/ui/LoadingState';
import ContentGrid from './ContentGrid';
import InfiniteScrollFooter from '@/app/components/ui/InfiniteScrollFooter';
import { useContentTabs } from '@/hooks/ui/useContentTabs';

interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  moviesTab: TabContent;
  tvTab: TabContent;
  getMovieLinkTo: (item: CardItem) => string;
  getTvLinkTo: (item: CardItem) => string;
  showTabs?: boolean;
}

export default function ContentGridWithTabs({
  title,
  subtitle,
  icon,
  moviesTab,
  tvTab,
  getMovieLinkTo,
  getTvLinkTo,
  showTabs = true,
}: Props) {
  const { availableTabs, displayTab, currentTab, handleTabChange } = useContentTabs({
    moviesTab,
    tvTab,
  });

  const getLinkTo = displayTab === 'movies' ? getMovieLinkTo : getTvLinkTo;
  const itemType = displayTab === 'movies' ? 'movie' : 'tv';

  if (currentTab.initialLoading) {
    return (
      <ContentGridLayout
        title={title}
        subtitle={subtitle}
        icon={icon}
        activeTab={showTabs ? displayTab : undefined}
        onTabChange={showTabs ? handleTabChange : undefined}
        availableTabs={showTabs ? availableTabs : undefined}
        showTabs={showTabs}
      >
        <LoadingState
          title={currentTab.loadingTitle || 'Loading...'}
          subtitle={currentTab.loadingSubtitle || 'Please wait'}
        />
      </ContentGridLayout>
    );
  }

  return (
    <ContentGridLayout
      title={title}
      subtitle={subtitle}
      icon={icon}
      activeTab={showTabs ? displayTab : undefined}
      onTabChange={showTabs ? handleTabChange : undefined}
      availableTabs={showTabs ? availableTabs : undefined}
      showTabs={showTabs}
    >
      <ContentGrid
        items={currentTab.items}
        emptyStateIcon={currentTab.emptyStateIcon}
        emptyStateTitle={currentTab.emptyStateTitle}
        emptyStateDescription={currentTab.emptyStateDescription}
        getLinkTo={getLinkTo}
      />
      <InfiniteScrollFooter
        loadMoreRef={currentTab.loadMoreRef}
        loading={currentTab.loading}
        hasMore={currentTab.hasMore}
        itemCount={currentTab.items.length}
        itemType={itemType}
      />
    </ContentGridLayout>
  );
}
