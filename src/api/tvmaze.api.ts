import { apiFetch } from './client'
import type {
  TVMazeSearchResult,
  RawTVMazeShow,
} from './tvmaze.types'

const BASE_URL = 'https://api.tvmaze.com'

// fetch the shows list, but allow the caller to cancel it if needed.
export async function getShows(
  signal?: AbortSignal,
): Promise<RawTVMazeShow[]> {
  return apiFetch<RawTVMazeShow[]>(
    `${BASE_URL}/shows`,
    { signal },
  )
}

// fetch a single show based on a number (id), but allow the caller to cancel it if needed.
export async function getShow(
  id: number,
  signal?: AbortSignal,
): Promise<RawTVMazeShow> {
  return apiFetch<RawTVMazeShow>(
    `${BASE_URL}/shows/${id}`,
    { signal },
  )
}

// fetch shows based on a string query, but allow the caller to cancel it if needed.
export async function searchShows(
  query: string,
  signal?: AbortSignal,
): Promise<TVMazeSearchResult[]> {
  return apiFetch<TVMazeSearchResult[]>(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
    { signal },
  )
}

/* 
why use 'signal?: AbortSignal'?
- the user navigates away before the request finishes
- the user starts a new search, so the old request should stop
- a component unmounts in a UI app
- you want to avoid wasting time, bandwidth, or updating stale data
*/