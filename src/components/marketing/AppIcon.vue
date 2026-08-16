<script setup lang="ts">
/**
 * Single-stroke line icons on a 24px grid. Every glyph inherits currentColor
 * so icons take the colour of the card, pill or button that holds them.
 */
const paths: Record<string, string[]> = {
  storefront: [
    'M3 9.5 4.6 5A1.6 1.6 0 0 1 6.1 4h11.8a1.6 1.6 0 0 1 1.5 1L21 9.5',
    'M3 9.5h18',
    'M4.5 9.5v9A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-9',
    'M9.5 20v-5h5v5',
  ],
  trendingUp: ['M3 17l5.5-5.5 3.5 3.5L21 6', 'M15 6h6v6'],
  users: [
    'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20',
    'M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4',
    'M15.5 4.8a3.5 3.5 0 0 1 0 6.4',
  ],
  receiptCheck: [
    'M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-3-1.7-3 1.7-3-1.7L6 21Z',
    'M9.5 11.5l1.8 1.8 3.5-3.6',
  ],
  shieldCheck: ['M12 3 4.5 6v5.6c0 4.3 3 8.2 7.5 9.4 4.5-1.2 7.5-5.1 7.5-9.4V6L12 3Z', 'M9 12l2.2 2.2L15.4 10'],
  smartphone: ['M7.5 2.5h9A1.5 1.5 0 0 1 18 4v16a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V4a1.5 1.5 0 0 1 1.5-1.5Z', 'M10.5 18.5h3'],
  bank: ['M3 9.5 12 4l9 5.5', 'M4.5 9.5V18', 'M9.5 9.5V18', 'M14.5 9.5V18', 'M19.5 9.5V18', 'M3 20.5h18'],
  lock: ['M6.5 10.5h11A1.5 1.5 0 0 1 19 12v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19v-7a1.5 1.5 0 0 1 1.5-1.5Z', 'M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5'],
  branch: ['M6.5 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M17.5 21.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M6.5 7.5V13a3 3 0 0 0 3 3h8'],
  barChart: ['M4 20.5h16', 'M7 20V12', 'M12 20V5', 'M17 20v-5.5'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7.5V12l3 2'],
  cloud: ['M7 18.5A4 4 0 0 1 7.3 10.6 5.5 5.5 0 0 1 18 11.2a3.6 3.6 0 0 1-.6 7.3H7Z'],
  layers: ['M12 3 3 7.5l9 4.5 9-4.5L12 3Z', 'M3 12.5 12 17l9-4.5', 'M3 17 12 21.5 21 17'],
  sun: ['M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z', 'M12 2v2.5', 'M12 19.5V22', 'M2 12h2.5', 'M19.5 12H22', 'M4.9 4.9l1.8 1.8', 'M17.3 17.3l1.8 1.8', 'M19.1 4.9l-1.8 1.8', 'M6.7 17.3l-1.8 1.8'],
  moon: ['M20 14.2A8.2 8.2 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2Z'],
  arrowRight: ['M4 12h15', 'M13.5 6.5 20 12l-6.5 5.5'],
  play: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M10.2 8.6 15.5 12l-5.3 3.4V8.6Z'],
  check: ['M5 12.5 9.5 17 19 7.5'],
  mail: ['M4.5 5.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5Z', 'M3.5 6.5 12 12.5l8.5-6'],
  refresh: ['M20 12a8 8 0 1 1-2.6-5.9', 'M20 4v4.5h-4.5'],
}

defineProps<{ name: keyof typeof paths | string; size?: number | string }>()
</script>

<template>
  <svg
    class="app-icon"
    :width="size ?? 20"
    :height="size ?? 20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in paths[name] ?? []" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.app-icon {
  flex: none;
}
</style>
