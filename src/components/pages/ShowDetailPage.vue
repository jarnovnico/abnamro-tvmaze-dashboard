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
  <div class="show-detail-page">
    <section
      v-if="show"
      class="show-hero"
      :style="{
        '--hero-image': show.image.original
          ? `url('${show.image.original}')`
          : 'none',
      }"
    >
      <div class="show-hero__backdrop" />

      <ContentWrapper>
        <div class="show-hero__content">
          <h1>Show Detail</h1>
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="back-link"
          >
            <span>&larr; Back to dashboard</span>
          </RouterLink>

          <article 
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
              <p v-if="show.status">Show status: {{ show.status }}</p>
              <h2>{{ show.title }}</h2>
              <div class="show-detail__meta-data">
                <p v-if="show.rating !== null" class="show-detail__rating">
                  Rating: ★ {{ show.rating.toFixed(1) }}
                </p>
                <p v-if="show.language">Language: {{ show.language }}</p>
                <p v-if="show.runtime">Runtime: {{ show.runtime }} min</p>
                <p v-if="show.premiered">Release date: {{ show.premiered }}</p>

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
        </div>
      </ContentWrapper>
    </section>

    <p v-else-if="loading">Loading...</p>
    <!-- if user navigated to /abc instead of /123 we show this error (for now!) -->
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.show-detail-page {
  min-height: 100vh;
  background: var(--bg-dark-hard);
}

.show-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-height: 720px;
}

.show-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;

  background-image: var(--hero-image);
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;

  filter: blur(2px); /* not too much blur. bad for performance! */
  transform: scale(1.03);
}

.show-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;

  background:
    linear-gradient(
      to bottom,
      rgba(15, 17, 21, 0.15) 0%,
      rgba(15, 17, 21, 0.35) 25%,
      rgba(15, 17, 21, 0.78) 55%,
      var(--bg-dark-hard) 100%
    );
}

.show-hero__backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;

  background:
    linear-gradient(
      to right,
      rgba(15, 17, 21, 0.9) 0%,
      rgba(15, 17, 21, 0.55) 45%,
      rgba(15, 17, 21, 0.3) 100%
    );
}

.show-hero__content {
  width: min(1400px, 100% - 32px);
  min-height: 720px;
  margin: 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.back-link {
  display: inline-flex;
  color: var(--color-secondary);
  text-decoration: none;
  margin-bottom: 16px;
}

.back-link:hover {
  color: var(--color-secondary-hover);
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
  position: relative;
  border-radius: 24px;
  background: var(--color-primary-selected);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.show-detail__image {
  display: block;
  width: 100%;
  height: auto;
}

.show-detail__rating {
  font-size: .8rem;
  font-weight: 800;
  color: var(--color-text-primary);
  border-radius: 24px;
  padding: 4px 12px;
  background-color: var(--color-highlight); 
  backdrop-filter: blur(8px);
  margin: 0;
  width: fit-content;
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
  color: var(--color-text-primary-light);
}

.show-detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.show-detail__summary {
  max-width: 800px;
  color: var(--color-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
}

.button {
  display: inline-flex;
  margin-top: 32px;
  border-radius: 10px;
  padding: 11px 16px;
  color: var(--color-text-primary);
  background: var(--color-highlight);
  font-weight: 700;
  text-decoration: none;
}

.button:hover {
  background: var(--color-highlight-hover);
  color: var(--color-text-primary-hover);
}

@media (max-width: 560px) {
  .show-detail {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .show-detail__image-wrapper { 
    max-width: 284px;
  }
}

@media (max-width: 768px) {
  .show-hero {
    min-height: auto;
  }

  .show-hero__content {
    min-height: auto;
  }


  .show-detail__image {
    width: min(100%, 360px);
  }

  .show-detail__content {
    padding-bottom: 0;
  }
}

@media (min-width: 561px) and (max-width: 820px) {
  .show-detail {
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 24px;
  }
}
</style>