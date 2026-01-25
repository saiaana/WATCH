'use client';

import React, { memo, useState } from 'react';

import { MediaContent } from '@/types/media';
import { getContentTitle } from '@/utils/contentInfoUtils';
import { useTrailer } from '@/hooks/video/useTrailer';
import { useVideoPlayer } from '@/hooks/video/useVideoPlayer';
import { useFullscreen } from '@/hooks/video/useFullscreen';
import PosterLayer from './layers/PosterLayer';
import VideoLayer from './layers/VideoLayer';
import VideoInfo from './VideoInfo';
import LoadingOverlay from './layers/LoadingOverlay';
import PlayIndicator from './layers/PlayIndicator';
import FullscreenButton from './layers/FullscreenButton';
import FullscreenVideoModal from './layers/FullscreenVideoModal';

function VideoWidget({ content }: { content: MediaContent }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const title = getContentTitle(content);
  const { trailerUrl, isLoading } = useTrailer(title, isPlaying);
  const { ready, setReady, showPoster, showLoading, showPlayIndicator, showFullscreenButton } =
    useVideoPlayer({
      isPlaying,
      trailerUrl,
      isLoading,
    });
  const { isFullscreen, open, close } = useFullscreen();

  const handleFullscreenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFullscreen) {
      close();
    } else if (trailerUrl) {
      open();
    }
  };

  return (
    <div
      className="card-hover aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div className="video-container-base">
        <PosterLayer content={content} visible={showPoster} />
        {trailerUrl && (
          <VideoLayer
            trailerUrl={trailerUrl}
            isPlaying={isPlaying}
            ready={ready}
            onReady={() => setReady(true)}
          />
        )}
        <VideoInfo content={content} isPlaying={isPlaying}/>
        {showLoading && <LoadingOverlay />}
        {showPlayIndicator && <PlayIndicator />}
        {showFullscreenButton && <FullscreenButton onClick={handleFullscreenClick} />}
      </div>
      {isFullscreen && trailerUrl && (
        <FullscreenVideoModal trailerUrl={trailerUrl} title={title} onClose={close} />
      )}
    </div>
  );
}

export default memo(VideoWidget);
