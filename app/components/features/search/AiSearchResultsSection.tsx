'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/store';
import { selectGenres } from '@/store/selectors';
import { useCardItems } from '@/hooks/utils/useCardItems';
import SearchModalScrollContainer from './SearchModalScrollContainer';
import SearchModalResultsSection from './SearchModalResultsSection';
import SearchModalTabs from './SearchModalTabs';
import SearchModalState from './SearchModalState';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { SearchTabType } from './types';

interface AiSearchResultsSectionProps {
  prompt: string;
  onClose: () => void;
}

function AiSearchResultsSection({ prompt, onClose }: AiSearchResultsSectionProps) {
  const genres = useAppSelector(selectGenres);
  const [activeTab, setActiveTab] = useState<SearchTabType>('movies');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем рекомендации только когда prompt изменяется (после нажатия кнопки или Enter)
  useEffect(() => {
    if (!prompt.trim()) {
      setMovies([]);
      setTvShows([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.movies || []);
        setTvShows(data.tvShows || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
        setMovies([]);
        setTvShows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [prompt]);


  // Преобразуем данные в CardItem
  const movieItems = useCardItems(movies, genres, 'movie');
  const tvShowItems = useCardItems(tvShows, genres, 'tv');

  // Определяем доступные табы
  const availableTabs = useMemo<SearchTabType[]>(() => {
    const tabs: SearchTabType[] = [];
    if (movieItems.length > 0) tabs.push('movies');
    if (tvShowItems.length > 0) tabs.push('tv');
    return tabs.length > 0 ? tabs : (['movies', 'tv'] as SearchTabType[]);
  }, [movieItems.length, tvShowItems.length]);

  // Автоматически переключаемся на первый доступный таб
  useMemo(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  const handleTabChange = useCallback((tab: SearchTabType) => {
    setActiveTab(tab);
  }, []);

  // Определяем текущие элементы и тип контента
  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return movieItems;
      case 'tv':
        return tvShowItems;
      default:
        return [];
    }
  }, [activeTab, movieItems, tvShowItems]);

  const currentContentType = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return 'movie' as const;
      case 'tv':
        return 'tv' as const;
      default:
        return 'movie' as const;
    }
  }, [activeTab]);

  const hasResults = movieItems.length > 0 || tvShowItems.length > 0;
  const showTabs = hasResults && availableTabs.length > 1;
  const hasSearched = prompt.trim().length > 0;

  return (
    <div className="flex h-full flex-col">
      {showTabs && (
        <SearchModalTabs
          activeTab={activeTab}
          availableTabs={availableTabs}
          onTabChange={handleTabChange}
        />
      )}

      <SearchModalScrollContainer activeTab={activeTab}>
        {isLoading ? (
          <SearchModalState type="loading" />
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="mb-2 text-red-400">Error loading recommendations</p>
            <p className="text-sm text-neutral-400">{error}</p>
          </div>
        ) : !hasSearched ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <p className="px-4 text-center text-sm text-neutral-400 sm:text-base md:text-xl">
              Describe what you&apos;re looking for and get AI-powered recommendations...
            </p>
          </div>
        ) : !hasResults ? (
          <SearchModalState type="noResults" query={prompt} />
        ) : (
          <SearchModalResultsSection
            items={currentItems}
            title={activeTab === 'movies' ? 'Movies' : 'TV Shows'}
            contentType={currentContentType}
            onClose={onClose}
          />
        )}
      </SearchModalScrollContainer>
    </div>
  );
}

export default AiSearchResultsSection;
