'use client';

import ContentTypePageClient from '../ContentTypePageClient';

export default function TvShowsPageClient() {
  return (
    <ContentTypePageClient
      contentType="tv"
      lazySections={[
        { category: 'top_rated', title: 'Top Rated', path: '/top-rated' },
        { category: 'on_the_air', title: 'On The Air', path: '/upcoming' },
      ]}
      videoSection={{ category: 'airing_today', title: 'Continue watching' }}
    />
  );
}
