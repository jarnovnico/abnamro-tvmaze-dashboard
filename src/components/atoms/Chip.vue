<script setup lang="ts">
import { computed } from 'vue';

type ChipAs = 'button' | 'span' | 'div';

interface Props {
  as?: ChipAs;
  active?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  active: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isButton = computed(() => props.as === 'button');

const elementAttrs = computed(() => {
  if (!isButton.value) return {};

  return {
    type: 'button' as const,
    disabled: props.disabled,
  };
});

const classes = computed(() => [
  'chip',
  {
    'chip--active': props.active,
    'chip--non-interactive': props.disabled || !isButton.value,
  },
]);

const clickHandler = (event: MouseEvent) => {
  if (props.disabled || !isButton.value) return;
  emit('click', event);
}
</script>

<template>
  <!-- use Vue 'component' to render is differently with the :is prop -->
  <component
    :is="as"
    v-bind="elementAttrs"
    :class="classes"
    @click="clickHandler"
  >
    <slot />
  </component>
</template>

<style scoped>
.chip {
  border-radius: 24px;
  border: 1px solid #686868;
  background-color: #e9e9e9;
  color: #2f2f2f;
  padding: 6px 10px;
  font-size: 0.85rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.chip:hover {
  cursor: pointer;
  border: 1px solid #505050;
  background-color: #d8d6d6;
  color: #1e1d1d;
}

.chip:active {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  color: #1e1d1d;
}

.chip--active {
  color: #f5f5f5;
  background-color: #171a21;
  border: 1px solid #2a2e38;
}

.chip--active:hover {
  color: #fcfcfc;
  background-color: #0a0b0e;
  border: 1px solid #17191f;
}

.chip:focus {
  outline: none;
  border-color: #4c8dff;
  box-shadow: 0 0 0 3px rgba(76, 141, 255, 0.2);
}

.chip--non-interactive {
  cursor: default;
  pointer-events: none;
  opacity: 0.85;
}
</style>
