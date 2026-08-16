<script setup lang="ts">
import { computed, ref } from 'vue'

export interface Point {
  label: string
  value: number
}

const props = defineProps<{ points: Point[]; unit?: string }>()

/* Geometry in viewBox units — the SVG scales, the strokes stay thin. */
const W = 760
const H = 240
const PAD = { top: 16, right: 16, bottom: 30, left: 58 }

const max = computed(() => {
  const peak = Math.max(...props.points.map((p) => p.value), 1)
  const step = 10 ** Math.floor(Math.log10(peak))
  return Math.ceil(peak / (step / 2)) * (step / 2)
})

const ticks = computed(() => [0, 0.25, 0.5, 0.75, 1].map((f) => max.value * f))

const x = (index: number) =>
  PAD.left +
  (index * (W - PAD.left - PAD.right)) / Math.max(props.points.length - 1, 1)

const y = (value: number) =>
  PAD.top + (1 - value / max.value) * (H - PAD.top - PAD.bottom)

const path = computed(() =>
  props.points.map((point, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(point.value)}`).join(' '),
)

const areaPath = computed(
  () => `${path.value} L${x(props.points.length - 1)} ${H - PAD.bottom} L${x(0)} ${H - PAD.bottom} Z`,
)

const short = (value: number) =>
  value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(1)}M`
    : value >= 1_000
      ? `${Math.round(value / 1_000)}k`
      : `${value}`

const active = ref<number | null>(null)

function onMove(event: MouseEvent) {
  const box = (event.currentTarget as SVGElement).getBoundingClientRect()
  const ratio = (event.clientX - box.left) / box.width
  const position = ratio * W
  let nearest = 0
  props.points.forEach((_, i) => {
    if (Math.abs(x(i) - position) < Math.abs(x(nearest) - position)) nearest = i
  })
  active.value = nearest
}

const tooltipStyle = computed(() => {
  if (active.value === null) return {}
  return { left: `${(x(active.value) / W) * 100}%`, top: `${(y(props.points[active.value].value) / H) * 100}%` }
})
</script>

<template>
  <figure class="chart">
    <div class="chart__plot">
      <svg :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="`Line chart with ${points.length} points`" @mousemove="onMove" @mouseleave="active = null">
        <!-- Grid + y axis -->
        <g class="grid">
          <template v-for="tick in ticks" :key="tick">
            <line :x1="PAD.left" :x2="W - PAD.right" :y1="y(tick)" :y2="y(tick)" />
            <text :x="PAD.left - 10" :y="y(tick) + 4" text-anchor="end">{{ short(tick) }}</text>
          </template>
        </g>

        <!-- X labels -->
        <g class="xlabels">
          <text v-for="(point, i) in points" :key="point.label" :x="x(i)" :y="H - 8" text-anchor="middle">
            {{ point.label }}
          </text>
        </g>

        <!-- Series -->
        <path class="area" :d="areaPath" />
        <path class="line" :d="path" />

        <!-- Crosshair + markers -->
        <g v-if="active !== null" class="cursor">
          <line :x1="x(active)" :x2="x(active)" :y1="PAD.top" :y2="H - PAD.bottom" />
          <circle :cx="x(active)" :cy="y(points[active].value)" r="5" />
        </g>
        <circle class="endpoint" :cx="x(points.length - 1)" :cy="y(points[points.length - 1].value)" r="4" />
      </svg>

      <div v-if="active !== null" class="tip" :style="tooltipStyle">
        <span class="tip__label">{{ points[active].label }}</span>
        <span class="tip__value tabular">{{ unit }}{{ points[active].value.toLocaleString('en-KE') }}</span>
      </div>
    </div>

    <!-- Table fallback -->
    <table class="visually-hidden">
      <caption>Chart data</caption>
      <thead>
        <tr><th scope="col">Period</th><th scope="col">Value</th></tr>
      </thead>
      <tbody>
        <tr v-for="point in points" :key="point.label">
          <td>{{ point.label }}</td>
          <td>{{ unit }}{{ point.value.toLocaleString('en-KE') }}</td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>

<style scoped>
.chart {
  margin: 0;
}

.chart__plot {
  position: relative;
}

svg {
  display: block;
  width: 100%;
  height: auto;
}

.grid line {
  stroke: var(--chart-grid);
  stroke-width: 1;
}

.grid text,
.xlabels text {
  fill: var(--color-text-secondary);
  font-family: var(--font-sans);
  font-size: 11px;
}

.area {
  fill: var(--color-primary-light);
}

.line {
  fill: none;
  stroke: var(--chart-1);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cursor line {
  stroke: var(--color-primary);
  stroke-width: 1;
  stroke-dasharray: 3 3;
}

.cursor circle {
  fill: var(--chart-1);
  stroke: var(--color-bg);
  stroke-width: 2;
}

.endpoint {
  fill: var(--chart-1);
  stroke: var(--color-bg);
  stroke-width: 2;
}

.tip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 10px));
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  pointer-events: none;
  white-space: nowrap;
}

.tip__label {
  font-size: 11px;
  color: var(--color-text-secondary);
}

.tip__value {
  font-size: var(--fs-small);
  font-weight: 700;
}
</style>
