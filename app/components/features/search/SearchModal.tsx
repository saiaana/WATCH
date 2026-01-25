'use client';

import { memo, useEffect, useRef } from 'react';
import { useSearchQuery } from '@/hooks/search/useSearchQuery';
import SearchModalHeader from './SearchModalHeader';
import SearchModalResults from './SearchModalResults';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const searchQuery = useSearchQuery(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const { query, setQuery, ...rest } = searchQuery;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <SearchModalHeader
          query={query}
          setQuery={setQuery}
          handleKeyDown={handleKeyDown}
          onClose={onClose}
          inputRef={inputRef}
        />

        <SearchModalResults
          loadingState={{
            loading: rest.loading,
            loadingMoreMovies: rest.loadingMoreMovies,
            loadingMoreTv: rest.loadingMoreTv,
            loadingMoreActors: rest.loadingMoreActors,
          }}
          results={{
            movieItems: rest.movieItems,
            tvItems: rest.tvItems,
            people: rest.people,
          }}
          paginationState={{
            hasMoreMovies: rest.hasMoreMovies,
            hasMoreTv: rest.hasMoreTv,
            hasMoreActors: rest.hasMoreActors,
            loadMoreMovies: rest.loadMoreMovies,
            loadMoreTv: rest.loadMoreTv,
            loadMoreActors: rest.loadMoreActors,
          }}
          hasSearched={rest.hasSearched}
          query={query}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default memo(SearchModal);
