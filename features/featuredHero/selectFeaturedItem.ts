import { MediaContent } from '@/types/media';

export function selectFeaturedItem(content: MediaContent[]): MediaContent | null {
  if (!content?.length) return null;
  return content[0];
}
