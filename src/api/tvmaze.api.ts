import { apiFetch } from './client'
import type {
  TVMazeSearchResult,
  RawTVMazeShow,
} from './tvmaze.types'

const BASE_URL = 'https://api.tvmaze.com'

export async function getShows(
  signal?: AbortSignal,
): Promise<RawTVMazeShow[]> {
  return apiFetch<RawTVMazeShow[]>(
    `${BASE_URL}/shows`,
    { signal },
  )
}

export async function getShow(
  id: number,
  signal?: AbortSignal,
): Promise<RawTVMazeShow> {
  return apiFetch<RawTVMazeShow>(
    `${BASE_URL}/shows/${id}`,
    { signal },
  )
}

export async function searchShows(
  query: string,
  signal?: AbortSignal,
): Promise<TVMazeSearchResult[]> {
  return apiFetch<TVMazeSearchResult[]>(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
    { signal },
  )
}