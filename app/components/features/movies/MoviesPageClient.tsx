'use client';

import ContentTypePageClient from '../ContentTypePageClient';

export default function MoviesPageClient() {
  return (
    <ContentTypePageClient
      contentType="movie"
      lazySections={[
        { category: 'top_rated', title: 'Top Rated', path: '/top-rated' },
        { category: 'upcoming', title: 'Upcoming', path: '/upcoming' },
      ]}
      videoSection={{ category: 'now_playing', title: 'Continue watching' }}
    />
  );
}
