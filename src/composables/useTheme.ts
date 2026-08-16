import { ref, watchEffect } from 'vue'

/**
 * Theme is driven by the `data-theme` attribute that design.css keys off.
 * The default (attribute absent) is the light Mizani green palette.
 */
export type Theme = 'light' | 'dark' | 'simba' | 'bahari'

const STORAGE_KEY = 'mizani.theme'

function initial(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(initial())

watchEffect(() => {
  const root = document.documentElement
  if (theme.value === 'light') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme.value)
  localStorage.setItem(STORAGE_KEY, theme.value)
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggleTheme }
}
