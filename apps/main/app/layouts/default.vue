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
    { property: 'og:url', content: `https://masonlaneous.com/${useRoute().path}` },
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
  width: 100%;
  height: 100vh;

  align-items: center;
  position: relative;

  overflow-x: hidden;
}
</style>
