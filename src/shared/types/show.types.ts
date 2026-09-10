export interface ShowImage {
  medium: string | null
  original: string | null
}

export interface Show {
  id: number
  title: string
  genres: string[]
  rating: number | null
  image: ShowImage
  summary: string
  premiered: string | null
  status: string | null
  language: string | null
  runtime: number | null
  officialSite: string | null
}