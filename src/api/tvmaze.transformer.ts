import type { Show } from '../shared/types/show.types'
import type { RawTVMazeShow } from './tvmaze.types'

const nullableString = (value: unknown): string | null => {
  return typeof value === 'string' ? value : null
}

const nullableNumber = (value: unknown): number | null => {
  return typeof value === 'number' ? value : null
}

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