import ReactPlayer from 'react-player';
import { cn } from '@/lib/utils';
import { VIDEO_PLAYER_CONFIG } from '@/constants/videoPlayerConfig';
import { memo } from 'react';

interface VideoLayerProps {
  trailerUrl: string;
  isPlaying: boolean;
  ready: boolean;
  onReady: () => void;
}

function VideoLayer({ trailerUrl, isPlaying, ready, onReady }: VideoLayerProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-20 transition-opacity duration-500 ease-in-out',
        isPlaying && ready ? 'opacity-100' : 'opacity-0',
      )}
    >
      <ReactPlayer
        key={isPlaying ? 'playing' : 'paused'}
        url={trailerUrl}
        playing={isPlaying}
        muted
        controls={true}
        onReady={onReady}
        width="100%"
        height="100%"
        className="absolute inset-0 rounded-xl"
        config={VIDEO_PLAYER_CONFIG}
      />
    </div>
  );
}

export default memo(VideoLayer);
