<script setup lang="ts">
const isSpecialTheme = ref<null | boolean>(null)

onMounted(() => {
  const targetNode = document.documentElement

  const updateIsSpecialTheme = () => {
    isSpecialTheme.value = targetNode.getAttribute('is-special-theme') === 'true'
  }

  updateIsSpecialTheme()

  const observer = new MutationObserver(() => {
    updateIsSpecialTheme()
  })

  observer.observe(targetNode, {
    attributes: true,
    attributeFilter: ['is-special-theme'],
  })
})
</script>

<template>
  <header class="header">
    <NuxtLink class="logolink" href="/">
      <div class="logo">
        <div class="picture-wrapper">
          <div class="placeholder-logo"/>
          <img v-if="typeof isSpecialTheme === 'boolean' && !isSpecialTheme" class="picture" src=/MasonCircle.svg>
          <MasonPicture v-else class="picture" />
        </div>
      </div>
      <p class="wordmark">masonlaneous</p>
    </NuxtLink>
    <div class="header-links">
      <NuxtLink class="header-link" href="/blog">
        Blog
      </NuxtLink>
      <NuxtLink class="header-link" href="/flow">
        Flow
      </NuxtLink>
      <NuxtLink class="header-link" href="/blog">
        Chat
      </NuxtLink>
    </div>
    <!-- <div class="button-list">
      <ThemeSwitcher class="button"/>
    </div> -->
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;

  /* only width containment for container queries based on width */
  container-type: inline-size;

  width: 100%;
  height: var(--header-height, 64px);   /* explicit height + fallback */
  flex: 0 0 var(--header-height, 64px); /* don’t let flexbox shrink it */
  box-sizing: border-box;
  background-color: color-mix(in srgb, var(--color-primary-90) 50%, transparent 50%);
  background-color: var(--color-primary-95);
  /* backdrop-filter: brightness(10%); */
  z-index: 1000;

  /* stick to the top of the screen */
  position: fixed;
}

.button-list {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;

  display: flex;
}

.header-links {
  position: absolute;
  font-size: 1.1em;
}

.header-link {
  color: var(--color-secondary) 70%;
  padding: min(2vw, 1em);
  text-decoration: none;
}

.logolink {
  text-decoration: none;
  color: var(--color-secondary);
  height: var(--header-height);
  max-width: fit-content;
  display: flex;
  align-items: center;

  padding-left: 1em;
  padding-right: 1em;
  margin-right: auto;

  gap: 0.8rem;
}

.wordmark {
  font-size: 1.6em;
  font-weight: 700;
  color: var(--color-secondary);
  margin: 0;
  /* attempt to perfectly align the wordmark with the logo */
  margin-bottom: 0.25em;
}

.logo {
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-logo {
  background: var(--color-secondary);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
}

html[is-special-theme="false"] .placeholder-logo {
  background: linear-gradient(#00c0ff, #0048ff)
}

.picture-wrapper,
.picture {
  inline-size: calc(var(--header-height) - 1.75em);
  block-size: calc(var(--header-height) - 1.75em);
  /* keep it circular */
  clip-path: circle(50%);
}

@media (max-width: 600px) {
  .wordmark {
    display: none
  }
}
</style>