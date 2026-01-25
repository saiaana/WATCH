export function getSectionIcon(sectionTitle: string): string {
  const title = sectionTitle.toLowerCase();

  if (title.includes('trending') || title.includes('popular')) {
    return '🔥';
  }
  if (title.includes('top rated') || title.includes('top-rated')) {
    return '⭐';
  }
  if (title.includes('coming soon') || title.includes('upcoming')) {
    return '📅';
  }
  if (title.includes('now playing') || title.includes('continue watching')) {
    return '▶️';
  }
  if (title.includes('new')) {
    return '🆕';
  }
  if (title.includes('airing')) {
    return '📺';
  }
  return '🎬';
}
