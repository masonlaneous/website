<template>
  <h1 class="title">welcome to the<br><span class="masonscape" :class="activated && 'activated'" @click="handleClick">masonscape</span></h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  masonscapeClickHandler: () => void
}>()

const activated = ref(false)

const handleClick = () => {
  props.masonscapeClickHandler()

  activated.value = !activated.value
}
</script>

<style scoped>
.title {
  font-size: min(12vw, 3.2em);
  margin-top: 0;
  text-align: center;
}

.masonscape {
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