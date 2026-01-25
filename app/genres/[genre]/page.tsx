import { notFound } from 'next/navigation';
import GenreClient from '@/app/components/features/genre/GenreClient';

interface PageProps {
  params: Promise<{
    genre: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { genre } = await params;
  const genreId = parseInt(genre, 10);

  if (isNaN(genreId) || genreId <= 0) {
    notFound();
  }

  return <GenreClient genreId={genreId} />;
}
