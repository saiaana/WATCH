import Poster from '@/app/components/features/content/Poster';
import GlassContainer from '@/app/components/ui/GlassContainer';

export default function ContentPoster({ posterUrl, title }: { posterUrl: string; title: string }) {
  return (
    <GlassContainer className="flex h-full w-full flex-col">
      <div className="mx-auto w-full flex-1 lg:flex lg:items-center">
        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg shadow-xl lg:h-auto">
          <Poster src={posterUrl} alt={title} visible={true} />
        </div>
      </div>
    </GlassContainer>
  );
}
