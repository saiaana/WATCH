import { memo } from 'react';
import TabButton from '@/app/components/ui/TabButton';
import { SEARCH_TABS, type SearchTabType } from './types';

interface SearchModalTabsProps {
  activeTab: SearchTabType;
  availableTabs: SearchTabType[];
  onTabChange: (tab: SearchTabType) => void;
}

function SearchModalTabs({ activeTab, availableTabs, onTabChange }: SearchModalTabsProps) {
  return (
    <div className="flex justify-center gap-4 border-b border-zinc-700 px-4 pb-2 pt-4">
      {availableTabs.map((tabType) => {
        const tab = SEARCH_TABS[tabType];
        return (
          <TabButton
            key={tabType}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tabType}
            onClick={() => onTabChange(tabType)}
          />
        );
      })}
    </div>
  );
}

export default memo(SearchModalTabs);
