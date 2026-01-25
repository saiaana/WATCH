'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactPlayer from 'react-player';
import CloseButton from '@/app/components/ui/CloseButton';
import { FULLSCREEN_PLAYER_CONFIG } from '@/constants/videoPlayerConfig';

interface FullscreenVideoModalProps {
  trailerUrl: string;
  title: string;
  onClose: () => void;
}

export default function FullscreenVideoModal({
  trailerUrl,
  title,
  onClose,
}: FullscreenVideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={fullscreenRef}
      className="fixed inset-0 z-[9999] flex animate-fadeIn items-center justify-center bg-black/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative aspect-video w-full max-w-7xl animate-fadeInScale overflow-hidden rounded-xl border border-zinc-800/50 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} className="absolute right-4 top-4 z-50" />

        <ReactPlayer
          url={trailerUrl}
          playing={true}
          muted={false}
          controls={true}
          width="100%"
          height="100%"
          config={FULLSCREEN_PLAYER_CONFIG}
        />

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{title}</h3>
          <p className="text-sm text-neutral-300">Trailer</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
