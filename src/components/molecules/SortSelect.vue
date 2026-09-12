<script setup lang="ts">
defineProps<{
  modelValue: 'rating' | 'title'
}>();

const emit = defineEmits<{
  'update:modelValue': [
    value: 'rating' | 'title',
  ]
}>();

const onChangeHandler = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value as 'rating' | 'title';
  emit('update:modelValue', value);
};
</script>

<template>
  <label>
    <span>Sort by</span>
    <select
      :value="modelValue"
      @change="onChangeHandler"
    >
      <option value="rating">
        Rating
      </option>

      <option value="title">
        Title
      </option>
    </select>
  </label>
</template>