import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { useShowFilters } from '../../src/composables/useShowFilters';

import type { Show } from '../../src/shared/types/show.types';

const shows: Show[] = [
  {
    id: 1,
    title: 'Drama Show',
    genres: ['Drama'],
    rating: 9.2,
    image: {
      medium: null,
      original: null,
    },
    summary: '',
    premiered: null,
    status: 'Ended',
    language: 'English',
    runtime: 60,
    officialSite: null,
  },
  {
    id: 2,
    title: 'Comedy Show',
    genres: ['Comedy'],
    rating: 7.8,
    image: {
      medium: null,
      original: null,
    },
    summary: '',
    premiered: null,
    status: 'Running',
    language: 'English',
    runtime: 30,
    officialSite: null,
  },
  {
    id: 3,
    title: 'Great Comedy',
    genres: ['Comedy'],
    rating: 9.0,
    image: {
      medium: null,
      original: null,
    },
    summary: '',
    premiered: null,
    status: 'Running',
    language: 'English',
    runtime: 30,
    officialSite: null,
  },
];

describe('useShowFilters', () => {
  it('defaults to all shows sorted by rating', () => {
    const showsRef = ref<Show[]>(shows);

    const { selectedGenre, sortBy, visibleShows } = useShowFilters(showsRef);

    expect(selectedGenre.value).toBe('All');
    expect(sortBy.value).toBe('rating-desc');
    expect(visibleShows.value.map(show => show.title)).toEqual([
      'Drama Show',
      'Great Comedy',
      'Comedy Show',
    ]);
  });

  // we are interacting with the composable like the real ui would
  // the ui does: selectedGenre.value = 'Comedy'
  // and composable auto produces: 'Great Comedy', and 'Comedy Show'
  // no component mounting needed (this was always a nightmare in React + Jest)
  it('filters shows by genre', () => {
    const showsRef = ref<Show[]>(shows);

    const { selectedGenre, visibleShows } = useShowFilters(showsRef);

    selectedGenre.value = 'Comedy';

    expect(visibleShows.value.map(show => show.title)).toEqual([
      'Great Comedy',
      'Comedy Show'
    ]);
  });

  // verified sorting modes
  it('sorts shows alphabetically by title', () => {
    const showsRef = ref<Show[]>(shows);

    const { sortBy, visibleShows } = useShowFilters(showsRef);

    sortBy.value = 'title-asc';

    expect(visibleShows.value.map(show => show.title)).toEqual([
      'Comedy Show',
      'Drama Show',
      'Great Comedy',
    ]);
  });

  // our test does not test new Set
  // app exposes a unique sorted genre list
  it('returns unique sorted genres', () => {
    const showsRef = ref<Show[]>(shows);

    const { genres } = useShowFilters(showsRef);

    expect(genres.value).toEqual([
      'Comedy',
      'Drama',
    ]);
    // we could later replace new Set, and with `genres.value` it would not break
  });
});