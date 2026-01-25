import { useState } from 'react';

interface UseVideoPlayerProps {
  isPlaying: boolean;
  trailerUrl: string | null;
  isLoading: boolean;
}

export function useVideoPlayer({ isPlaying, trailerUrl, isLoading }: UseVideoPlayerProps) {
  const [ready, setReady] = useState(false);

  const showPoster = !isPlaying;
  const showLoading = isLoading && isPlaying;
  const showPlayIndicator = showPoster && !isLoading;
  const showFullscreenButton = isPlaying && ready && !!trailerUrl && !isLoading;

  return {
    ready,
    setReady,
    showPoster,
    showLoading,
    showPlayIndicator,
    showFullscreenButton,
  };
}
