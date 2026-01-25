'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/app/components/ui/SectionHeader';
import CloseButton from '@/app/components/ui/CloseButton';
import PlayButton from '@/app/components/ui/PlayButton';
import GradientOverlay from '@/app/components/ui/GradientOverlay';
import EmptyState from '@/app/components/ui/EmptyState';

interface TrailerPlayerProps {
  videoId: string;
}

export default function TrailerPlayer({ videoId }: TrailerPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return videoId ? (
    <div className="mt-6 sm:mt-8">
      <SectionHeader title="Watch Trailer" variant="default" />
      <div onClick={() => setIsOpen(true)} className="trailer-container group">
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Trailer preview"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <GradientOverlay variant="full" />
        <div className="trailer-overlay group-hover:bg-black/30">
          <PlayButton />
        </div>
        <div className="absolute bottom-3 left-3 text-white sm:bottom-4 sm:left-4">
          <p className="hidden text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block sm:text-sm">
            Click to play trailer
          </p>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative mx-2 aspect-video w-full max-w-screen-xl overflow-hidden rounded-lg border border-zinc-800/50 shadow-2xl sm:mx-4 sm:rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <CloseButton
                className="absolute right-2 top-2 sm:right-4 sm:top-4"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <EmptyState
      icon="🎬"
      title="Trailer not available"
      className="mb-6 aspect-video w-full rounded-xl border border-zinc-800/50 bg-zinc-800/50"
    />
  );
}
