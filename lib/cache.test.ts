import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PersistentCache } from './cache';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('PersistentCache', () => {
  let cache: PersistentCache;

  beforeEach(() => {
    vi.clearAllMocks();
    cache = new PersistentCache();
    vi.useFakeTimers();
  });

  it('stores and retrieves data from memory', () => {
    cache.set('key', { id: 1 });

    expect(cache.get('key')).toEqual({ id: 1 });
  });

  it('stores data in localStorage', () => {
    cache.set('key', { id: 1 });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('returns null when data is expired', () => {
    cache.set('key', { id: 1 }, 1000);

    vi.advanceTimersByTime(2000);

    expect(cache.get('key')).toBe(null);
  });

  it('loads data from localStorage when not in memory', () => {
    const entry = {
      data: { id: 2 },
      timestamp: Date.now(),
      ttl: 5000,
    };

    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(entry));

    expect(cache.get('key')).toEqual({ id: 2 });
  });

  it('has returns true for valid entry', () => {
    cache.set('key', { id: 1 });

    expect(cache.has('key')).toBe(true);
  });

  it('delete removes data', () => {
    cache.set('key', { id: 1 });
    cache.delete('key');

    expect(cache.get('key')).toBe(null);
  });

  it('clear removes all entries', () => {
    cache.set('a', 1);
    cache.set('b', 2);

    cache.clear();

    expect(cache.get('a')).toBe(null);
    expect(cache.get('b')).toBe(null);
  });

  it('respects custom TTL', () => {
    cache.set('key', { id: 1 }, 3000);

    vi.advanceTimersByTime(2000);
    expect(cache.get('key')).toEqual({ id: 1 });

    vi.advanceTimersByTime(2000);
    expect(cache.get('key')).toBe(null);
  });
});
