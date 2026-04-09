<template>
<div class="main">
  <div class="debug">
    <h1> {{ canvasWidthRef }}, {{ canvasHeightRef }} </h1>
  </div>
  <canvas ref="canvasRef" :width="canvasWidthRef" :height="canvasHeightRef">

  </canvas>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const canvasWidthRef = ref(0)
const canvasHeightRef = ref(0)

type Hexagon = {
  x: number,
  y: number
}

const gridHeight = 10
const a = 2 * Math.PI / 6 // no idea what this means tbh
const hexList = ref<Hexagon[]>([]) 

const handleResize = () => {
  updateCanvasSize()
} 

const updateCanvasSize = () => {
  canvasWidthRef.value = window.innerWidth * devicePixelRatio
  canvasHeightRef.value = window.innerHeight * devicePixelRatio
}

const addHexagon = (hex: Hexagon) => {
  hexList.value = [...hexList.value, hex]
}

const drawHexagon = (hex: Hexagon) => {
  if (!ctxRef.value) return console.log('no ctx')
  const ctx = ctxRef.value

  const r = canvasHeightRef.value / (gridHeight)

  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  for (var i = 0; i < 6; i++) {
    ctx.lineTo(
      hex.x + r * Math.cos(a * i),
      hex.y + r * Math.sin(a * i)
    )
  }
  ctx.closePath()
  ctx.stroke()
}

const startDrawLoop = () => {
  requestAnimationFrame(() => {
    ctxRef.value?.clearRect(0, 0, canvasWidthRef.value, canvasHeightRef.value)
    hexList.value.forEach(hex => {
      drawHexagon(hex)
    })

    startDrawLoop()
  })
}

const createHexGrid = () => {
  const dpr = window.devicePixelRatio || 1
  const canvas = canvasRef.value
  if (!canvas) return

  // make sure canvas internal size is set somewhere (do this once per resize)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  const ctx = canvas.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

  // r in device pixels (canvasHeightRef is device pixels)
  const r = canvasHeightRef.value / gridHeight

  const xStep = 1.5 * r            // device pixels
  const yStep = Math.sqrt(3) * r   // device pixels

  // use canvasWidthRef / canvasHeightRef (device pixels) for counts
  const cols = Math.ceil(canvasWidthRef.value / xStep) + 1
  const rows = Math.ceil(canvasHeightRef.value / yStep) + 1

  hexList.value = []
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * xStep
      const y = row * yStep + (col % 2 === 0 ? 0 : yStep / 2)
      addHexagon({ x, y })
    }
  }
}

onMounted(() => {
  updateCanvasSize()
  startDrawLoop()
  createHexGrid()

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style>
.main {
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
}

canvas {
  background-color: #003000;
  width: 100%;
  height: 100%;
}

.debug {
  position: absolute;
  color: white;
}
</style>