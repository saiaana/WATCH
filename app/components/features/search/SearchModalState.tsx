import { memo } from 'react';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

type SearchModalStateType = 'loading' | 'empty' | 'noResults';

interface SearchModalStateProps {
  type: SearchModalStateType;
  query?: string;
}

function SearchModalState({ type, query }: SearchModalStateProps) {
  if (type === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="sm" />
          <p className="text-sm text-white">Searching...</p>
        </div>
      </div>
    );
  }

  if (type === 'empty') {
    return (
      <div className="flex items-center justify-center py-12 sm:py-20">
        <p className="px-4 text-center text-sm text-neutral-400 sm:text-base md:text-xl">
          Start typing to search for movies, TV shows, actors, or directors...
        </p>
      </div>
    );
  }

  if (type === 'noResults' && query) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-center text-xl text-neutral-400">
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return null;
}

export default memo(SearchModalState);
