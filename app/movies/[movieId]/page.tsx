import ContentDetailPage from '@/app/components/features/ContentDetailPage';

interface PageProps {
  params: Promise<{
    movieId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { movieId } = await params;
  return <ContentDetailPage id={movieId} contentType="movie" basePath="/movies" />;
}
