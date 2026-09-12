import { ref } from 'vue';
import { searchShows } from '../api/tvmaze.api';
import { isTVMazeShow } from '../api/tvmaze.validators';
import { transformerRawDataTVMazeShow } from '../api/tvmaze.transformer';

import type { Show } from '../shared/types/show.types';

export function useShowSearch() {
  let currentController: AbortController | null = null;

  const results = ref<Show[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function search(
    query: string,
  ) {
    // remove spaces from input
    const normalizedQuery = query.trim();

    // no api request on empty search input
    if (!normalizedQuery) {
      // when .abort() is called the api request is stopped
      currentController?.abort();

      results.value = [];
      error.value = null;
      return; // clear search result
    };

    currentController?.abort();

    const controller = new AbortController();
    currentController = controller;

    loading.value = true;
    error.value = null;

    try {
      const response = await searchShows(
        normalizedQuery,
        controller.signal,
      );

      results.value = response
        .filter(result => isTVMazeShow(result.show))
        .map(result => 
          transformerRawDataTVMazeShow(result.show)
        );
    } catch (err) {
      if (
        err instanceof DOMException &&
        err.name === 'AbortError'
      ) {
        return;
      }

      error.value =
        err instanceof Error
          ? err.message
          : 'Search failed.';

      results.value = [];
    } finally {
      // comparison to check if two request are not accidentally getting blocked in finally
      // is this still the active/current request?
      if (currentController === controller) {
        loading.value = false;
      };
    };
  };

  return {
    results,
    loading,
    error,
    search,
  };
};