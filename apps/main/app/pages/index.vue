<script setup lang="ts">
useHead({
  title: 'masonscape',
  meta: [
    { name: 'description', content: 'welcome to the masonscape!' },
    { property: 'og:title', content: 'masonscape.com' },
    { property: 'og:description', content: 'welcome to the masonscape!' },
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
  ]
})

// definePageMeta({
//   layout: 'main',
// })

const dvdVisible = ref(false)

const toggleDvd = () => {
  dvdVisible.value = !dvdVisible.value
}
</script>

<template>
  <div class="main-page">
    <div class="welcome">
      <HomeHeader :masonscape-click-handler="toggleDvd" />
      <p class="bio">
        my name is mason! i've been a backend developer since 2018, and i started frontend in 2023.
        <br><br>
        i see code as a way to express myself creatively and have fun solving problems. this site is a foundation for me to build on whenever i get an idea for something to make. 
        <br><br>
        check out the links at the top of the screen, and enjoy your stay!
      </p>
    </div>
    <hr>
    <div class="tech-stack">
      <h2 class="the-stack">masonscape runs on...</h2>
      <p class="more-info">click on one to visit its website!</p>
      <div class="stack-panels">
        <HomeTechPanel name="Nuxt" description="plus a few modules" icon-url="main/Nuxt.svg" />
        <HomeTechPanel name="TypeScript" description="the masonscape is type-safe!" icon-url="main/TypeScript.svg" :flipped="true"/>
        <HomeTechPanel name="DigitalOcean" description="the masonscape is type-safe!" icon-url="main/DigitalOcean.svg"/>
        <HomeTechPanel name="Debian" description="the masonscape is type-safe!" icon-url="main/DigitalOcean.svg"/>
        <HomeTechPanel name="pnpm" description="the masonscape is type-safe!" icon-url="main/DigitalOcean.svg"/>
        <HomeTechPanel name="nginx" description="the masonscape is type-safe!" icon-url="main/DigitalOcean.svg"/>
        <HomeTechPanel name="DigitalOcean" description="the masonscape is type-safe!" icon-url="main/DigitalOcean.svg"/>
      </div>
    </div>
    <HomeDVD v-if="dvdVisible" />
  </div>
</template>

<style scoped>
.main-page {
  position: relative;
  z-index: 0;

  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 4em;
}

.welcome {
  margin: 4em auto 0 auto;
  padding: 0 1em;
}

.bio {
  text-align: left;
  font-size: 1.2em;
  max-width: min(24em, 100vw - 2em);
  margin: 0 auto;
}

.tech-stack {
  margin-left: 1em;
  margin-right: 1em;
}

.the-stack {
  font-size: 1.8em;
  margin-top: 0;
  margin-bottom: 0.25em;
  text-align: center;
}

.more-info {
  text-align: center;
  font-style: italic;
  color: var(--color-secondary-70);
  margin-top: 0;
  margin-bottom: 2em;
}

.stack-panels {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
  margin: 0 auto;
  width: min(90vw, 50em);
}

hr {
  width: min(calc(100vw - 4em), 36em);
  margin: 4em 0 3em 0;
  border: 1px solid var(--color-primary-90);
}
</style>