<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const canvasWidth = ref(0)
const canvasHeight = ref(0)
const canvasScaleRef = ref(1)

const rainbowMode = ref(false)

const mouseX = ref(0)
const mouseY = ref(0)
const xInputRef = ref('')
const yInputRef = ref('')

const menuRef = ref<HTMLDialogElement>()
const showMenu = ref(false)

const rFormula = ref('(x * y * mx * my % 255) * mx % 255')
const gFormula = ref('(x * y * mx * my % 255) * my % 255')
const bFormula = ref('x * y * mx * my % 255')
const compiledRFormula = ref<(x: number, y: number, mx: number, my: number) => number>(() => 0)
const compiledGFormula = ref<(x: number, y: number, mx: number, my: number) => number>(() => 0)
const compiledBFormula = ref<(x: number, y: number, mx: number, my: number) => number>(() => 0)

const imageDataRef = ref<ImageData | null>(null)

const minCanvasScale = 0.05
const maxCanvasScale = 1.5

let scheduledFrame = 0

const clampCanvasScale = () => {
  canvasScaleRef.value = Math.round(
    Math.min(maxCanvasScale, Math.max(minCanvasScale, canvasScaleRef.value)) * 10000,
  ) / 10000
}

const compileFormula = (formula: string) => {
  try {
    return new Function('x', 'y', 'mx', 'my', `return ${formula}`) as (
      x: number,
      y: number,
      mx: number,
      my: number,
    ) => number
  } catch (error) {
    console.warn('Failed to compile formula:', formula, error)
    return () => 0
  }
}

const clampByte = (value: number) => (value < 0 ? 0 : value > 255 ? 255 : value)

const ensureImageData = (width: number, height: number) => {
  if (!ctxRef.value) return null
  const imageData = imageDataRef.value
  if (!imageData || imageData.width !== width || imageData.height !== height) {
    imageDataRef.value = ctxRef.value.createImageData(width, height)
  }
  return imageDataRef.value
}

const fillPageWithStatic = () => {
  if (!canvasRef.value || !ctxRef.value) return

  const width = canvasWidth.value
  const height = canvasHeight.value
  if (!width || !height) return

  const imageData = ensureImageData(width, height)
  if (!imageData) return

  const data = imageData.data
  const redFn = compiledRFormula.value
  const greenFn = compiledGFormula.value
  const blueFn = compiledBFormula.value
  const mx = mouseX.value || 0
  const my = mouseY.value || 0

  let i = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rawRed = redFn(x, y, mx, my)
      const rawGreen = greenFn(x, y, mx, my)
      const rawBlue = blueFn(x, y, mx, my)

      if (x === mx && y === my) {
        data[i++] = 255
        data[i++] = 255
        data[i++] = 255
        data[i++] = 255
      } else {
        data[i++] = clampByte(rawRed)
        data[i++] = clampByte(rawGreen)
        data[i++] = clampByte(rawBlue)
        data[i++] = 255
      }
    }
  }

  ctxRef.value.putImageData(imageData, 0, 0)
}

const scheduleRender = () => {
  if (scheduledFrame !== 0) return
  scheduledFrame = requestAnimationFrame(() => {
    scheduledFrame = 0
    // if (!showMenu.value) {
      fillPageWithStatic()
    // }
  })
}

const initCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  clampCanvasScale()
  const width = Math.floor(window.innerWidth * canvasScaleRef.value)
  const height = Math.floor(window.innerHeight * canvasScaleRef.value)

  canvas.width = width
  canvas.height = height
  canvasWidth.value = width
  canvasHeight.value = height
  imageDataRef.value = null
  scheduleRender()
}

watch([rFormula, gFormula, bFormula], () => {
  compiledRFormula.value = compileFormula(rFormula.value)
  compiledGFormula.value = compileFormula(gFormula.value)
  compiledBFormula.value = compileFormula(bFormula.value)
  scheduleRender()
}, { immediate: true })

watch([canvasWidth, canvasHeight], () => {
  scheduleRender()
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'r') {
    rainbowMode.value = !rainbowMode.value
    fillPageWithStatic()
  } else if (e.key === 'Tab') {
    e.preventDefault()
    showMenu.value = !showMenu.value
    if (showMenu.value) {
      menuRef.value?.showModal()
    } else {
      menuRef.value?.close()
      scheduleRender()
    }
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (showMenu.value || !canvasRef.value) return
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const scale = canvasScaleRef.value

  const cssX = e.clientX - rect.left
  const cssY = e.clientY - rect.top

  const newX = Math.floor(cssX * scale)
  const newY = Math.floor(cssY * scale)

  if (newX === mouseX.value && newY === mouseY.value) return

  mouseX.value = newX
  mouseY.value = newY

  scheduleRender()
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (e.deltaY < 0) {
    canvasScaleRef.value = Math.max(minCanvasScale, canvasScaleRef.value - 0.05)
  } else if (e.deltaY > 0) {
    canvasScaleRef.value = Math.min(maxCanvasScale, canvasScaleRef.value + 0.05)
  }
  clampCanvasScale()
  initCanvasSize()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', initCanvasSize)
  window.addEventListener('wheel', handleWheel, { passive: false })

  if (showMenu.value) menuRef.value?.showModal()
  initCanvasSize()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', initCanvasSize)
  window.removeEventListener('wheel', handleWheel)

  if (scheduledFrame !== 0) {
    cancelAnimationFrame(scheduledFrame)
    scheduledFrame = 0
  }
})
</script>

<template>
  <main>
    <canvas class="canvas" ref="canvasRef" />
    <dialog ref="menuRef" id="menu" class="menu">
      <h2>this page may hurt your eyes<br>press Tab to show or hide this menu</h2>
      <textarea v-model="xInputRef"></textarea>
      <textarea v-model="yInputRef"></textarea>
      <br>
      red formula
      <textarea v-model="rFormula"></textarea><br>
      green formula
      <textarea v-model="gFormula"></textarea><br>
      blue formula
      <textarea v-model="bFormula"></textarea><br>
    </dialog>
    <div class="info">
      <h1>{{ mouseX }}</h1>
      <h1>{{ mouseY }}</h1>
      <h1>{{ canvasScaleRef }}</h1>
    </div>
  </main>
</template>

<style>
.menu {
  margin: min(auto, 4em);
  padding: 2em;
  width: min(30em, 100%);
  height: min(30em, 100%);
  background-color: rgba(255, 255, 255, 70%);
  outline: none;
}

.menu > h2 {
  text-align: center;
}

.info {
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.info > h1 {
  outline: black;
  text-shadow: 2px 2px 5px #000, 2px 2px 5px #000;
  user-select: none;
  margin-left: .4em;
}

.canvas {
  background-color: black;

  image-rendering: optimizeSpeed;

  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
}
</style>