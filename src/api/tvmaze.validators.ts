import type { RawTVMazeShow } from './tvmaze.types';

// we only know that `id` and `name` are present in our Raw Show Data from the api so we make sure it's there
export function isTVMazeShow(
  value: unknown,
): value is RawTVMazeShow {
  if (!value || typeof value !== 'object') {
    return false;
  };

  const show = value as Record<string, unknown>;

  return (
    typeof show.id === 'number' &&
    typeof show.name === 'string'
  );
};