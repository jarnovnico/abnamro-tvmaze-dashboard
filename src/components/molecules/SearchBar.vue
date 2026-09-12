<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const onInputChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};
</script>

<template>
  <label>
    <span>Search TV shows: </span>
    <input
      type="search"
      :value="modelValue"
      placeholder="Search shows..."
      autocomplete="off"
      @input="onInputChange"
    >
  </label>
</template>