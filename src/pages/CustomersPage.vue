<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import SalesTabs from '../components/app/SalesTabs.vue'
import { customers, totalReceivables, withBalance } from '../data/customers'
import { money } from '../data/invoices'

const filters = ['All', 'With Balance', 'Recent'] as const
const activeFilter = ref<(typeof filters)[number]>('All')
const query = ref('')

const rows = computed(() => {
  const term = query.value.trim().toLowerCase()
  return customers
    .filter((customer) => {
      if (activeFilter.value === 'With Balance') return customer.balance > 0
      if (activeFilter.value === 'Recent') return customer.recent
      return true
    })
    .filter((customer) =>
      term
        ? customer.name.toLowerCase().includes(term) || customer.phone.replace(/\s/g, '').includes(term.replace(/\s/g, ''))
        : true,
    )
})

const initials = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <div class="pagehead__row">
          <h1 class="pagehead__title">Customers</h1>
          <span class="pill">{{ customers.length }} customers</span>
        </div>
        <p class="pagehead__meta">Nairobi Branch · {{ withBalance.length }} carrying a balance</p>
      </div>

      <div class="pagehead__tools">
        <div class="search">
          <AppIcon name="search" :size="16" />
          <input v-model="query" type="search" placeholder="Search name or phone" />
        </div>
        <button class="btn btn-primary pagehead__add" type="button">
          <AppIcon name="plus" :size="16" />
          New Customer
        </button>
      </div>
    </div>

    <SalesTabs />

    <!-- Summary cards -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Total Receivables</p>
          <span class="pill pill--warning">{{ withBalance.length }} owing</span>
        </div>
        <p class="summary__value tabular">{{ money(totalReceivables) }}</p>
        <p class="summary__note">Owed across all open customer accounts</p>
      </article>

      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Active Customers</p>
          <span class="pill pill--success">{{ customers.filter((c) => c.recent).length }} this month</span>
        </div>
        <p class="summary__value tabular">{{ customers.length }}</p>
        <p class="summary__note">Accounts with at least one purchase in the last 90 days</p>
      </article>
    </section>

    <!-- Customer list -->
    <section class="card panel">
      <header class="panel__head">
        <div>
          <h2 class="panel__title">Customer accounts</h2>
          <p class="panel__meta">{{ rows.length }} shown</p>
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

      <ul v-if="rows.length" class="list">
        <li v-for="customer in rows" :key="customer.id">
          <RouterLink class="row" :to="`/sales/customers/${customer.id}`">
            <span class="row__mark" aria-hidden="true">{{ initials(customer.name) }}</span>

            <span class="row__main">
              <span class="row__name">{{ customer.name }}</span>
              <span class="row__meta">{{ customer.phone }} · Last purchase {{ customer.lastPurchase }}</span>
            </span>

            <span v-if="customer.balance > 0" class="pill pill--warning row__pill">
              {{ money(customer.balance) }} due
            </span>
            <span v-else class="pill pill--success row__pill">Settled</span>

            <AppIcon name="chevronRight" :size="16" />
          </RouterLink>
        </li>
      </ul>
      <p v-else class="panel__empty">No customers match “{{ query }}”.</p>
    </section>
  </AppShell>
</template>

<style scoped>
.pagehead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.pagehead__row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.pagehead__title {
  font-size: var(--fs-h1);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.pagehead__meta {
  margin: 4px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.pagehead__tools {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 280px;
  height: 38px;
  padding: 0 var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  color: var(--color-text-secondary);
}

.search:focus-within {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.search input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: var(--fs-small);
  color: var(--color-text-primary);
}

.search input::placeholder {
  color: var(--color-text-secondary);
}

.search input::-webkit-search-cancel-button {
  display: none;
}

.pagehead__add {
  white-space: nowrap;
}

/* ---- Summary ---- */
.summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: var(--space-4) 0;
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

.panel__empty {
  margin: 0;
  padding: var(--space-4);
  font-size: var(--fs-small);
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

.list li {
  border-bottom: var(--border-width) solid var(--color-border);
}

.list li:last-child {
  border-bottom: none;
}

.row {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto 16px;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row__meta {
  font-size: var(--fs-small);
}

.row__pill {
  white-space: nowrap;
}

@media (max-width: 900px) {
  .pagehead {
    flex-direction: column;
    align-items: stretch;
  }

  .pagehead__tools {
    flex-wrap: wrap;
  }

  .search {
    flex: 1;
    width: auto;
  }

  .summary {
    grid-template-columns: 1fr;
  }

  .panel__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
