<template>
  <FlowThought v-if="currentThought" class="thought" :thought="currentThought" :is-link="false" :liked="isLiked"/>
  <h1 v-else-if="finishedFetchingThought">{{ `No post found for ${typeof slug} ${slug}` }}</h1>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug

useSeoMeta({
  title: 'flow of thought'
})

const currentThought: Ref<FlowThought | undefined> = ref(undefined)
const finishedFetchingThought = ref(false)

const likedList = ref<number[]>([])

const isLiked = computed(() => {
  if (!currentThought.value) return false

  return likedList.value.includes(currentThought.value.id)
})

const initLikedList = () => {
  const flowLikes = localStorage.getItem('flowLikes')
  if (!flowLikes) return null
  // console.log(JSON.parse(flowLikes).includes(currentThought.id))

  return likedList.value = JSON.parse(flowLikes)
}

onMounted(async () => {
  currentThought.value = await $fetch(`/api/flow/thought/${slug}`)
  finishedFetchingThought.value = true

  if (currentThought.value) {
    const trailing = (currentThought.value !== undefined && currentThought.value.content.length > 60) ? '...' : ''

    useSeoMeta({
      title: currentThought.value?.content.substring(0, 60) + trailing
    })
  }
  
  const savedLikes = localStorage.getItem('flowLikes')
  if (!savedLikes) {
    localStorage.setItem('flowLikes', JSON.stringify([]))
  } else {
    initLikedList()
  }
})
</script>

<style scoped>
.thought {
  font-size: 1.4em;
  margin-top: 4em;
}
</style>