<script setup lang="ts">
defineProps<{
  genres: string[]
  selectedGenre: string
}>();

const emit = defineEmits<{
  (event: 'update:selectedGenre', value: string): void
}>();

const onGenreClick = (genre: string) => {
  emit('update:selectedGenre', genre)
};

const onAllClick = () => {
  emit('update:selectedGenre', 'All')
};
</script>

<template>
  <div class="genre-filter">
    <button
      @click="onAllClick"
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
  border: 1px solid #6930C3;
  background-color: #5E60CE;
  padding: 8px 16px;
  color: #48BFE3;
}

.genre-filter__button:hover {
  cursor: pointer;
}

.genre-filter__button--active {
  color: #7400B8;
  background-color: #4EA8DE;
  border: 1px solid #5E60CE;
}
</style>