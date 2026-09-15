<script setup lang="ts">
import Select from 'primevue/select'
import type { SortOption } from '../../composables/useShowFilters';

defineProps<{
  modelValue: SortOption
}>();

const emit = defineEmits<{
  'update:modelValue': [
    value: SortOption,
  ]
}>();


const sortOptions = [
  { label: 'Top rating', value: 'rating-desc' },
  { label: 'Lowest rated', value: 'rating-asc' },
  { label: 'Title A-Z', value: 'title-asc' },
  { label: 'Title Z-A', value: 'title-desc' },
] satisfies { label: string; value: SortOption }[]

const onChangeHandler = (value: SortOption) => {
  emit('update:modelValue', value)
};
</script>

<template>
  <label class="sort-select" for="sort-show">
    <span>Sort by:</span>

    <Select
      inputId="sort-show"
      :modelValue="modelValue"
      :options="sortOptions"
      optionLabel="label"
      optionValue="value"
      @update:modelValue="onChangeHandler"
    />
  </label>
</template>

<style scoped>
.sort-select {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>