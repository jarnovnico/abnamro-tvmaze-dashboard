<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
main {
  width: min(1400px, 100% - 32px);
  margin: 0 auto;
  padding: 48px 0;
}
@media (max-width: 640px) {
  main {
    width: min(100% - 20px, 1400px);
    padding: 28px 0;
  }
}
</style>