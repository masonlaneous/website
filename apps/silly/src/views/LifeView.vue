<template>
  <div>
    <div v-for="i in Array.from(Array(12).keys())">
      <p>{{ i }}</p>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
p {
  color: white;
}
</style>