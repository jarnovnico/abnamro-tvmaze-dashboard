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
  <label class="search-bar">
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

<style scoped>
.search-bar {
  display: block;
  width: min(360px, 100%);
}

.search-bar input {
  width: 100%;
  border: 1px solid #2a2e38;
  border-radius: 12px;
  padding: 12px 16px;
  color: #f5f5f5;
  background: #171a21;
  outline: none;
}

.search-bar input::placeholder {
  color: #747d91;
}

.search-bar input:focus {
  outline: none;
  border-color: #4c8dff;
  box-shadow: 0 0 0 3px rgba(76, 141, 255, 0.2);
}

@media (max-width: 640px) {
  .search-bar {
    width: 100%;
  }
}
</style>