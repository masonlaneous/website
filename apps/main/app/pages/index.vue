<script setup lang="ts">
useHead({
  title: 'masonlaneous',
  meta: [
    { name: 'description', content: 'welcome to the masonlaneous!' },
    { property: 'og:title', content: 'masonlaneous.com' },
    { property: 'og:description', content: 'welcome to the masonlaneous!' },
    { property: 'og:url', content: `https://masonlaneous.com/${useRoute().path}` },
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
      <HomeHeader :masonlaneous-click-handler="toggleDvd" />
      <p class="section-text">
        my name is mason! i've been a backend developer since 2018, and i started frontend in 2023.
        <br><br>
        i see code as a way to express myself creatively and have fun solving problems. this site is a foundation for me to build on whenever i get an idea for something to make. 
        <br><br>
        check out the links at the top of the screen, and enjoy your stay!
      </p>
    </div>

    <hr>

    <div class="section">
      <h2 class="section-title">where's the cool stuff?</h2>
      <p class="section-text">
        well, some cool stuff is at the top of the screen!
        <br><br><br><br><br><br><br>hi
      </p>
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

.section-text {
  text-align: left;
  font-size: 1.2em;
  max-width: min(24em, 100vw - 2em);
  margin: 0 auto;
}

.section {
  margin-left: 1em;
  margin-right: 1em;
}

.section-title {
  font-size: 1.8em;
  margin-top: 0;
  margin-bottom: 0.25em;
  text-align: center;
}

hr {
  width: min(calc(100vw - 4em), 36em);
  margin: 4em 0 3em 0;
  border: 1px solid var(--color-primary-90);
}
</style>