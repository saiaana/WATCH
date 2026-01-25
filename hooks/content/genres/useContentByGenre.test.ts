import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useContentByGenre } from './useContentByGenre';
import { usePaginatedContent } from '../pagination/usePaginatedContent';
import { getContentByGenre } from '@/lib/client/data-service';
import type { Movie } from '@/types/movieTypes';

vi.mock('../pagination/usePaginatedContent', () => ({
  usePaginatedContent: vi.fn(),
}));

vi.mock('@/lib/client/data-service', () => ({
  getContentByGenre: vi.fn(),
}));

describe('useContentByGenre', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configures usePaginatedContent correctly and returns its result (happy path)', () => {
    const genreId = 1;
    const contentType = 'movie';

    const paginatedResultMock = {
      items: [],
      loading: false,
      initialLoading: false,
      hasMore: false,
      loadMore: vi.fn(),
      loadMoreRef: vi.fn(),
    };

    vi.mocked(usePaginatedContent).mockReturnValue(paginatedResultMock);

    const { result } = renderHook(() => useContentByGenre(genreId, contentType));

    expect(usePaginatedContent).toHaveBeenCalledTimes(1);

    expect(usePaginatedContent).toHaveBeenCalledWith(
      expect.objectContaining({
        contentType: 'movie',
        dependencies: [genreId],
        enabled: true,
        fetchPage: expect.any(Function),
      }),
    );

    expect(result.current).toBe(paginatedResultMock);
  });

  it('passes enabled = false when genreId is 0', () => {
    const genreId = 0;
    const contentType = 'tv';

    vi.mocked(usePaginatedContent).mockReturnValue({
      items: [],
      loading: false,
      initialLoading: false,
      hasMore: false,
      loadMore: vi.fn(),
      loadMoreRef: vi.fn(),
    });

    renderHook(() => useContentByGenre(genreId, contentType));

    expect(usePaginatedContent).toHaveBeenCalledWith(
      expect.objectContaining({
        contentType: 'tv',
        dependencies: [0],
        enabled: false,
      }),
    );
  });

  it('fetchPage calls getContentByGenre with correct arguments and maps response', async () => {
    const genreId = 5;
    const contentType = 'movie';

    vi.mocked(usePaginatedContent).mockImplementation((config) => {
      return {
        items: [],
        loading: false,
        initialLoading: false,
        hasMore: false,
        loadMore: vi.fn(),
        loadMoreRef: vi.fn(),
        __config: config,
      };
    });

    const apiResponseMock = {
      content: [{ id: 10, title: 'Movie' } as Movie],
      totalPages: 3,
      totalResults: 30,
    };

    vi.mocked(getContentByGenre).mockResolvedValue(apiResponseMock);

    renderHook(() => useContentByGenre(genreId, contentType));

    const config = vi.mocked(usePaginatedContent).mock.calls[0][0];
    const fetchPage = config.fetchPage;

    const result = await fetchPage(2, undefined);

    expect(getContentByGenre).toHaveBeenCalledWith(contentType, [genreId], 2, undefined);

    expect(result).toEqual({
      items: apiResponseMock.content,
      totalPages: 3,
    });
  });

  it('fetchPage returns fallback values when API response is empty', async () => {
    const genreId = 7;
    const contentType = 'tv';

    vi.mocked(usePaginatedContent).mockImplementation((config) => {
      return {
        items: [],
        loading: false,
        initialLoading: false,
        hasMore: false,
        loadMore: vi.fn(),
        loadMoreRef: vi.fn(),
        __config: config,
      };
    });

    vi.mocked(getContentByGenre).mockResolvedValue({
      content: [],
      totalPages: 1,
      totalResults: 0,
    });

    renderHook(() => useContentByGenre(genreId, contentType));

    const config = vi.mocked(usePaginatedContent).mock.calls[0][0];
    const fetchPage = config.fetchPage;

    const result = await fetchPage(1, undefined);

    expect(result).toEqual({
      items: [],
      totalPages: 1,
    });
  });
});
