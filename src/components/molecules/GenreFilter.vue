<script setup lang="ts">
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
    <button
      @click="onAllClick"
      type="button"
      class="genre-filter__button"
      :class="{
        'genre-filter__button--active':
          selectedGenre === 'All',
      }"
    >
      All
    </button>
    <button
      v-for="genre in genres"
      :key="genre"
      type="button"
      class="genre-filter__button"
      @click="onGenreClick(genre)"
      :class="{
        'genre-filter__button--active':
          selectedGenre === genre,
      }"
    >
      {{ genre }}
    </button>
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

.genre-filter__button {
  border-radius: 24px;
  border: 1px solid #686868;
  background-color: #e9e9e9;
  padding: 8px 16px;
  color: #2f2f2f;
}

.genre-filter__button:hover {
  cursor: pointer;
  border: 1px solid #505050;
  background-color: #d8d6d6;
  color: #1e1d1d;
}

.genre-filter__button:active {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  color: #1e1d1d;
}

.genre-filter__button--active {
  color: #f5f5f5;
  background-color: #171a21;
  border: 1px solid #2a2e38;
}

.genre-filter__button--active:hover {
  color: #fcfcfc;
  background-color: #0a0b0e;
  border: 1px solid #17191f;
}

.genre-filter__button:focus {
  outline: none;
  border-color: #4c8dff;
  box-shadow: 0 0 0 3px rgba(76, 141, 255, 0.2);
}
</style>