<script setup lang="ts">
import Chip from '../atoms/Chip.vue';

// this child components shouldn't directly modify the parent's state
defineProps<{
  genres: string[]
  selectedGenre: string
}>();

const emit = defineEmits<{
  (event: 'update:selectedGenre', value: string): void
}>();

// "a user clicked string 'action' genre"
// child component "tells" parents component -> update the 'selectedGenre' state in the composables useShowFilters.ts (Vue's "hooks")
const onGenreClick = (genre: string) => {
  emit('update:selectedGenre', genre)
};

const onAllClick = () => {
  emit('update:selectedGenre', 'All')
};
</script>

<template>
  <div class="genre-filter">
    <!-- just handle the onClick handlers and don't submit any forms -->
    <Chip
      @click="onAllClick"
      :active="selectedGenre === 'All'"
    >
      All
    </Chip>
    <Chip
      v-for="genre in genres"
      :key="genre"
      @click="onGenreClick(genre)"
      :active="selectedGenre === genre"
    >
      {{ genre }}
    </Chip>
  </div>
</template>

<style scoped>
.genre-filter {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
}
</style>