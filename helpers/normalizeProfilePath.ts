export function normalizeProfilePath(path: string | null): string | null {
  if (!path) return null;

  if (path.startsWith('/')) return path.slice(1);

  return path;
}
