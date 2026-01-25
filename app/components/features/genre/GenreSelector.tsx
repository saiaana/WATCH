'use client';

import { useState, useEffect } from 'react';
import { useGenres } from '@/hooks/utils/useGenres';
import GenreSelectUI from './GenreSelectUI';

interface GenreSelectorProps {
  variant?: 'default' | 'mobile';
}

export default function GenreSelector({ variant = 'default' }: GenreSelectorProps) {
  const { genres, isLoading } = useGenres();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GenreSelectUI genres={[]} isLoading={true} variant={variant} />;
  }

  return <GenreSelectUI genres={genres} isLoading={isLoading} variant={variant} />;
}
