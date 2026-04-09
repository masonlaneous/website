<template>
  <h1>welcome to <br><span class="masonlaneous" :class="activated && 'activated'" @click="handleClick">masonlaneous</span></h1>
  <h2>the place for mason to share his miscellaneous thoughts & creations</h2>
</template>

<script setup lang="ts">
const props = defineProps<{
  masonlaneousClickHandler: () => void
}>()

const activated = ref(false)

const handleClick = () => {
  props.masonlaneousClickHandler()

  activated.value = !activated.value
}
</script>

<style scoped>
h1 {
  font-size: min(12vw, 3.2em);
  margin-top: 1em;
  margin-bottom: 0.4em;
  text-align: center;
}

h2 {
  font-size: min(4vw, 1em);
  text-align: center;
  margin-bottom: 3em;
  color: var(--color-secondary-60);
  font-style: italic;
  font-weight: normal;
}

.masonlaneous {
  background: linear-gradient(to left, var(--blue-6), var(--blue-5), var(--blue-4), var(--blue-3), var(--blue-2), var(--blue-1), var(--blue-2), var(--blue-3), var(--blue-4), var(--blue-5), var(--blue-6));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  user-select: none;
  cursor: pointer;
}

.activated {
  background-clip: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  color: var(--color-secondary);
}
</style>