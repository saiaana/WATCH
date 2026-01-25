interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class PersistentCache {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default
  private readonly STORAGE_PREFIX = 'cache_';
  private readonly MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB max per entry

  private getStorageKey(key: string): string {
    return `${this.STORAGE_PREFIX}${key}`;
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };

    // Always store in memory for fast access
    this.memoryCache.set(key, entry);

    // Store in localStorage for persistence (only for smaller data)
    if (typeof window !== 'undefined') {
      try {
        const serialized = JSON.stringify(entry);
        const size = new Blob([serialized]).size;

        // Only store if size is reasonable (less than 4MB)
        if (size < this.MAX_STORAGE_SIZE) {
          localStorage.setItem(this.getStorageKey(key), serialized);
        } else {
          // If too large, remove from localStorage but keep in memory
          localStorage.removeItem(this.getStorageKey(key));
        }
      } catch (error) {
        // Handle quota exceeded or other storage errors
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old cache entries');
          this.clearExpiredFromStorage();
          // Try once more with smaller data
          try {
            const serialized = JSON.stringify(entry);
            if (new Blob([serialized]).size < this.MAX_STORAGE_SIZE) {
              localStorage.setItem(this.getStorageKey(key), serialized);
            }
          } catch {
            // If still fails, just use memory cache
          }
        } else {
          console.warn('Failed to save to localStorage:', error);
        }
      }
    }
  }

  get<T>(key: string): T | null {
    // First check memory cache (fastest)
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      return memoryEntry.data as T;
    }

    // If expired or not in memory, remove from memory
    if (memoryEntry) {
      this.memoryCache.delete(key);
    }

    // Check localStorage (for persistence across page reloads)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.getStorageKey(key));
        if (stored) {
          const entry: CacheEntry<T> = JSON.parse(stored);

          // Check if expired
          if (this.isExpired(entry)) {
            localStorage.removeItem(this.getStorageKey(key));
            return null;
          }

          // Restore to memory cache for faster future access
          this.memoryCache.set(key, entry);
          return entry.data as T;
        }
      } catch (error) {
        console.warn('Failed to read from localStorage:', error);
        // Remove corrupted entry
        localStorage.removeItem(this.getStorageKey(key));
      }
    }

    return null;
  }

  has(key: string): boolean {
    // Check memory first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      return true;
    }

    // Check localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.getStorageKey(key));
        if (stored) {
          const entry: CacheEntry<unknown> = JSON.parse(stored);
          if (this.isExpired(entry)) {
            localStorage.removeItem(this.getStorageKey(key));
            return false;
          }
          // Restore to memory
          this.memoryCache.set(key, entry);
          return true;
        }
      } catch {
        // If corrupted, remove it
        localStorage.removeItem(this.getStorageKey(key));
      }
    }

    return false;
  }

  clear(): void {
    this.memoryCache.clear();
    if (typeof window !== 'undefined') {
      try {
        // Clear all cache entries from localStorage
        const keys = Object.keys(localStorage);
        keys
          .filter((key) => key.startsWith(this.STORAGE_PREFIX))
          .forEach((key) => localStorage.removeItem(key));
      } catch (error) {
        console.warn('Failed to clear localStorage:', error);
      }
    }
  }

  delete(key: string): void {
    this.memoryCache.delete(key);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.getStorageKey(key));
      } catch (error) {
        console.warn('Failed to delete from localStorage:', error);
      }
    }
  }

  private clearExpiredFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      let cleared = 0;

      keys
        .filter((key) => key.startsWith(this.STORAGE_PREFIX))
        .forEach((key) => {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const entry: CacheEntry<unknown> = JSON.parse(stored);
              if (this.isExpired(entry)) {
                localStorage.removeItem(key);
                cleared++;
              }
            }
          } catch {
            // Remove corrupted entries
            localStorage.removeItem(key);
            cleared++;
          }
        });

      if (cleared > 0) {
        console.log(`Cleared ${cleared} expired cache entries from localStorage`);
      }
    } catch (error) {
      console.warn('Failed to clear expired entries:', error);
    }
  }

  init(): void {
    if (typeof window !== 'undefined') {
      this.clearExpiredFromStorage();
    }
  }
}

// Export a singleton instance
export const cache = new PersistentCache();

// Export class for testing
export { PersistentCache };

// Initialize cache on module load (clean up expired entries)
if (typeof window !== 'undefined') {
  cache.init();
}
