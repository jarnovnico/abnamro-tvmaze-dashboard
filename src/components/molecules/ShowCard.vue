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
      <h2>{{ show.title }}</h2>

      <p v-if="show.rating !== null">
        ★ {{ show.rating.toFixed(1) }}
      </p>
    </div>
  </article>
</template>