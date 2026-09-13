import { ref, onBeforeUnmount } from 'vue';
import { getShow } from '../api/tvmaze.api';
import { isTVMazeShow } from '../api/tvmaze.validators';
import { transformerRawDataTVMazeShow } from '../api/tvmaze.transformer';
import type { Show } from '../shared/types/show.types';

export function useShow() {
  const show = ref<Show | null>(null); // show can be null is getShow() failed
  const loading = ref(false); // show can still be null if loading
  const error = ref<string | null>(null);
  let controller: AbortController | null = null;

  async function fetchShow(
    id: number,
  ) {
    controller?.abort();
    controller = new AbortController();

    loading.value = true;
    error.value = null;
    show.value = null;

    try {
      const response = await getShow(id, controller.signal);

      if (!isTVMazeShow(response)) {
        throw new Error('Invalid show data')
      }

      show.value = transformerRawDataTVMazeShow(response);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      error.value = err instanceof Error ? err.message : 'Unable to get show.';
    } finally {
      if (!controller?.signal.aborted) {
        loading.value = false;
      }
    }
  }

  // now our composable has "ownership" over it's request lifecycle!
  // we want the composable to handle all the logic
  // ShowDetailPage.vue doesn't need to know everything about fetch cancellation, api internals, etc,
  onBeforeUnmount(() => {
    controller?.abort();
  });

  return {
    show,
    loading,
    error,
    fetchShow,
  }
};