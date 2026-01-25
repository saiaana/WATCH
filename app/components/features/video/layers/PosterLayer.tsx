import Poster from '@/app/components/features/content/Poster';
import GradientOverlay from '@/app/components/ui/GradientOverlay';
import { getPosterUrl } from '@/helpers/getTmdbImageUrl';
import { getContentTitle } from '@/utils/contentInfoUtils';
import { memo } from 'react';
import { MediaContent } from '@/types/media';

interface PosterLayerProps {
  content: MediaContent;
  visible: boolean;
}

function PosterLayer({ content, visible }: PosterLayerProps) {
  const posterUrl = getPosterUrl(content.poster_path, 'original');
  const title = getContentTitle(content);

  return (
    <div
      className={`absolute inset-0 z-30 transition-all duration-500 ease-in-out ${visible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
    >
      <Poster src={posterUrl} alt={title} visible={true} />
      <GradientOverlay variant="bottom" />
    </div>
  );
}

export default memo(PosterLayer);
