<script setup lang="ts">
import { computed } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { categories, isLow, items, lowStockCount } from '../data/inventory'

const grouped = computed(() =>
  categories.map((category) => ({
    category,
    rows: items.filter((item) => item.category === category),
  })),
)

const lowInGroup = (rows: typeof items) => rows.filter(isLow).length
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Inventory</h1>
        <p class="pagehead__meta">
          Nairobi Branch · {{ categories.length }} categories · counted 16 Aug 2026
        </p>
      </div>
      <button class="btn btn-secondary pagehead__btn" type="button">
        <AppIcon name="download" :size="16" />
        Stock report
      </button>
    </div>

    <!-- Summary cards -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Total Items</p>
          <span class="pill">{{ categories.length }} categories</span>
        </div>
        <p class="summary__value tabular">{{ items.length }}</p>
        <p class="summary__note">Distinct SKUs tracked at this branch</p>
      </article>

      <article class="card summary__card summary__card--warn">
        <div class="summary__top">
          <p class="summary__label">Low Stock</p>
          <span class="pill pill--warning">{{ lowStockCount }} to reorder</span>
        </div>
        <p class="summary__value summary__value--warn tabular">{{ lowStockCount }}</p>
        <p class="summary__note">Items at or below their reorder level</p>
      </article>
    </section>

    <!-- Grouped item list -->
    <section v-for="group in grouped" :key="group.category" class="group">
      <header class="group__head">
        <h2 class="group__label">{{ group.category }}</h2>
        <span class="group__count">{{ group.rows.length }} items</span>
        <span v-if="lowInGroup(group.rows)" class="pill pill--warning">
          {{ lowInGroup(group.rows) }} to reorder
        </span>
      </header>

      <ul class="items">
        <li v-for="item in group.rows" :key="item.sku" class="card item">
          <span class="item__mark" aria-hidden="true"><AppIcon name="box" :size="18" /></span>

          <span class="item__main">
            <span class="item__name">{{ item.name }}</span>
            <span class="item__meta">{{ item.sku }} · {{ item.supplier }}</span>
          </span>

          <span class="item__units">
            <span class="item__count tabular">{{ item.units }}</span>
            <span class="item__unitLabel">{{ item.unitLabel }}</span>
          </span>

          <span class="pill item__status" :class="isLow(item) ? 'pill--warning' : 'pill--success'">
            {{ isLow(item) ? 'Reorder' : 'In Stock' }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Floating action -->
    <button class="btn btn-primary fab" type="button">
      <AppIcon name="plus" :size="18" />
      Add Product
    </button>
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

.pagehead__btn {
  padding: 8px var(--space-3);
  font-size: var(--fs-small);
  background: var(--color-bg);
}

/* ---- Summary ---- */
.summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.summary__card--warn {
  border-color: var(--color-warning);
  background: var(--color-warning-bg);
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

.summary__value--warn {
  color: var(--color-warning);
}

.summary__note {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

/* ---- Category groups ---- */
.group {
  margin-bottom: var(--space-5);
}

.group__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.group__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin: 0;
}

.group__count {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  margin-right: auto;
}

.items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.item {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto 108px;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
}

.item:hover {
  background: var(--color-surface);
}

.item__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
}

.item__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item__name {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item__meta {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.item__units {
  display: flex;
  align-items: baseline;
  gap: 5px;
  white-space: nowrap;
}

.item__count {
  font-size: var(--fs-h3);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.item__unitLabel {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.item__status {
  justify-self: end;
}

/* ---- Floating action button ---- */
.fab {
  position: fixed;
  right: var(--space-4);
  bottom: var(--space-4);
  z-index: 30;
  border-color: var(--color-primary-dark);
  padding: 12px var(--space-4);
}

@media (max-width: 780px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .item {
    grid-template-columns: 38px minmax(0, 1fr) auto;
    row-gap: var(--space-2);
  }

  .item__status {
    grid-column: 2 / -1;
    justify-self: start;
  }
}
</style>
