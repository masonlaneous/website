<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryCollection('blog')
    .order('published', 'DESC')
    .all()
)

const formatTimestamp = (timestamp: number) => {
  return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
  }).format(new Date(timestamp))
}

useHead({
  title: 'blog posts',
  meta: [
    { name: 'description', content: 'the masonlaneous blog' },
    { property: 'og:title', content: 'blog' },
    { property: 'og:description', content: 'the masonlaneous blog' },
    { property: 'og:url', content: `https://masonlaneous.com/${useRoute().path}` },
  ]
})
</script>

<template>
  <div class="blog-index">
    <div class="index-titlebar">
      <h1 class="index-title">Blog Posts</h1>
    </div>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.path" class="post-wrapper">
        <NuxtLink :to="post.path" class="post">
          <h2 class="title">
            {{ post.title }}
          </h2>
          <p v-if="post.published" class="timestamp">
            {{ formatTimestamp(post.published) }}
          </p>
          <p class="description">{{ post.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.index-title {
  margin-top: 0;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1em;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.post-wrapper {
  width: clamp(10em, 80vw, 50em);
  height: 10em;
  border-radius: 0.5em;
  outline: 1px solid var(--color-secondary);
  background-color: var(--color-primary-95);
}

.post {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  gap: 0.25em;

  padding: 1em;
  box-sizing: border-box;

  height: 100%;
  width: 100%;
  color: var(--color-secondary);
  text-decoration: none;
}

.title {
  grid-row: 1;
  grid-column: 1;
  align-self: start;
  padding-right: 0.5em;
  min-height: 2em;
  margin: 0;

  line-clamp: 2;
  -webkit-line-clamp: 2;
}

.description {
  margin-top: 0;
  grid-row: 2;
  margin-top: auto;
  margin-bottom: auto;
  grid-column: 1 / span 2;
  align-self: end;
  font-style: italic;

  line-clamp: 2;
  -webkit-line-clamp: 3;
}

.timestamp {
  margin: 0;
  padding: 0;
  height: auto;
  grid-row: 1;
  grid-column: 2;
}

.title, .description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>