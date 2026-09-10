import { onMounted, ref } from 'vue'

import { getShows } from '../api/tvmaze.api'
import { isTVMazeShow } from '../api/tvmaze.validators'
import { transformerRawDataTVMazeShow } from '../api/tvmaze.transformer'
import type { Show } from '../shared/types/show.types'

export function useShows() {
  const shows = ref<Show[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchShows() {
    loading.value = true
    error.value = null

    try {
      const response = await getShows()

      shows.value = response
        .filter(isTVMazeShow)
        .map(transformerRawDataTVMazeShow)
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Unable to load shows.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchShows)

  return {
    shows,
    loading,
    error,
    fetchShows,
  }
}