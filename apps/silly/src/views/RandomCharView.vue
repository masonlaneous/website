<template>
  <div class="wrapper">
    <h1>{{ char }}</h1>
    <h2>character {{ number }}</h2>
    <button @click="randomize">new character</button>
    <br/>
    <h1>all unicode in order</h1>
    <p>{{ all }}</p>
</div>
</template>

<script setup>
import { ref } from 'vue'

const number = ref(Math.floor(Math.random() * 65536))
const char = ref(String.fromCharCode(number.value))
const all = String.fromCharCode(...Array.from(Array(65535).keys()))

const randomize = () => {
  number.value = Math.floor(Math.random() * 65536)
  char.value = String.fromCharCode(number.value) 
}
</script>

<style scoped>
br {
  margin: 2em;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  margin-top: 3em;
  /* justify-content: center; */
  font-family: sans-serif;
}

h1 {
  color: white;
  font-size: 4em;
  line-height: 1em;
}

h2 {
  color: #909090;
}

p {
  color: white;
  width: 80vw;
  word-wrap: break-word; 
}

button {
  all: unset;
  background: #000;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5em 1em;
  cursor: pointer;
  user-select: none;
}
</style>