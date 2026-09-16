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
  flex: 0 0 auto;
  border-radius: 24px;
  border: 1px solid var(--color-border);
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  padding: 6px 10px;
  font-size: 0.85rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.chip:hover {
  cursor: pointer;
  border: 1px solid var(--color-border-hover);
  background-color: var(--color-primary-hover);
  color: var(--color-text-primary-hover);
}

.chip:active {
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-boder-light);
  color: var(--color-text-primary-hover);
}

.chip--active {
  color: var(--color-text-primary-selecte);
  background-color: var(--color-primary-selected);
  border: 1px solid var(--color-border-selected);
}

.chip--active:hover {
  color: var(--color-text-primary-active-hover);
  background-color: var(--color-primary-active-hover);
  border: 1px solid var(--color-border-active-hover);
}

.chip:focus {
  outline: none;
  border-color: var(--color-focus);
  box-shadow: var(--shadow-focus);
}

.chip--non-interactive {
  cursor: default;
  pointer-events: none;
  opacity: 0.85;
}
</style>
