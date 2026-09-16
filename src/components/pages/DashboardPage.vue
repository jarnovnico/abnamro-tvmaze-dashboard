<script setup lang="ts">
import GenreFilter from '../molecules/GenreFilter.vue';
import SortSelect from '../molecules/SortSelect.vue';
import ShowGrid from '../layouts/ShowGrid.vue';
import SearchBar from '../molecules/SearchBar.vue';
import ContentWrapper from '../layouts/ContentWrapper.vue';
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

const {
  searchQuery,
  results: searchResults,
  loading: searchLoading,
  error: searchError,
  isSearching,
} = useShowSearch();
// All logic should be seperated from our pages/views!
</script>

<template>
  <div class="dashboard-page">
    <ContentWrapper>
      <header>
        <h1>TV Dashboard</h1>
        <SearchBar v-model="searchQuery" />
      </header>

      <template v-if="isSearching">
        <p v-if="searchLoading">Searching...</p>
        <p v-else-if="searchError">{{ searchError }}</p>
        <p v-else-if="searchResults.length === 0">No shows found.</p>

        <ShowGrid
          v-else
          :shows="searchResults"
        />
      </template>

      <template v-else>
        <div class="dashboard-controls">
          <!-- 
            v-model:selected-genre is short for prop: selectedGenre and event: update:selectedGenre
            1. a prop going down to the child | 2. an event coming back up to the parent
            parent state -> child prop -> child emit -> parent updates state -> child gets new prop 
          -->
          <div class="dashboard-controls__title-wrapper">
            <span>Browse: </span>
            <h3 class="dashboard-controls__title">{{ selectedGenre }}</h3>
          </div>
          <GenreFilter
            :genres="genres"
            v-model:selected-genre="
              selectedGenre
            "
          />
          <SortSelect
            v-model="sortBy"
          />
        </div>

        <p v-if="loading">Loading shows...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="visibleShows.length === 0">No shows found.</p>

        <ShowGrid
          v-else
          :shows="visibleShows"
        />
      </template>
    </ContentWrapper>
  </div>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: var(--gadient-primary);
  padding: 0 16px;
}
.dashboard-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.dashboard-controls__title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
}
.dashboard-controls__title {
  margin: 0;
}
</style>