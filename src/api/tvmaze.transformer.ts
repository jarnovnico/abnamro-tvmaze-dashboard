import type { Show } from '../shared/types/show.types'
import type { RawTVMazeShow } from './tvmaze.types'

// makes sure it returns a string
const nullableString = (value: unknown): string | null => {
  return typeof value === 'string' ? value : null
}

// makes sure it returns a number
const nullableNumber = (value: unknown): number | null => {
  return typeof value === 'number' ? value : null
}


// transforms the Raw API TVMaze Show data into a object we can use in our Apps View/Components
export function transformerRawDataTVMazeShow(source: RawTVMazeShow): Show {
  const genres = Array.isArray(source.genres)
    ? source.genres.filter(
        (genre): genre is string =>
          typeof genre === 'string',
      )
    : []

  const rating =
    source.rating &&
    typeof source.rating.average === 'number'
      ? source.rating.average
      : null

  const image =
    source.image &&
    typeof source.image === 'object'
      ? source.image
      : null

  return {
    id: source.id,
    title: source.name,
    genres,
    rating,

    image: {
      medium:
        image && typeof image.medium === 'string'
          ? image.medium
          : null,

      original:
        image && typeof image.original === 'string'
          ? image.original
          : null,
    },

    summary: nullableString(source.summary) ?? '',
    premiered: nullableString(source.premiered),
    status: nullableString(source.status),
    language: nullableString(source.language),
    runtime: nullableNumber(source.runtime),
    officialSite: nullableString(source.officialSite),
  }
}