import type { RawTVMazeShow } from './tvmaze.types'

export function isTVMazeShow(
  value: unknown,
): value is RawTVMazeShow {
  if (!value || typeof value !== 'object') {
    return false
  }

  const show = value as Record<string, unknown>

  return (
    typeof show.id === 'number' &&
    typeof show.name === 'string'
  )
}