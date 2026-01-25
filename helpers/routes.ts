import type { ContentType } from '@/types/media';

export function getContentLink(id: number, type: ContentType): string {
  return type === 'tv' ? `/tvshows/${id}` : `/movies/${id}`;
}

export function getActorLink(id: number, name: string): string {
  return `/actor/${id}?name=${encodeURIComponent(name)}`;
}
