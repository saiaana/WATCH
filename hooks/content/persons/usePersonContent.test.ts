import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

vi.mock('@/hooks/utils/useGenres', () => ({
  useGenres: () => ({
    genres: [{ id: 1, name: 'Action' }],
    isLoading: false,
    error: null,
  }),
}));

const mockUsePagination = vi.fn();

vi.mock('@/hooks/ui/usePagination', () => ({
  usePagination: <T>(
    args: Parameters<typeof import('@/hooks/ui/usePagination').usePagination<T>>[0],
  ) => mockUsePagination(args),
}));

vi.mock('@/hooks/utils/useCardItems', () => ({
  useCardItems: (items: MediaContent[]) => items,
}));

vi.mock('@/lib/client/data-service', () => ({
  getContentByActor: vi.fn(),
  getContentByDirector: vi.fn(),
}));

import { getContentByActor, getContentByDirector } from '@/lib/client/data-service';
import { usePersonContent } from './usePersonContent';
import { MediaContent } from '@/types/media';

const paginationState = {
  initialLoading: false,
  loading: false,
  items: [{ id: 1, title: 'Test movie' }],
  totalPages: 2,
  hasMore: true,
  loadMore: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUsePagination.mockReturnValue(paginationState);
});

describe('usePersonContent', () => {
  it('returns empty state when personId is null', () => {
    const fetcher = vi.fn();

    mockUsePagination.mockReturnValueOnce({
      initialLoading: false,
      loading: false,
      items: [],
      totalPages: 0,
      hasMore: false,
      loadMore: vi.fn(),
    });

    const { result } = renderHook(() => usePersonContent(null, 'movie', fetcher));

    expect(result.current.items).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.hasMore).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('passes correct config to usePagination', () => {
    renderHook(() => usePersonContent(123, 'movie', vi.fn()));

    const args = mockUsePagination.mock.calls.at(-1)![0];

    expect(args.enabled).toBe(true);
    expect(args.dependencies).toEqual([123, 'movie']);
    expect(typeof args.fetchPage).toBe('function');
  });

  it('returns items and pagination state', () => {
    const { result } = renderHook(() => usePersonContent(123, 'movie', vi.fn()));

    expect(result.current.items).toEqual(paginationState.items);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.hasMore).toBe(true);
    expect(typeof result.current.loadMore).toBe('function');
  });

  it('fetchPage calls fetcher and maps response', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      items: [{ id: 10, title: 'Fetched' }],
      totalPages: 5,
    });

    renderHook(() => usePersonContent(42, 'tv', fetcher));

    const { fetchPage } = mockUsePagination.mock.calls[0][0];
    const result = await fetchPage(1);

    expect(fetcher).toHaveBeenCalledWith(42, 1, 'tv', undefined);
    expect(result).toEqual({
      items: [{ id: 10, title: 'Fetched' }],
      totalPages: 5,
    });
  });
});

describe('wrappers', () => {
  it('usePersonContent with getContentByActor works correctly', async () => {
    vi.mocked(getContentByActor).mockResolvedValue({
      items: [],
      totalPages: 1,
      page: 1,
    } as Awaited<ReturnType<typeof getContentByActor>>);

    renderHook(() => usePersonContent(1, 'movie', getContentByActor));

    const { fetchPage } = mockUsePagination.mock.calls[0][0];
    await fetchPage(1);

    expect(getContentByActor).toHaveBeenCalledWith(1, 1, 'movie', undefined);
  });

  it('usePersonContent with getContentByDirector works correctly', async () => {
    vi.mocked(getContentByDirector).mockResolvedValue({
      items: [],
      totalPages: 1,
      page: 1,
    } as Awaited<ReturnType<typeof getContentByDirector>>);

    renderHook(() => usePersonContent(2, 'tv', getContentByDirector));

    const { fetchPage } = mockUsePagination.mock.calls[0][0];
    await fetchPage(1);

    expect(getContentByDirector).toHaveBeenCalledWith(2, 1, 'tv', undefined);
  });
});
