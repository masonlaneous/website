<template>
  <button class="button" @click="handleClick" >
    <Icon name="material-symbols:palette-outline" class="theme-icon" />
  </button>
</template>

<script setup lang="ts">
import { useTheme, type Theme } from '~/composables/theme'

const currentTheme = useTheme()

const themeList: Theme[] = [
  {
    name: 'dark',
    primary: '161616',
    secondary: 'ffffff',
    accent: '0090ff',
    dark: true
  },
  {
    name: 'light',
    primary: 'ffffff',
    secondary: '161616',
    accent: '0090ff',
    dark: false
  },
  // {
  //   name: 'light-pink',
  //   primary: 'feb6ff',
  //   secondary: '510083',
  //   accent: '900000',
  //   dark: false
  // },
  // {
  //   name: 'blue',
  //   primary: '244880',
  //   secondary: 'ffff00',
  //   accent: '00bb00',
  //   dark: true
  // }, {
  //   name: 'evil',
  //   primary: 'ff0000',
  //   secondary: '000000',
  //   accent: '000000',
  //   dark: true
  // }, {
  //   name: 'halloween',
  //   primary: 'ff8c00',
  //   secondary: 'c800ff',
  //   accent: '000000',
  //   dark: false
  // }, {
  //   name: 'trans',
  //   primary: '5BCEFA',
  //   secondary: 'F5A9B8',
  //   accent: 'ffffff',
  //   dark: false
  // }, {
  //   name: 'bisexual',
  //   primary: '9B4F96',
  //   secondary: '0038A8',
  //   accent: 'D60270',
  //   dark: true
  // }, {
  //   name: 'france',
  //   primary: '149954',
  //   secondary: 'E4312b',
  //   accent: '000000',
  //   dark: true
  // }
]

const themeNames = themeList.map(theme => theme.name)

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme')
  const initialTheme = savedTheme ? JSON.parse(savedTheme) : document.documentElement.classList.contains('dark') ? themeList[0] : themeList[1]

  return initialTheme
}

const getNextTheme = (currentTheme: Theme): Theme => {
  const currentThemeIndex = themeNames.indexOf(currentTheme.name)
  const nextThemeIndex =
    currentThemeIndex === themeList.length - 1 // If current theme is the last theme in the list
      ? 0 // Cycle back to the beginning of the theme list
      : currentThemeIndex + 1 // Else go to the next theme in the list

  return themeList[nextThemeIndex]!
}

const applyTheme = (theme: Theme) => {
  document.documentElement.style.setProperty('--color-primary', '#' + theme.primary)
  document.documentElement.style.setProperty('--color-secondary', '#' + theme.secondary)
  document.documentElement.style.setProperty('--color-accent', '#' + theme.accent)
  document.documentElement.setAttribute('is-special-theme', (theme.name !== 'dark' && theme.name !== 'light').toString())

  document.documentElement.classList.toggle('dark', theme.dark)
  document.documentElement.classList.toggle('light', !theme.dark)

  localStorage.setItem('theme', JSON.stringify(theme))
}

const cycleTheme = (currentTheme: Theme): Theme => {
  const nextTheme = getNextTheme(currentTheme)

  currentTheme = nextTheme
  applyTheme(nextTheme)

  return nextTheme
}


const handleClick = () => {
  if (!currentTheme.value) return

  currentTheme.value = cycleTheme(currentTheme.value)
}

onMounted(() => {
  currentTheme.value = getInitialTheme()
})
</script>

<style scoped>
button {
  all: unset;
}

.button {
  color: var(--color-primary);
  border: none;
  cursor: pointer;
  width: var(--button-size);
  height: var(--button-size);

  padding: 1em;

  display: flex;
  align-items: center;
  justify-content: center;

}


.theme-icon {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  color: var(--color-secondary)
}
</style>
