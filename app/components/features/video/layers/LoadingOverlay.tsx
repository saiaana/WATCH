import { memo } from 'react';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="md" />
        <p className="text-sm font-medium text-white">Loading trailer...</p>
      </div>
    </div>
  );
}

export default memo(LoadingOverlay);
