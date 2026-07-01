<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const resolutionScale = ref(1)
const zoomScale = ref(1)
let canvasTransformX = 0
let canvasTransformY = 0

let bufferCanvas: HTMLCanvasElement | null = null
let bufferCtx: CanvasRenderingContext2D | null = null

let isPanning = false
let previousX = 0
let previousY = 0

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
const minZoom = 0.1
const maxZoom = 50

let scheduledFrame = 0

const clampResolutionScale = () => {
  resolutionScale.value = Math.round(
    Math.min(maxCanvasScale, Math.max(minCanvasScale, resolutionScale.value)) * 10000,
  ) / 10000
}

const clampZoomScale = () => {
  zoomScale.value = Math.round(
    Math.min(maxZoom, Math.max(minZoom, zoomScale.value)) * 10000,
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
  if (!bufferCtx) return null
  const imageData = imageDataRef.value
  if (!imageData || imageData.width !== width || imageData.height !== height) {
    imageDataRef.value = bufferCtx.createImageData(width, height)
  }
  return imageDataRef.value
}

const drawBufferToCanvas = () => {
  const canvas = canvasRef.value
  const ctx = ctxRef.value
  if (!canvas || !ctx || !bufferCanvas) return

  ctx.imageSmoothingEnabled = false

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.setTransform(
    zoomScale.value,
    0,
    0,
    zoomScale.value,
    canvasTransformX,
    canvasTransformY,
  )
  ctx.drawImage(bufferCanvas, 0, 0)
}

const fillPageWithStatic = () => {
  if (!bufferCanvas || !bufferCtx) return

  const width = canvasWidth.value
  const height = canvasHeight.value
  if (!width || !height) return

  const imageData = ensureImageData(width, height)
  if (!imageData) return

  const data = imageData.data
  const redFn = compiledRFormula.value
  const greenFn = compiledGFormula.value
  const blueFn = compiledBFormula.value
  const mx = mouseX.value
  const my = mouseY.value

  let i = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rawRed = redFn(x, y, mx, my)
      const rawGreen = greenFn(x, y, mx, my)
      const rawBlue = blueFn(x, y, mx, my)

      // if (x === mx && y === my) {
      //   data[i++] = 255
      //   data[i++] = 255
      //   data[i++] = 255
      //   data[i++] = 255
      // } else {
      //   data[i++] = clampByte(rawRed)
      //   data[i++] = clampByte(rawGreen)
      //   data[i++] = clampByte(rawBlue)
      //   data[i++] = 255
      // }

      data[i++] = clampByte(rawRed)
        data[i++] = clampByte(rawGreen)
        data[i++] = clampByte(rawBlue)
        data[i++] = 255
    }
  }

  bufferCtx.putImageData(imageData, 0, 0)
}

const scheduleRender = () => {
  if (scheduledFrame !== 0) return
  scheduledFrame = requestAnimationFrame(() => {
    scheduledFrame = 0

    fillPageWithStatic()
    drawBufferToCanvas()
  })
}

const initCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  if (!bufferCanvas) {
    bufferCanvas = document.createElement('canvas')
    bufferCtx = bufferCanvas.getContext('2d')
  }

  clampResolutionScale()

  // Visible canvas always matches viewport exactly
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Buffer shrinks with resolutionScale
  const bufferWidth = Math.floor(window.innerWidth * resolutionScale.value)
  const bufferHeight = Math.floor(window.innerHeight * resolutionScale.value)
  bufferCanvas.width = bufferWidth
  bufferCanvas.height = bufferHeight
  canvasWidth.value = bufferWidth
  canvasHeight.value = bufferHeight

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
  if (e.key === 'Tab') {
    e.preventDefault()
    showMenu.value = !showMenu.value
    if (showMenu.value) {
      menuRef.value?.showModal()
    } else {
      menuRef.value?.close()
      scheduleRender()
    }
  } else if (e.key === '-') {
    let prevRes = resolutionScale.value
    resolutionScale.value -= 0.05
    clampResolutionScale()
    zoomScale.value = zoomScale.value * (prevRes / resolutionScale.value)
    clampZoomScale()
    initCanvasSize()
  } else if (e.key === '=') {
    let prevRes = resolutionScale.value
    resolutionScale.value += 0.05
    clampResolutionScale()
    zoomScale.value = zoomScale.value * (prevRes / resolutionScale.value)
    clampZoomScale()
    initCanvasSize()
  } else if (e.key === '0') {
    resolutionScale.value = 1
    zoomScale.value = 1
    canvasTransformX = 0
    canvasTransformY = 0
    clampResolutionScale()
    initCanvasSize()
  } else if (e.key === 'ArrowUp'){
    mouseY.value += 1
    scheduleRender()
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (showMenu.value || !canvasRef.value) return
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const scale = resolutionScale.value

  if (isPanning) {
    const displayScaleX = canvas.width / rect.width
    const displayScaleY = canvas.height / rect.height
    canvasTransformX += (e.clientX - previousX) * displayScaleX
    canvasTransformY += (e.clientY - previousY) * displayScaleY
    previousX = e.clientX
    previousY = e.clientY
    scheduleRender()
    return
  }

  const cssX = e.clientX - rect.left
  const cssY = e.clientY - rect.top

  // Undo the canvas display scaling (rect vs canvas.width/height)
  const displayScaleX = canvas.width / rect.width
  const displayScaleY = canvas.height / rect.height
  const canvasPixelX = cssX * displayScaleX
  const canvasPixelY = cssY * displayScaleY

  // Undo the pan/zoom transform to get buffer-space coordinates
  const bufferX = (canvasPixelX - canvasTransformX) / zoomScale.value
  const bufferY = (canvasPixelY - canvasTransformY) / zoomScale.value

  const newX = Math.floor(bufferX)
  const newY = Math.floor(bufferY)
  if (newX === mouseX.value && newY === mouseY.value) return

  mouseX.value = newX
  mouseY.value = newY

  scheduleRender()
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (showMenu.value || !bufferCanvas) return

  const previousZoom = zoomScale.value

  let newZoom = previousZoom
  if (e.deltaY < 0) {
    newZoom = Math.min(maxZoom, zoomScale.value * 1.05)
  } else if (e.deltaY > 0) {
    newZoom = Math.max(minZoom, zoomScale.value * 0.95)
  }

  const newX = e.clientX - (e.clientX - canvasTransformX) * (newZoom / previousZoom)
  const newY = e.clientY - (e.clientY - canvasTransformY) * (newZoom / previousZoom)

  canvasTransformX = newX
  canvasTransformY = newY
  zoomScale.value = newZoom

  scheduleRender()
}

const handleMouseDown = (e: MouseEvent) => {
  if (showMenu.value) return // dont pan if the user is looking at the menu
  isPanning = true
  previousX = e.clientX
  previousY = e.clientY
}

const handleMouseUp = (e: MouseEvent) => {
  isPanning = false
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('resize', initCanvasSize)
  window.addEventListener('wheel', handleWheel, { passive: false })

  if (showMenu.value) menuRef.value?.showModal()
  initCanvasSize()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
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
      <!-- <h1>{{ resolutionScale }}</h1>
      <h1>{{ zoomScale }}</h1> -->
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

  image-rendering: pixelated;

  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
}
</style>