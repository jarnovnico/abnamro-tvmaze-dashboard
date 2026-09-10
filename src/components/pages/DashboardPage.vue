<script setup lang="ts">
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

    <ul v-else>
      <li
        v-for="show in shows.slice(0, 20)"
        :key="show.id"
      >
        {{ show.title }}
      </li>
    </ul>
  </main>
</template>