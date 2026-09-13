import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { searchShows } from '../api/tvmaze.api';
import { isTVMazeShow } from '../api/tvmaze.validators';

import { transformerRawDataTVMazeShow } from '../api/tvmaze.transformer';

import type { Show } from '../shared/types/show.types';

// 300ms is long enough to avoid a request for every keystroke, and short enough to feel responsive
const DEBOUNCE_MS = 300;

export function useShowSearch() {
  const searchQuery = ref('');
  const results = ref<Show[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let controller:
    AbortController | null = null;

  let searchTimeout: ReturnType<typeof setTimeout> | undefined;

  // is the user searcihng yet?
  // 1.searchQuery -> 2. computed -> 3. isSearching
  const isSearching = computed(
    () => searchQuery.value.trim().length > 0,
  );

  async function executeSearch(
    value: string,
  ) {
    // remove spaces from input
    const normalizedQuery = value.trim();

    // no api request on empty search input
    if (!normalizedQuery) {
      results.value = []
      error.value = null
      loading.value = false

      return; // clear everything and stop
    };

    // cancel any previous request before starting a new api request
    controller?.abort();

    // create a new request controller for this search
    controller = new AbortController();

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
      };

      // store a readable error message
      error.value =
        err instanceof Error
          ? err.message
          : 'Search failed.';

      results.value = [];
    } finally {
      // turn off loading
      loading.value = false;
    };
  };

  // perform side effect when state changes
  // watch() -> react with a side effect
  watch(
    searchQuery,
    value => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      };

      searchTimeout = setTimeout(
        () => {
          executeSearch(value)
        },
        DEBOUNCE_MS,
      );
    }
  );

  // when the user leaves the dashboard we want to "detroy" it
  // no more timer still running and api requests
  onBeforeUnmount(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    };

    controller?.abort();
  });

  return {
    searchQuery,
    results,
    loading,
    error,
    isSearching,
  };
};