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
  <div>
    <button
      @click="onAllClick"
    >
      All
    </button>
    <button
      v-for="genre in genres"
      :key="genre"
      @click="onGenreClick(genre)"
    >
      {{ genre }}
    </button>
  </div>
</template>