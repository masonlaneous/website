<script setup lang="ts">
const props = defineProps<{
  thought: FlowThought
  liked: boolean | null
}>()

onMounted(() => {
  console.log(`thought ${props.thought.id} is ${props.liked ? '' : 'not'} already liked`)
})
</script>

<template>
  <div class="thought">
    <div class="info-bar">
      <FlowUserHandle class="handle" name="Mason" image="MasonCircle.svg"/>
      <FlowDate :date="new Date(thought.createdAt).toLocaleTimeString()" />
      <FlowLikeButton :liked="liked" :num-likes="thought.likes" :post-id="thought.id" />
    </div>
    <p class="thought-content">{{ props.thought.content }}</p>
  </div>
</template>

<style scoped>
.thought {
  background-color: var(--color-primary-90);
  padding: 1em;

  height: fit-content;
  width: min(30em, calc(100vw - 4em));

  animation: show 0.4s;

  border-radius: 0.5em;
}

.thought:hover {
  background-color: var(--color-primary-85)
}

.info-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.handle {
  margin-right: auto;
}

.thought-content {
  margin-top: 1.5em;
}

@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>