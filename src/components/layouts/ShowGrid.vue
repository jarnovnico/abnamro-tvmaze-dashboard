<script setup lang="ts">
import type { Show } from '../../shared/types/show.types.ts';
import ShowCard from '../molecules/ShowCard.vue';

defineProps<{
  shows: Show[]
}>();
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
  display: block;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  margin: 32px 0 0;

  /* other/older browsers */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.show-grid::-webkit-scrollbar {
  display: none;
}

.show-grid > * {
  display: inline-block;
  width: 224px;
  margin-right: 24px;
  vertical-align: top;
  white-space: normal;
}

.show-grid > *:last-child {
  margin-right: 0;
}

/* can use flex in modern browsers */
@supports (display: flex) {
  .show-grid {
    display: flex;
    white-space: normal;
    gap: 24px;
  }

  .show-grid > * {
    display: block;
    flex: 0 0 224px;
    margin-right: 0;
  }
}
</style>