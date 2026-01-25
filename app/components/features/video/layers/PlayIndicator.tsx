import { memo } from 'react';
import PlayButton from '@/app/components/ui/PlayButton';

function PlayIndicator() {
  return (
    <div className="z-35 pointer-events-none absolute inset-0 flex items-center justify-center">
      <PlayButton size="md" className="bg-black/60" />
    </div>
  );
}

export default memo(PlayIndicator);
