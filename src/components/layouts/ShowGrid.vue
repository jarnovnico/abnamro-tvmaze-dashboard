<script setup lang="ts">
import type { Show } from '../../shared/types/show.types.ts'
import ShowCard from '../molecules/ShowCard.vue'

defineProps<{
  shows: Show[]
}>()
</script>

<template>
  <section class="show-grid">
    <ShowCard
      v-for="show in shows"
      :key="show.id"
      :show="show"
    />
  </section>
</template>