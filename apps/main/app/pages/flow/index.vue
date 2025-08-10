<template>
  <div v-if="thoughts.length > 0" class="flow">
    <div v-if="adminKey" class="create-post"> 
      <textarea
        id="form-textarea"
        v-model="formInput"
      />
      <button @click="handleClick">submit</button>
    </div>

    <FlowThoughtLinked v-for="thought in thoughts" :key="thought.id" :thought="thought" :liked="likedList.includes(thought.id)"/>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'flow of thought'
})

async function addPost(content: string) {
  return $fetch('/api/flow', {
    method: 'POST',
    body: { content, adminKey: adminKey.value }
  })
}

const thoughts = ref<FlowThought[]>([])
const formInput = ref('testing!')
const adminKey = ref<string | null>()
const likedList = ref<number[]>([])

const initLikedList = () => {
  const flowLikes = localStorage.getItem('flowLikes')
  if (!flowLikes) return null

  console.log(JSON.parse(flowLikes))

  return likedList.value = JSON.parse(flowLikes)
}

const handleClick = async () => {
  const content = formInput.value
  if (!content) return

  formInput.value = ''

  console.log('adding post')
  await addPost(content)
  await updateFlowCache()
}

const updateFlowCache = async () => {
  const flowCache: FlowThought[] = await $fetch('/api/flow', {
    method: 'GET'
  })

  thoughts.value = flowCache
}

onMounted(async () => {
  const localAdminKey = localStorage.getItem('adminKey')
  if (localAdminKey) {
    adminKey.value = localAdminKey
  }

  const savedLikes = localStorage.getItem('flowLikes')
  if (!savedLikes) {
    localStorage.setItem('flowLikes', JSON.stringify([]))
  } else {
    initLikedList()
  }

  await updateFlowCache()
})

</script>

<style scoped>
.flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  margin-top: 4em;
}


</style>