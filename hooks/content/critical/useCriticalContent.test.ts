import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCriticalContent } from './useCriticalContent';
import { useGenres } from '@/hooks/utils/useGenres';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
    },
  },
}));

vi.mock('@/hooks/utils/useGenres', () => ({
  useGenres: vi.fn(),
}));

const getCachedMock = vi.fn();

vi.mock('@/hooks/utils/useCachedData', () => ({
  useCachedData: () => ({
    getCached: getCachedMock,
    hasCached: vi.fn(),
    load: vi.fn(),
    clearCache: vi.fn(),
  }),
  useCacheSync: vi.fn(),
}));

const dispatchMock = vi.fn();

interface MockState {
  items: unknown[];
  loading: boolean;
  error: string | null;
}

let mockState: MockState;

vi.mock('@/store', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: <T>(selector: (state: MockState) => T): T => selector(mockState),
}));

describe('useCriticalContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockState = {
      items: [],
      loading: false,
      error: null,
    };

    vi.mocked(useGenres).mockReturnValue({
      genres: [],
      isLoading: false,
      error: null,
    });
  });

  it('dispatches fetchAction when cache is empty', () => {
    getCachedMock.mockReturnValue(null);

    const action = { type: 'FETCH_POPULAR' };
    const fetchActionMock = vi.fn(() => action);
    const setActionMock = vi.fn();

    renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: fetchActionMock,
        setAction: setActionMock,
        cacheKey: 'test',
      }),
    );

    expect(fetchActionMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(action);
    expect(setActionMock).not.toHaveBeenCalled();
  });

  it('uses cached data and dispatches setAction', () => {
    const cachedItems = [{ id: 1, title: 'Movie' }];
    getCachedMock.mockReturnValue(cachedItems);

    const action = {
      type: 'SET_POPULAR',
      payload: { category: 'popular', items: cachedItems },
    };

    const fetchActionMock = vi.fn();
    const setActionMock = vi.fn(() => action);

    renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: fetchActionMock,
        setAction: setActionMock,
        cacheKey: 'test',
      }),
    );

    expect(fetchActionMock).not.toHaveBeenCalled();
    expect(setActionMock).toHaveBeenCalledWith({
      category: 'popular',
      items: cachedItems,
    });
    expect(dispatchMock).toHaveBeenCalledWith(action);
  });

  it('does nothing if items already exist', () => {
    mockState.items = [{ id: 1 }];

    const fetchActionMock = vi.fn();
    const setActionMock = vi.fn();

    renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: fetchActionMock,
        setAction: setActionMock,
        cacheKey: 'test',
      }),
    );

    expect(fetchActionMock).not.toHaveBeenCalled();
    expect(setActionMock).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('returns isLoading=true when items are loading', () => {
    mockState.loading = true;

    const { result } = renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: vi.fn(),
        setAction: vi.fn(),
        cacheKey: 'test',
      }),
    );

    expect(result.current.isLoading).toBe(true);
  });

  it('returns isLoading=true when genres are loading', () => {
    vi.mocked(useGenres).mockReturnValue({
      genres: [],
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: vi.fn(),
        setAction: vi.fn(),
        cacheKey: 'test',
      }),
    );

    expect(result.current.isLoading).toBe(true);
  });

  it('returns error if items error exists', () => {
    mockState.error = 'Something went wrong';

    const { result } = renderHook(() =>
      useCriticalContent({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectItems: (s: any) => (s as MockState).items,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectLoading: (s: any) => (s as MockState).loading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectError: (s: any) => (s as MockState).error,
        fetchAction: vi.fn(),
        setAction: vi.fn(),
        cacheKey: 'test',
      }),
    );

    expect(result.current.error).toBe('Something went wrong');
  });
});
