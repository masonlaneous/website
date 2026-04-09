<script setup lang="ts">
onMounted(() => {
  document.title = 'Contact'
})
</script>

<template>
  <div class="contact">
    <title>Contact</title>
    <h1>Want to contact me?</h1>
    <a href="mailto:contact@masonlaneous.com">
      <h2>contact@masonlaneous.com</h2>
    </a>
    <br>
    <p>Questions, comments, anything is welcome!</p>
  </div>
</template>

<style scoped>
.contact {
  text-align: center;
  width: 90vw;
  text-wrap: wrap;
  word-wrap: break-word;
  display: inline-block;
}
</style>