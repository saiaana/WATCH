'use client';

import { useGenres } from '@/hooks/utils/useGenres';

export default function GenresInitializer() {
  useGenres();
  return null;
}
