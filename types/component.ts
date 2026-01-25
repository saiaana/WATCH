import type { CardItem } from '@/features/cards/mapToCardItem';
import { BasePath } from './media';

export interface TabContent {
  items: CardItem[];
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  loadMoreRef?: (node: HTMLDivElement | null) => void;
  emptyStateIcon?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  loadingTitle?: string;
  loadingSubtitle?: string;
  itemCount?: number;
  itemType?: 'movie' | 'tv';
  getLinkTo?: (item: CardItem) => string;
}

export interface TabConfig {
  emptyStateIcon?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  loadingTitle?: string;
  loadingSubtitle?: string;
}

export interface ContentSliderProps {
  sectionTitle: string;
  items: Array<{ id: number; cardItem: CardItem }>;
  path?: string;
  basePath?: BasePath;
  title?: string;
}
