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
  <label class="search-bar" for="search-show">
    <p class="search-bar__label">Search TV shows: </p>
    <input
      id="search-show"
      name="search-shows"
      type="search"
      :value="modelValue"
      placeholder="Search shows..."
      autocomplete="off"
      @input="onInputChange"
    >
  </label>
</template>

<style scoped>
.search-bar {
  display: block;
  width: min(360px, 100%);
}

.search-bar__label {
  margin: 0 0 8px;
}

.search-bar input {
  width: 100%;
  border: 1px solid var(--color-border-selected);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--color-text-primary-selected);
  background-color: var(--color-primary-selected);
  outline: none;
}

.search-bar input::placeholder {
  color: var(--color-text-placeholder);
}

.search-bar input:focus {
  outline: none;
  border-color: var(--color-focus);
  box-shadow: var(--shadow-focus);
}

@media (max-width: 768px) {
  .search-bar {
    width: 100%;
  }
}
</style>