import ContentDetailPage from '@/app/components/features/ContentDetailPage';

interface PageProps {
  params: Promise<{
    tvShowId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { tvShowId } = await params;
  return <ContentDetailPage id={tvShowId} contentType="tv" basePath="/tvshows" />;
}
