import { computed, ref, type Ref } from 'vue';

import type { Show } from '../shared/types/show.types';

export type SortOption = 'rating-desc' | 'rating-asc' | 'title-asc' | 'title-desc';

/*
the architecture:
1. shows changes
2. computed notices
3. genres/filteredShows/visibleShows recalculates

we don't have to manually keep genres/filteredShows/visibleShows in sync

Vue recommends that computed values should be treated as read-only snaphots, and fon't mutate them directly.
*/

export function useShowFilters(
  shows: Ref<Show[]>,
) {
  // state user can change
  const selectedGenre = ref('All');
  const sortBy = ref<SortOption>('rating-desc');

  const genres = computed(() => {
    // create big array with all the genres
    const allGenres = shows.value.flatMap(
      show => show.genres,
    );

    // removes duplicates genres and sort if by abc
    return [...new Set(allGenres)].sort();
  });

  const filteredShows = computed(() => {
    if (selectedGenre.value === 'All') {
      return shows.value
    };

    return shows.value.filter(show =>
      show.genres.includes(selectedGenre.value),
    );
  });

  const visibleShows = computed(() => {
    // for visibleShows we don't mutate the computed array we copy it and sort the copy
    return [...filteredShows.value].sort(
      (a, b) => {
      switch (sortBy.value) {
        case 'rating-asc':
          return (a.rating ?? -1) - (b.rating ?? -1);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'rating-desc':
        default:
          return (b.rating ?? -1) - (a.rating ?? -1);
      }
    }
    );
  });

  return {
    selectedGenre,
    sortBy,
    genres,
    filteredShows,
    visibleShows,
  };
}