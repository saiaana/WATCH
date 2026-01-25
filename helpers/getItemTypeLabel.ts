export function getItemTypeLabel(itemType: 'movie' | 'tv' | 'item', count: number) {
  const plural = count === 1 ? '' : 's';
  return itemType === 'tv' ? `TV show${plural}` : `${itemType}${plural}`;
}
