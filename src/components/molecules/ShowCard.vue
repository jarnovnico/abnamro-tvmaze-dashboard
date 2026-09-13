<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Show } from '../../shared/types/show.types';

defineProps<{
  show: Show
}>();
</script>

<template>
  <RouterLink
    :to="{
      name: 'show-detail',
      params: {
        id: show.id,
      },
    }"
    class="show-card"
  >
    <div class="show-card__image">
      <img
        v-if="show.image.medium"
        :src="show.image.medium"
        :alt="`${show.title} poster`"
        loading="lazy"
      >
      <div v-else class="show-card__placeholder">
        No image
      </div>
    </div>

    <div class="show-card__content">
      <h3>{{ show.title }}</h3>
      <p v-if="show.rating !== null">
        ★ {{ show.rating.toFixed(1) }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.show-card {
  overflow: hidden;
  transition:
    transform 100ms ease,
    border-color 100ms ease;
}

.show-card:visited,
.show-card:active {
  color: inherit;
}

.show-card:hover img {
  transform: scale(1.1);
  cursor: pointer;
}

.show-card__image {
  aspect-ratio: 2 / 3;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.show-card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .1s ease;
}

.show-card__placeholder {
  display: grid;
  height: 100%;
  place-items: center;
}

.show-card__content {
  text-align: center;
  padding: 16px;
}

.show-card__content h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  font-weight: initial;
}

.show-card__content p {
  margin: 0;
}
</style>