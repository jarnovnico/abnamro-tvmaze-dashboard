<script setup lang="ts">
import type { SortOption } from '../../composables/useShowFilters';

defineProps<{
  modelValue: SortOption
}>();

const emit = defineEmits<{
  'update:modelValue': [
    value: SortOption,
  ]
}>();

const onChangeHandler = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value as SortOption;
  emit('update:modelValue', value);
};
</script>

<template>
  <label class="sort-select" for="sort-show">
    <span>Sort by: </span>
    <select
      id="sort-show"
      name="sort-show"
      :value="modelValue"
      @change="onChangeHandler"
    >
      <option value="rating-desc">Top rating</option>
      <option value="rating-asc">Lowest rated</option>
      <option value="title-asc">Title A-Z</option>
      <option value="title-desc">Title Z-A</option>
    </select>
  </label>
</template>

<style scoped>
.sort-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-select select {
  border: 1px solid #2a2e38;
  border-radius: 10px;
  padding: 10px 36px 10px 12px;
  color: #f5f5f5;
  background-color: #171a21;

  font: inherit;
  line-height: 1.2;
  cursor: pointer;
}

.sort-select select:hover {
  background-color: #0a0b0e;
  border-color: #17191f;
  color: #fcfcfc;
}

.sort-select select:focus {
  outline: none;
  border-color: #4c8dff;
  box-shadow: 0 0 0 3px rgba(76, 141, 255, 0.2);
}

.sort-select option {
  background: #171a21;
  color: #f5f5f5;
}
</style>