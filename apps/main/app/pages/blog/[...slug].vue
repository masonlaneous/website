<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.description },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description },
    { property: 'og:url', content: `https://masonlaneous.com/${useRoute().path}` },
    { name: 'theme-color', content: '#0090ff' }
  ]
})

useSeoMeta({
  ogImage: './_nuxt/public/MasonCircle.png',
  twitterImage: './_nuxt/public/MasonCircle.png'
})
const rotation = ref(0)

onMounted(() => {
  if (post.value) {
    document.title = post.value.title 
  }
})

const handleClick = () => {
  rotation.value += 10
}
</script>

<template>
  <ContentBody v-if="post" :content="post" />
  <ErrorPage v-else pagetype="post" @click="handleClick" />
</template>

<style scoped>
.error {
  text-align: center;
  user-select: none;
}
</style>