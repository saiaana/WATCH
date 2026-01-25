import { cn } from '@/lib/utils';
import Badge from '@/app/components/ui/Badge';
import GradientLine from '@/app/components/ui/GradientLine';
import { getContentTitle } from '@/utils/contentInfoUtils';
import { memo } from 'react';
import { MediaContent } from '@/types/media';

interface VideoInfoProps {
  content: MediaContent;
  isPlaying?: boolean;
}

function VideoInfo({ content, isPlaying = false }: VideoInfoProps) {
  const title = getContentTitle(content);
  const rating = content.vote_average ? content.vote_average.toFixed(1) : '0.0';


  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 z-30 rounded-xl bg-gradient-to-t from-black/95 via-black/70 to-transparent',
        'p-4 transition-all duration-300 sm:p-5',
        isPlaying ? 'opacity-0' : 'opacity-100',
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-base font-bold leading-tight text-white sm:text-lg">
        {title}
      </h3>
      <div className="flex items-center gap-2">
        <Badge type="rating" value={rating} />
        {isPlaying && <Badge type="playing" value="Playing" />}
      </div>
      <GradientLine variant="full" className="absolute bottom-0 left-0 right-0 h-0.5" />
    </div>
  );
}

export default memo(VideoInfo);
