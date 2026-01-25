import ContentGridClient from '@/app/components/features/content/ContentGridClient';

export default function Page() {
  return (
    <ContentGridClient
      movieCategory="upcoming"
      tvCategory="on_the_air"
      title="Upcoming"
      subtitle="Upcoming releases you won't want to miss"
      icon="📅"
      moviesTabConfig={{
        emptyStateIcon: '📅',
        emptyStateTitle: 'No upcoming movies found',
        emptyStateDescription: 'Check back later for new releases',
        loadingTitle: 'Loading Upcoming Movies',
        loadingSubtitle: "Discovering what's coming soon...",
      }}
      tvTabConfig={{
        emptyStateIcon: '📺',
        emptyStateTitle: 'No TV shows on air found',
        emptyStateDescription: 'Check back later for new releases',
        loadingTitle: 'Loading TV Shows On Air',
        loadingSubtitle: "Discovering what's coming soon...",
      }}
    />
  );
}
