import { ReactPlayerProps } from 'react-player';

const BASE_YOUTUBE_CONFIG = {
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
} as const;

export const VIDEO_PLAYER_CONFIG: ReactPlayerProps['config'] = {
  youtube: {
    playerVars: BASE_YOUTUBE_CONFIG,
  },
};

export const FULLSCREEN_PLAYER_CONFIG: ReactPlayerProps['config'] = {
  youtube: {
    playerVars: {
      ...BASE_YOUTUBE_CONFIG,
      fs: 1,
      autoplay: 1,
    },
  },
};
