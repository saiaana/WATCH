import SimilarContentClient from '@/app/components/features/content/SimilarContentClient';

interface PageProps {
  params: Promise<{
    tvShowId: string;
  }>;
  searchParams: Promise<{
    title?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { tvShowId } = await params;
  const { title } = await searchParams;

  return <SimilarContentClient contentId={tvShowId} type="tv" title={title || 'TV Show'} />;
}
