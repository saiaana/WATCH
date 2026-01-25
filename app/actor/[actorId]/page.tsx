import PersonContentClient from '@/app/components/features/content/PersonContentClient';

interface PageProps {
  params: Promise<{ actorId: string }>;
  searchParams: Promise<{ name?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { actorId } = await params;
  const { name } = await searchParams;
  const actorIdNum = Number(actorId);
  const actorName = name ?? '';

  return <PersonContentClient personType="actor" personId={actorIdNum} personName={actorName} />;
}
