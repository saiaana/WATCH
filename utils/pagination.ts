import { PAGE_SIZE } from '@/constants/pagination';

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number = PAGE_SIZE,
): PaginatedResponse<T> {
  const safePage = Math.max(1, Math.floor(page));
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    totalResults: items.length,
  };
}
