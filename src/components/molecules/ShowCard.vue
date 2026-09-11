<script setup lang="ts">
import type { Show } from '../../shared/types/show.types'

defineProps<{
  show: Show
}>()
</script>

<template>
  <article class="show-card">
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
  </article>
</template>

<style scoped>
.show-card {
  overflow: hidden;
  border: 1px solid #272b35;
  transition:
    transform 100ms ease,
    border-color 100ms ease;
}

.show-card:hover {
  transform: translateY(-4px);
  border-color: #454b5a;
  cursor: pointer;
}

.show-card__image {
  aspect-ratio: 2 / 3;
  background: #20242d;
}

.show-card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-card__placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  color: #8b93a3;
}

.show-card__content {
  padding: 16px;
}

.show-card__content h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #5E60CE;
  font-weight: initial;
}

.show-card__content p {
  margin: 0;
  color: #c1c0c3;
}
</style>