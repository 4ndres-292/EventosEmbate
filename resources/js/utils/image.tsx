export function resolveImageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('/storage')) {
    return path;
  }
  return `/storage/${path.replace(/^\/+/, '')}`;
}
