export type PaginationStatus = 'idle' | 'loading' | 'loadingMore' | 'error';

export interface PaginationState<T> {
  items: T[];
  page: number;
  totalPages: number;
  status: PaginationStatus;
  error: Error | null;
}

export type PaginationAction<T> =
  | { type: 'RESET' }
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; items: T[]; totalPages: number }
  | { type: 'LOAD_MORE_START' }
  | {
      type: 'LOAD_MORE_SUCCESS';
      items: T[];
      page: number;
      totalPages: number;
    }
  | { type: 'LOAD_ERROR'; error: Error };

export function paginationReducer<T>(
  state: PaginationState<T>,
  action: PaginationAction<T>,
): PaginationState<T> {
  switch (action.type) {
    case 'RESET':
      return {
        items: [],
        page: 1,
        totalPages: 1,
        status: 'idle',
        error: null,
      };

    case 'LOAD_START':
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case 'LOAD_SUCCESS':
      return {
        items: action.items,
        page: 1,
        totalPages: action.totalPages ?? 1,
        status: 'idle',
        error: null,
      };

    case 'LOAD_MORE_START':
      return {
        ...state,
        status: 'loadingMore',
        error: null,
      };

    case 'LOAD_MORE_SUCCESS':
      const existingIds = new Set(state.items.map((item) => (item as { id: number | string }).id));
      const newItems = action.items.filter(
        (item) => !existingIds.has((item as { id: number | string }).id),
      );

      const updatedTotalPages =
        newItems.length === 0 ? action.page : (action.totalPages ?? state.totalPages);

      return {
        items: [...state.items, ...newItems],
        page: action.page,
        totalPages: updatedTotalPages,
        status: 'idle',
        error: null,
      };

    case 'LOAD_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.error,
      };

    default:
      return state;
  }
}
