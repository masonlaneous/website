<template>
  <div class="like" @click="handleLike">
    <p class="like-counter">{{ numLikesRef }}</p>
    <Icon v-show="!likedRef" class="like-button" size="1.4em" :name="'material-symbols:favorite-outline'"/>
    <Icon v-show="likedRef" class="like-button liked" size="1.4em" :name="'material-symbols:favorite'"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  liked: boolean | null
  postId: number
  numLikes: number
}>()

const likedRef = ref(props.liked)
const numLikesRef = ref(props.numLikes)

const handleLike = async (e: MouseEvent) => {
  e.preventDefault()

  if (likedRef.value) {
    console.log('already liked, unliking')
    unlikePost()
  } else {
    console.log('not already liked, liking')
    likePost()
  }
}

async function likePost() {
  const flowLikes = localStorage.getItem('flowLikes')
  if (!flowLikes) return console.log('cant read localstorage')
  const parsedLikes = JSON.parse(flowLikes) as number[]
  if (parsedLikes.includes(props.postId)) return console.log('not liking because its already liked according to localStorage')

  console.log('changing localstorage likes from', parsedLikes, 'to', [...parsedLikes, props.postId])
  localStorage.setItem('flowLikes', JSON.stringify([...parsedLikes, props.postId]))
  likedRef.value = true
  numLikesRef.value += 1

  return $fetch('/api/flow/like', {
    method: 'POST',
    body: { postId: props.postId }
  })
}

async function unlikePost() {
  const flowLikes = localStorage.getItem('flowLikes')
  if (!flowLikes) return console.log('not unliking, cant read localstorage')
  const parsedLikes = JSON.parse(flowLikes) as number[]
  if (!parsedLikes.includes(props.postId)) return console.log('not unliking, post isnt liked according to localstorage')

  console.log('changing localstorage likes from', parsedLikes, 'to', parsedLikes.filter(x => x !== props.postId))
  localStorage.setItem('flowLikes', JSON.stringify(parsedLikes.filter(x => x !== props.postId)))
  likedRef.value = false
  numLikesRef.value -= 1

  return $fetch('/api/flow/unlike', {
    method: 'POST',
    body: { postId: props.postId }
  })
}

onMounted(() => {
  console.log('the like button was passed an initial liked value of:', props.liked)
})
</script>

<style>
.like {
  margin-left: 1.5em;
  display: flex;

  width: fit-content;
  height: fit-content;
}

.like-counter {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0.3em;
}

.like-button {
  cursor: pointer;
}

.like-button:hover {
  transform: scale(110%);
}

.liked {
  color: var(--color-accent);
  background-color: var(--color-accent)
}
</style>