import PersonContentClient from '@/app/components/features/content/PersonContentClient';

interface PageProps {
  params: Promise<{ directorName: string }>;
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { directorName } = await params;
  const { id } = await searchParams;
  const decodedName = decodeURIComponent(directorName);
  const directorId = id ? parseInt(id, 10) : undefined;

  return (
    <PersonContentClient personType="director" personName={decodedName} personId={directorId} />
  );
}
