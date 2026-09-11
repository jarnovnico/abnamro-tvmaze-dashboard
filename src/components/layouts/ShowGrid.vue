<script setup lang="ts">
import type { Show } from '../../shared/types/show.types.ts'
import ShowCard from '../molecules/ShowCard.vue'

defineProps<{
  shows: Show[]
}>()
</script>

<template>
  <section class="show-grid">
    <ShowCard
      v-for="show in shows"
      :key="show.id"
      :show="show"
    />
  </section>
</template>

<style scoped>
.show-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(224px, 1fr));
}

@media (max-width: 640px) {
  .show-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}
</style>