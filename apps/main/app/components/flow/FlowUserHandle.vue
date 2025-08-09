<template>
  <div class="user">
    <NuxtImg class="pfp" :src="image" />
    <h4 class="name">{{ name }}</h4>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string,
  name: string
}>()
</script>

<style>
.pfp {
  width: 2em;
  height: 2em;
}

.user {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.name {
  margin: auto 0 auto 0;
  color: var(--color-secondary-85)
}
</style>