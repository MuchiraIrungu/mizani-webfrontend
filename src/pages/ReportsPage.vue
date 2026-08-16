<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import LineChart from '../components/ui/LineChart.vue'
import DonutChart from '../components/ui/DonutChart.vue'
import { ranges, type RangeKey } from '../data/reports'
import { money } from '../data/invoices'

const activeKey = ref<RangeKey>('M')
const data = computed(() => ranges.find((range) => range.key === activeKey.value) ?? ranges[1])

const rangeNames: Record<RangeKey, string> = { W: 'Week', M: 'Month', Q: 'Quarter', Y: 'Year' }

const hovered = ref<number | null>(null)

const breakdownTotal = computed(() => data.value.breakdown.reduce((sum, row) => sum + row.value, 0))
const share = (value: number) => Math.round((value / breakdownTotal.value) * 100)

const margin = computed(() =>
  Math.round(((data.value.revenue - data.value.expenses) / data.value.revenue) * 100),
)
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Reports</h1>
        <p class="pagehead__meta">Nairobi Branch · {{ data.caption }}</p>
      </div>

      <div class="pill-tabs">
        <button
          v-for="range in ranges"
          :key="range.key"
          type="button"
          class="pill-tabs__item"
          :class="{ 'pill-tabs__item--active': range.key === activeKey }"
          :aria-label="rangeNames[range.key]"
          @click="activeKey = range.key"
        >
          {{ range.label }}
        </button>
      </div>
    </div>

    <!-- Summary cards -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Revenue</p>
          <span class="pill pill--success">+{{ data.revenueTrend }}%</span>
        </div>
        <p class="summary__value tabular">{{ money(data.revenue) }}</p>
        <p class="summary__note">Against the previous {{ rangeNames[activeKey].toLowerCase() }}</p>
      </article>

      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Expenses</p>
          <span class="pill" :class="data.expensesTrend > 0 ? 'pill--warning' : 'pill--success'">
            {{ data.expensesTrend > 0 ? '+' : '' }}{{ data.expensesTrend }}%
          </span>
        </div>
        <p class="summary__value tabular">{{ money(data.expenses) }}</p>
        <p class="summary__note">Gross margin {{ margin }}% this {{ rangeNames[activeKey].toLowerCase() }}</p>
      </article>
    </section>

    <!-- Charts -->
    <section class="charts">
      <article class="card chartcard">
        <header class="chartcard__head">
          <div>
            <h2 class="chartcard__title">Revenue Trend</h2>
            <p class="chartcard__meta">{{ data.caption }} · KSh</p>
          </div>
          <span class="pill pill--success">+{{ data.revenueTrend }}%</span>
        </header>
        <LineChart :points="data.trend" unit="KSh " />
      </article>

      <article class="card chartcard">
        <header class="chartcard__head">
          <div>
            <h2 class="chartcard__title">Expense Breakdown</h2>
            <p class="chartcard__meta">{{ data.breakdown.length }} categories</p>
          </div>
        </header>

        <div class="breakdown">
          <DonutChart :slices="data.breakdown" :active="hovered" @hover="hovered = $event" />

          <ul class="legend">
            <li
              v-for="(row, index) in data.breakdown"
              :key="row.label"
              class="legend__item"
              :class="{ 'is-active': hovered === index }"
              @mouseenter="hovered = index"
              @mouseleave="hovered = null"
            >
              <span class="legend__swatch" :style="{ background: `var(--chart-${index + 1})` }" aria-hidden="true"></span>
              <span class="legend__label">{{ row.label }}</span>
              <span class="pill legend__pill">{{ share(row.value) }}%</span>
              <span class="legend__value tabular">{{ money(row.value) }}</span>
            </li>
          </ul>
        </div>
      </article>
    </section>

    <div class="export">
      <button class="btn btn-primary btn-export" type="button">
        <AppIcon name="download" :size="16" />
        Export Report (PDF)
      </button>
    </div>
  </AppShell>
</template>

<style scoped>
.pagehead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.pagehead__title {
  font-size: var(--fs-h1);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.pagehead__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.pill-tabs {
  background: var(--color-bg);
}

.pill-tabs__item {
  border: none;
  background: transparent;
  cursor: pointer;
  min-width: 34px;
  text-align: center;
}

/* ---- Summary ---- */
.summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.summary__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.summary__label {
  margin: 0;
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.summary__value {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.summary__note {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

/* ---- Charts ---- */
.charts {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.chartcard {
  display: flex;
  flex-direction: column;
}

.chartcard__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.chartcard__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
}

.chartcard__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.breakdown {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.legend {
  flex: 1;
  min-width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.legend__item {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-2);
  padding: 5px 8px;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-btn);
}

.legend__item.is-active {
  border-color: var(--color-border);
  background: var(--color-surface);
}

.legend__swatch {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.legend__label {
  font-size: var(--fs-small);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend__pill {
  padding: 1px 9px;
  font-size: 11px;
}

.legend__value {
  grid-column: 2 / -1;
  font-size: 11px;
  color: var(--color-text-secondary);
}

/* ---- Export ---- */
.export {
  display: flex;
  justify-content: center;
  padding-bottom: var(--space-3);
}

.btn-export {
  padding: 12px var(--space-5);
}

@media (max-width: 1000px) {
  .charts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .pagehead {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-export {
    width: 100%;
  }
}
</style>
