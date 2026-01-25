'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavoriteContent } from '@/hooks/favorites/useFavoriteContent';
import { MediaContent } from '@/types/media';

type Props = {
  content: MediaContent;
};

export default function FavoriteButton({ content }: Props) {
  const { isFavorite, toggleFavorite, isAuthenticated } = useFavoriteContent(content);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        'favorite-button-base group',
        isFavorite ? 'favorite-button-active' : 'favorite-button-inactive',
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FavoriteIcon
          className="text-2xl text-white transition-all duration-300"
          sx={{ fontSize: 18 }}
        />
      ) : (
        <FavoriteBorderIcon
          className="favorite-icon group-hover:text-pink-400"
          sx={{ fontSize: 18 }}
        />
      )}

      {isFavorite && (
        <span className="absolute inset-0 animate-ping rounded-full bg-pink-500/30 opacity-75"></span>
      )}
    </button>
  );
}
