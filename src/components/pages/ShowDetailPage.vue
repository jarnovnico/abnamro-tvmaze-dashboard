<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useShow } from '../../composables/useShow';
import ContentWrapper from '../layouts/ContentWrapper.vue';
import Chip from '../atoms/Chip.vue';

const route = useRoute();
console.log('route', route);

const {
  show,
  loading,
  error,
  fetchShow,
} = useShow();

// watch + immeditate = run once immediatly and run again when ever this specific reactive value changes!
// if we use onMounted() here: when we change the url parms from /123 to /321, then our pages content will still show content of /123 because onMounted() doesn't update on parms change.
// so onMounted() will not run again... so we need to "watch" the route parameters!
watch(
  () => route.params.id, // this is the dependency!
  value => {
    const id = Number(value);

    if (!Number.isInteger(id)) {
      return;
    };
    fetchShow(id);
  },
  {
    immediate: true,
  }
);
/* 
this is almost the same as writing (in react):
useEffect(() => {
  fetchShow(Number(id))
}, [id])
react uses the dependency array, and Vue's reactive source is passed to `watch()`!
*/
</script>

<template>
  <ContentWrapper>
    <header>
      <h1>Show Detail</h1>
      <RouterLink 
        :to="{ name: 'dashboard' }"
        class="back-link"
      >
        <span>&larr; Back to dashboard</span>
      </RouterLink>
    </header>

    <p v-if="loading">Loading...</p>
    <!-- if user navigated to /abc instead of /123 we show this error (for now!) -->
    <p v-else-if="error">{{ error }}</p>

    <article 
      v-else-if="show"
      class="show-detail"
    >
      <div class="show-detail__image-wrapper">
        <img
          v-if="show.image.original"
          :src="show.image.original"
          :alt="`${show.title} cover image`"
          class="show-detail__image"
        />
      </div>
      <div class="show-detail__body-content">
        <p v-if="show.status">{{ show.status }}</p>
        <h2>{{ show.title }}</h2>
        <div class="show-detail__meta-data">
          <p v-if="show.rating !== null">
            Rating: {{ show.rating.toFixed(1) }}
          </p>
          <p v-if="show.language">{{ show.language }}</p>
          <p v-if="show.runtime">{{ show.runtime }} min</p>
          <p v-if="show.premiered">{{ show.premiered }}</p>

          <div 
            v-if="show.genres.length > 0"
            class="show-detail__genres"
          >
            <Chip 
              v-for="genre in show.genres"
              :key="genre"
              as="span"
            >
              {{ genre }}
            </Chip>
          </div>

          <div 
            v-if="show.summary"
            class="show-detail__summary"
          >
            {{ show.summary }}
          </div>

          <a
            v-if="show.officialSite"
            :href="show.officialSite"
            target="_blank"
            rel="noopener noreferrer"
            class="button"
          >
            Official website
          </a>
        </div>
      </div>
    </article>
  </ContentWrapper>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  color: #aeb6c5;
  text-decoration: none;
}

.back-link:hover {
  color: #ffffff;
}

.show-detail {
  display: grid;
  grid-template-columns:
    minmax(260px, 340px)
    minmax(0, 1fr);
  gap: 48px;
  align-items: start;
}

.show-detail__image-wrapper {
  overflow: hidden;
  border-radius: 24px;
  background: #171a21;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.show-detail__image {
  display: block;
  width: 100%;
  height: auto;
}

.show-detail__content {
  padding-top: 12px;
}

.show-detail__content h1 {
  margin-bottom: 20px;
  max-width: 900px;
}

.show-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  color: #aeb6c5;
}

.show-detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.show-detail__summary {
  max-width: 800px;
  color: #c4cad5;
  font-size: 1.05rem;
  line-height: 1.8;
}

.button {
  display: inline-flex;
  margin-top: 32px;
  border-radius: 10px;
  padding: 11px 16px;
  color: #13151a;
  background: #f4c95d;
  font-weight: 700;
  text-decoration: none;
}

.button:hover {
  background: #ffd972;
}

@media (max-width: 560px) {
  .show-detail {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .show-detail__image-wrapper { 
    position: static;
    max-width: 284px;
  }
}

@media (max-width: 740px) {
  .show-detail__image {
    width: min(100%, 360px);
  }
}

@media (min-width: 561px) and (max-width: 820px) {
  .show-detail {
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 24px;
  }
}
</style>