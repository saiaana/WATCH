import { TabType } from '@/types/media';

import ContentTypeTabs from '@/app/components/ui/ContentTypeTabs';
import PageLayout from '@/app/components/layout/PageLayout';
import PageTitle from '@/app/components/layout/PageTitle';

interface ContentGridLayoutProps {
  title: string;
  subtitle?: string;
  icon?: string;
  showTabs?: boolean;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  availableTabs?: TabType[];
  children: React.ReactNode;
}

export default function ContentGridLayout({
  title,
  subtitle,
  icon,
  showTabs = true,
  activeTab,
  onTabChange,
  availableTabs = ['movies', 'tv'],
  children,
}: ContentGridLayoutProps) {
  const shouldShowTabs = showTabs && availableTabs.length > 1;

  return (
    <PageLayout>
      <PageTitle title={title} subtitle={subtitle} icon={icon} />
      {shouldShowTabs && (
        <ContentTypeTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          availableTabs={availableTabs}
        />
      )}
      {children}
    </PageLayout>
  );
}
