<script setup lang="ts">
import GenreFilter from '../molecules/GenreFilter.vue';
import SortSelect from '../molecules/SortSelect.vue';
import ShowGrid from '../layouts/ShowGrid.vue';
import { useShows } from '../../composables/useShows';
import { useShowFilters } from '../../composables/useShowFilters.ts';

const {
  shows,
  loading,
  error,
} = useShows();

const {
  selectedGenre,
  sortBy,
  genres,
  visibleShows,
} = useShowFilters(shows);
</script>

<template>
  <main>
    <header>
      <h1>TV Dashboard</h1>
      <SortSelect
        v-model="sortBy"
      />
      <h2>Browse: {{ selectedGenre }}</h2>
    </header>

    <GenreFilter
      :genres="genres"
      v-model:selected-genre="selectedGenre"
    />

    <p v-if="loading">
      Loading shows...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <p
      v-else-if="visibleShows.length === 0"
    >
      No shows found.
    </p>

    <ShowGrid
      v-else
      :shows="visibleShows"
    />
  </main>
</template>

<style scoped>
main {
  width: min(1400px, 100% - 32px);
  margin: 0 auto;
  padding: 48px 0;
}

header {
  margin: 0 0 32px;
}

h1 {
  margin: 0 0 32px;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1;
}

@media (max-width: 640px) {
  main {
    width: min(100% - 20px, 1400px);
    padding: 28px 0;
  }
}
</style>