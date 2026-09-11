<script setup lang="ts">
import ShowGrid from '../layouts/ShowGrid.vue';
import { useShows } from '../../composables/useShows'

const {
  shows,
  loading,
  error,
} = useShows()
</script>

<template>
  <main>
    <h1>TV Dashboard</h1>

    <p v-if="loading">
      Loading shows...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <ShowGrid
      v-else
      :shows="shows.slice(0, 20)"
    />
  </main>
</template>