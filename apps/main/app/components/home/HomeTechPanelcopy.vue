<template>
  <div
    class="tech-panel"
    :class="{ 'flipped': flipped }"
  >
    <div class="image-container">
      <img class="image" :src="iconUrl" alt="Tech Icon">
    </div>
    <div class="text-container">
      <p class="name">{{ name }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { flipped = false } = defineProps<{
  flipped?: boolean,
  name: string,
  iconUrl: string,
  description: string
}>()
</script>

<style scoped>

.tech-panel {
  display: flex;
  align-items: center;
  height: 7em;
  width: 28em;
  background: var(--color-primary-95);
  border-radius: 0.75em;
  overflow: hidden;
  border: 1px solid var(--color-secondary-30, var(--color-primary-85));
  margin-bottom: 1em;
}

.tech-panel.flipped {
  flex-direction: row-reverse;
}

.image-container {
  width: 8em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-secondary-10, #232323);
}

.text-container {
  flex: 1;
  margin: auto 1.2em;
}

.flipped {
  text-align: right;
}

.name {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--color-secondary-85);
  margin-bottom: 0.3em;
}

.description {
  color: var(--color-secondary-60);
  font-size: 1em;
  line-height: 1.4;
  word-break: break-word;
}

.image {
  width: 70%;
  height: 70%;
  object-fit: contain;
  border-radius: 0.4em;
}

p {
  margin: 0
}
</style>