import { ref } from 'vue'

type Theme = 'none' | 'blue'

const savedTheme = (localStorage.getItem('theme') as Theme) || 'none'
const currentTheme = ref<Theme>(savedTheme)

if (savedTheme !== 'none') {
  document.documentElement.dataset.theme = savedTheme
} else {
  delete document.documentElement.dataset.theme
}

export function useTheme() {
  function setTheme(theme: Theme) {
    currentTheme.value = theme

    if (theme === 'none') {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = theme
    }

    localStorage.setItem('theme', theme)
  }

  return {
    theme: currentTheme,
    setTheme,
  }
}
