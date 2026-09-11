// I don't trust external API data... yet...”
export interface RawTVMazeShow {
  id: number
  name: string

  genres?: unknown

  rating?: {
    average?: unknown
  } | null

  image?: {
    medium?: unknown
    original?: unknown
  } | null

  summary?: unknown
  premiered?: unknown
  status?: unknown
  language?: unknown
  runtime?: unknown
  officialSite?: unknown
}

export interface TVMazeSearchResult {
  score: number
  show: RawTVMazeShow
}