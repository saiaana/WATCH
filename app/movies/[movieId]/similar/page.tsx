import SimilarContentClient from '@/app/components/features/content/SimilarContentClient';

interface PageProps {
  params: Promise<{
    movieId: string;
  }>;
  searchParams: Promise<{
    title?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { movieId } = await params;
  const { title } = await searchParams;

  return <SimilarContentClient contentId={movieId} type="movie" title={title || 'Movie'} />;
}
