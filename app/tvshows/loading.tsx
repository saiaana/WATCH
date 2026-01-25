import PageSkeleton from '@/app/components/ui/PageSkeleton';

export default function Loading() {
  return <PageSkeleton sections={['Trending', 'Top Rated', 'On The Air']} />;
}
