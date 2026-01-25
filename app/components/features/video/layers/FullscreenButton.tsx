import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { memo } from 'react';

interface FullscreenButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FullscreenButton({ onClick }: FullscreenButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-3 top-3 z-50 rounded-lg border border-white/20 bg-black/70 p-2.5 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:border-purple-500/50 hover:bg-black/90 hover:text-purple-300"
      aria-label="Fullscreen"
    >
      <FullscreenIcon fontSize="small" />
    </button>
  );
}

export default memo(FullscreenButton);
