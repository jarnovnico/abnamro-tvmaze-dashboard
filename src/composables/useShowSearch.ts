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
      // cancel any "in flight" requests
      currentController?.abort();

      results.value = [];
      error.value = null;
      return; // clear everything and stop
    };

    // cancel any previous request before starting a new api request
    currentController?.abort();

    // create a new request controller for this search and marks it as the active/current request
    const controller = new AbortController();
    currentController = controller;

    loading.value = true;
    error.value = null; // clear prevouis errors

    try {
      // calls the tvmaze api search endpoint with passing search query and abort signal
      const response = await searchShows(
        normalizedQuery,
        controller.signal,
      );

      // take api reponse a and set it to results state, checks is valid tvmaze object, and transforms raw search result data to usable object
      results.value = response
        .filter(result => isTVMazeShow(result.show))
        .map(result => 
          transformerRawDataTVMazeShow(result.show)
        );
    } catch (err) {
      if (
        // The operation was aborted, you don't want to thrown a error to the user when they abort search
        // we just want to cancel the old request
        err instanceof DOMException &&
        err.name === 'AbortError'
      ) {
        // if request had a err ignore it and close
        return;
      }

      // store a readable error message
      error.value =
        err instanceof Error
          ? err.message
          : 'Search failed.';

      results.value = [];
    } finally {
      // comparison to check if two request are not accidentally getting blocked in finally
      // is this still the active/current request? then turn off loading
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