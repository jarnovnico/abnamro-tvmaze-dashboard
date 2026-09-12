<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import GenreFilter from '../molecules/GenreFilter.vue';
import SortSelect from '../molecules/SortSelect.vue';
import ShowGrid from '../layouts/ShowGrid.vue';
import SearchBar from '../molecules/SearchBar.vue';
import { useShows } from '../../composables/useShows';
import { useShowFilters } from '../../composables/useShowFilters.ts';
import { useShowSearch } from '../../composables/useShowSearch.ts';

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
// Important Vue learning:
// Current data flow: 1. useShows() -> 2. shows -> 3. useShowFilters(shows) -> 3.1. genres || 3.2. visibleShows
// Composables can consume reactive state from other composables!
// this is a really nice benefit of using the Composition api. it can scale very well as our app becomes more complex!

const searchQuery = ref('')

const {
  results: searchResults,
  loading: searchLoading,
  error: searchError,
  search,
} = useShowSearch();

// perform side effect when state changes
// watch() -> react with a side effect
let searchTimeout: ReturnType<typeof setTimeout> | undefined;

watch(
  searchQuery,
  value => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    };

    // 300ms is long enough to avoid a request for every keystroke, and short enough to feel responsive
    searchTimeout = setTimeout(
      () => {
        search(value)
      },
      300
    );
  }
);

// is the user searcihng yet?
// 1.searchQuery -> 2. computed -> 3. isSearching
const isSearching = computed(
  () => searchQuery.value.trim().length > 0,
)
</script>

<template>
  <main>
    <header>
      <h1>TV Dashboard</h1>
      <SortSelect
        v-model="sortBy"
      />
      <h2>Browse: {{ selectedGenre }}</h2>
      <SearchBar
        v-model="searchQuery"
      />
    </header>

    <!-- 
    v-model:selected-genre is short for prop: selectedGenre and event: update:selectedGenre
    1. a prop going down to the child | 2. an event coming back up to the parent
    parent state -> child prop -> child emit -> parent updates state -> child gets new prop 
    -->
    <GenreFilter
      :genres="genres"
      v-model:selected-genre="selectedGenre"
    />

    <!-- 
    TV Dashboard has two modes: 
    1. "normal (not searching)" -> genre + rating
    2. and isSearching -> TVMaze result
    But are not "connected". So if you select genre and then search. You cant search within genre
    -->
    <section v-if="isSearching">
      <p v-if="searchLoading">
        Searching...
      </p>

      <p v-else-if="searchError">
        {{ searchError }}
      </p>

      <p v-else-if="searchResults.length === 0">
        No shows found.
      </p>

      <ShowGrid
        v-else
        :shows="searchResults"
      />
    </section>

    <section v-else>
      <p v-if="loading">
        Loading shows...
      </p>

      <p v-else-if="error">
        {{ error }}
      </p>

      <p v-else-if="visibleShows.length === 0">
        No shows found.
      </p>

      <ShowGrid
        v-else
        :shows="visibleShows"
      />
    </section>
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