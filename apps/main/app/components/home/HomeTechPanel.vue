<template>
  <div class="tech-panel" @click="toggleDescriptionVisibility">
    <p class="name">{{ name }}</p>
    <div class="image-container">
      <img class="image" :src="iconUrl" alt="Tech Icon">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string,
  iconUrl: string,
  description: string
}>()

const showingDescription = ref(false)

const toggleDescriptionVisibility = () => {
  showingDescription.value = !showingDescription.value
}
</script>

<style scoped>


.tech-panel {
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8em;
  height: 8em;
  background: var(--color-primary-95);
  border-radius: 0.5em;
  border: 1px solid var(--color-secondary-30, var(--color-primary-85));
}


.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.name {
  line-height: 2rem;
  height: 2rem;
  font-weight: 600;
  color: var(--color-secondary-85);
  margin: 0;
  font-size: 85%;
}

.image {
  width: 65%;
  aspect-ratio: 1 / 1;
  height: auto;
  object-fit: contain;
  margin-top: 0;
  margin-bottom: auto;
}
</style>