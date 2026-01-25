import type { BasePath, ContentType } from '@/types/media';

export function getContentType(basePath: BasePath): ContentType {
  return basePath === '/movies' ? 'movie' : 'tv';
}
