<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import PaySupplierCard from '../components/app/PaySupplierCard.vue'
import { useSuppliersStore } from '../stores/suppliers'
import { money } from '../data/invoices'

const store = useSuppliersStore()
const { items, payments, totalOwed, owingCount, settledCount } = storeToRefs(store)

const filters = ['All', 'Owing', 'Settled'] as const
const activeFilter = ref<(typeof filters)[number]>('All')

/* Largest balance first, settled accounts last. */
const rows = computed(() =>
  [...items.value]
    .filter((supplier) => {
      if (activeFilter.value === 'Owing') return supplier.owed > 0
      if (activeFilter.value === 'Settled') return supplier.owed === 0
      return true
    })
    .sort((a, b) => b.owed - a.owed),
)

const paidToday = computed(() => payments.value.reduce((sum, payment) => sum + payment.amount, 0))

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Suppliers</h1>
        <p class="pagehead__meta">Nairobi Branch · {{ owingCount }} accounts with a balance</p>
      </div>
      <button class="btn btn-secondary pagehead__btn" type="button">
        <AppIcon name="download" :size="16" />
        Payables report
      </button>
    </div>

    <!-- Summary cards -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Total Owed</p>
          <span class="pill pill--warning">{{ owingCount }} to pay</span>
        </div>
        <p class="summary__value tabular">{{ money(totalOwed) }}</p>
        <p class="summary__note">
          {{ payments.length ? `${money(paidToday)} paid in this session` : 'Outstanding across all supplier accounts' }}
        </p>
      </article>

      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Active Suppliers</p>
          <span class="pill pill--success">{{ settledCount }} settled</span>
        </div>
        <p class="summary__value tabular">{{ items.length }}</p>
        <p class="summary__note">Suppliers ordered from in the last 90 days</p>
      </article>
    </section>

    <!-- Supplier list -->
    <section class="card panel">
      <header class="panel__head">
        <div>
          <h2 class="panel__title">Supplier accounts</h2>
          <p class="panel__meta">Sorted by amount owed</p>
        </div>
        <div class="pill-tabs">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="pill-tabs__item"
            :class="{ 'pill-tabs__item--active': filter === activeFilter }"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </header>

      <ul class="list">
        <li v-for="supplier in rows" :key="supplier.id" class="row">
          <span class="row__mark" aria-hidden="true">{{ initials(supplier.name) }}</span>

          <span class="row__main">
            <span class="row__name">{{ supplier.name }}</span>
            <span class="row__meta">{{ supplier.category }} · {{ supplier.terms }} · last order {{ supplier.lastOrder }}</span>
          </span>

          <span v-if="supplier.owed > 0" class="row__amount tabular">{{ money(supplier.owed) }}</span>
          <span v-else class="pill pill--success row__settled">Settled</span>

          <button v-if="supplier.owed > 0" class="paybtn" type="button" @click="store.openPayCard(supplier.id)">
            Pay
          </button>
          <span v-else class="row__spacer" aria-hidden="true"></span>
        </li>
      </ul>
    </section>

    <!-- Pay card -->
    <PaySupplierCard />

    <!-- Floating action -->
    <button class="btn btn-primary fab" type="button">
      <AppIcon name="plus" :size="18" />
      Add Supplier
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
  margin-bottom: var(--space-4);
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

/* ---- List ---- */
.panel {
  padding: 0;
  overflow: hidden;
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.panel__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
}

.panel__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.pill-tabs__item {
  border: none;
  background: transparent;
  cursor: pointer;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto 72px;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.row:last-child {
  border-bottom: none;
}

.row:hover {
  background: var(--color-surface);
}

.row__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: var(--fs-small);
  font-weight: 700;
}

.row__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.row__name {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
}

.row__meta {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row__amount {
  font-size: var(--fs-body);
  font-weight: 700;
  white-space: nowrap;
}

.row__settled {
  justify-self: end;
}

.row__spacer {
  display: block;
}

.paybtn {
  justify-self: end;
  padding: 6px var(--space-4);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary);
  color: #ffffff;
  font-size: var(--fs-small);
  font-weight: 600;
  cursor: pointer;
}

.paybtn:hover {
  background: transparent;
  color: var(--color-primary);
}

/* ---- Floating action ---- */
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

  .row {
    grid-template-columns: 38px minmax(0, 1fr) auto;
    row-gap: var(--space-2);
  }

  .paybtn,
  .row__spacer {
    grid-column: 2 / -1;
    justify-self: start;
  }

  .pagehead,
  .panel__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
