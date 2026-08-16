<script setup lang="ts">
/** Logo mark + wordmark. `tone="light"` is for use on the dark green band. */
withDefaults(defineProps<{ tone?: 'dark' | 'light'; size?: number }>(), {
  tone: 'dark',
  size: 32,
})
</script>

<template>
  <span class="logo" :class="`logo--${tone}`">
    <svg class="logo__mark" :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" class="logo__plate" />
      <g fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="logo__glyph">
        <path d="M16 9v14.5" />
        <path d="M10.5 23.5h11" />
        <path d="M6 12h20" />
        <path d="M8.5 12v2.5" />
        <path d="M23.5 12v2.5" />
        <path d="M5 14.5a3.5 3.5 0 0 0 7 0z" />
        <path d="M20 14.5a3.5 3.5 0 0 0 7 0z" />
        <circle cx="16" cy="8.6" r="1.5" />
      </g>
    </svg>
    <span class="logo__word">Mizani</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.logo__word {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.logo--dark .logo__plate {
  fill: var(--color-primary);
}
.logo--dark .logo__glyph {
  stroke: #ffffff;
}
.logo--dark .logo__word {
  color: var(--color-text-primary);
}

.logo--light .logo__plate {
  fill: #ffffff;
}
.logo--light .logo__glyph {
  stroke: var(--color-primary-dark);
}
.logo--light .logo__word {
  color: #ffffff;
}

.logo__glyph circle {
  fill: currentColor;
  stroke: none;
}
.logo--dark .logo__glyph circle {
  fill: #ffffff;
}
.logo--light .logo__glyph circle {
  fill: var(--color-primary-dark);
}
</style>
