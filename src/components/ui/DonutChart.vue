<script setup lang="ts">
import { computed } from 'vue'

export interface Slice {
  label: string
  value: number
}

const props = defineProps<{ slices: Slice[]; active?: number | null }>()
const emit = defineEmits<{ (e: 'hover', index: number | null): void }>()

const R = 62
const STROKE = 26
const CIRC = 2 * Math.PI * R
const GAP = 2 /* surface gap between segments, in path units */

const total = computed(() => props.slices.reduce((sum, slice) => sum + slice.value, 0))

const segments = computed(() => {
  let offset = 0
  return props.slices.map((slice, index) => {
    const length = (slice.value / total.value) * CIRC
    const segment = {
      ...slice,
      index,
      dash: `${Math.max(length - GAP, 1)} ${CIRC - Math.max(length - GAP, 1)}`,
      offset: -offset,
      percent: Math.round((slice.value / total.value) * 100),
    }
    offset += length
    return segment
  })
})

const short = (value: number) =>
  value >= 1_000_000 ? `${(value / 1_000_000).toFixed(2)}M` : `${Math.round(value / 1_000)}k`
</script>

<template>
  <figure class="donut">
    <svg viewBox="0 0 160 160" role="img" aria-label="Expense breakdown by category">
      <g transform="translate(80 80) rotate(-90)">
        <circle
          v-for="segment in segments"
          :key="segment.label"
          class="seg"
          :class="{ 'seg--dim': active != null && active !== segment.index }"
          :r="R"
          :stroke-dasharray="segment.dash"
          :stroke-dashoffset="segment.offset"
          :style="{ stroke: `var(--chart-${segment.index + 1})` }"
          :stroke-width="STROKE"
          fill="none"
          @mouseenter="emit('hover', segment.index)"
          @mouseleave="emit('hover', null)"
        />
      </g>

      <text class="donut__value" x="80" y="76" text-anchor="middle">
        {{ active != null ? short(slices[active].value) : short(total) }}
      </text>
      <text class="donut__caption" x="80" y="94" text-anchor="middle">
        {{ active != null ? slices[active].label : 'Total expenses' }}
      </text>
    </svg>

    <table class="visually-hidden">
      <caption>Expense breakdown</caption>
      <thead>
        <tr><th scope="col">Category</th><th scope="col">Amount</th><th scope="col">Share</th></tr>
      </thead>
      <tbody>
        <tr v-for="segment in segments" :key="segment.label">
          <td>{{ segment.label }}</td>
          <td>{{ segment.value.toLocaleString('en-KE') }}</td>
          <td>{{ segment.percent }}%</td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>

<style scoped>
.donut {
  margin: 0;
}

svg {
  display: block;
  width: 100%;
  max-width: 220px;
  height: auto;
}

.seg {
  cursor: pointer;
}

.seg--dim {
  opacity: 0.35;
}

.donut__value {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 700;
  fill: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.donut__caption {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 500;
  fill: var(--color-text-secondary);
}
</style>
