<template>
  <div class="default">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
useHead({
  meta: [
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
    { name: 'theme-color', content: '#0090ff' }
  ]
})
</script>

<style>
main {
  flex: 1;
}

.default {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  width: 100%;
  min-height: calc(100vh + var(--header-height));
  position: relative;

  overflow-x: hidden;
}
</style>
