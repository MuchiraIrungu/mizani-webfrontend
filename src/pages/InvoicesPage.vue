<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import SalesTabs from '../components/app/SalesTabs.vue'
import { invoices, invoiceTotal, money, statusTone, type InvoiceStatus } from '../data/invoices'

const filters = ['All', 'Pending', 'Overdue', 'Paid'] as const
const activeFilter = ref<(typeof filters)[number]>('All')

const rows = computed(() =>
  activeFilter.value === 'All'
    ? invoices
    : invoices.filter((invoice) => invoice.status === activeFilter.value),
)

const sumBy = (status: InvoiceStatus[]) =>
  invoices.filter((i) => status.includes(i.status)).reduce((sum, i) => sum + invoiceTotal(i), 0)

const countBy = (status: InvoiceStatus[]) => invoices.filter((i) => status.includes(i.status)).length

const outstanding = computed(() => sumBy(['Pending', 'Overdue']))
const overdue = computed(() => sumBy(['Overdue']))
const overdueShare = computed(() =>
  outstanding.value ? Math.round((overdue.value / outstanding.value) * 100) : 0,
)
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Invoices</h1>
        <p class="pagehead__meta">Nairobi Branch · 1 – 31 Aug 2026 · {{ invoices.length }} invoices</p>
      </div>
      <button class="btn btn-primary" type="button">
        <AppIcon name="plus" :size="16" />
        New Invoice
      </button>
    </div>

    <SalesTabs />

    <!-- Summary cards -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Total Outstanding</p>
          <span class="pill">{{ countBy(['Pending', 'Overdue']) }} invoices</span>
        </div>
        <p class="summary__value tabular">{{ money(outstanding) }}</p>
        <p class="summary__note">Across {{ countBy(['Pending']) }} pending and {{ countBy(['Overdue']) }} overdue invoices</p>
      </article>

      <article class="card summary__card summary__card--danger">
        <div class="summary__top">
          <p class="summary__label">Overdue</p>
          <span class="pill pill--danger">{{ overdueShare }}% of outstanding</span>
        </div>
        <p class="summary__value summary__value--danger tabular">{{ money(overdue) }}</p>
        <p class="summary__note">Oldest unpaid invoice is 15 days past its due date</p>
      </article>
    </section>

    <!-- Invoice list -->
    <section class="card panel">
      <header class="panel__head">
        <div>
          <h2 class="panel__title">All invoices</h2>
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

      <ul class="list">
        <li v-for="invoice in rows" :key="invoice.ref">
          <RouterLink class="row" :to="`/sales/invoice/${invoice.ref}`">
            <span class="row__mark" aria-hidden="true">{{ invoice.client.charAt(0) }}</span>

            <span class="row__main">
              <span class="row__client">{{ invoice.client }}</span>
              <span class="row__meta">{{ invoice.ref }} · Due {{ invoice.due }}</span>
            </span>

            <span class="row__note">{{ invoice.dueNote }}</span>

            <span class="row__amount tabular">{{ money(invoiceTotal(invoice)) }}</span>

            <span class="pill row__status" :class="statusTone[invoice.status]">{{ invoice.status }}</span>

            <AppIcon name="chevronRight" :size="16" />
          </RouterLink>
        </li>
      </ul>

      <footer class="panel__foot">
        <p class="panel__meta">Showing {{ rows.length }} of {{ invoices.length }}</p>
        <button class="btn btn-secondary panel__foot-btn" type="button">
          <AppIcon name="download" :size="15" />
          Export list
        </button>
      </footer>
    </section>
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

/* ---- Summary ---- */
.summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: var(--space-4) 0;
}

.summary__card--danger {
  border-color: var(--color-danger);
  background: var(--color-danger-bg);
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

.summary__value--danger {
  color: var(--color-danger);
}

.summary__note {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

/* ---- List panel ---- */
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

.list li {
  border-bottom: var(--border-width) solid var(--color-border);
}

.list li:last-child {
  border-bottom: none;
}

.row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto auto 100px 16px;
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
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: var(--fs-body);
  font-weight: 700;
}

.row__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.row__client {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row__meta {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.row__note {
  font-size: var(--fs-small);
  white-space: nowrap;
}

.row__amount {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.row__status {
  justify-self: end;
}

.panel__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
}

.panel__foot-btn {
  padding: 7px var(--space-3);
  font-size: var(--fs-small);
  background: var(--color-bg);
}

@media (max-width: 900px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .row {
    grid-template-columns: 36px minmax(0, 1fr) auto;
    row-gap: var(--space-2);
  }

  .row__note {
    grid-column: 2 / -1;
    order: 4;
  }

  .row__amount {
    order: 3;
  }

  .row__status {
    order: 5;
    justify-self: start;
  }

  .row > svg:last-child {
    display: none;
  }
}

@media (max-width: 640px) {
  .pagehead {
    flex-direction: column;
    align-items: flex-start;
  }

  .panel__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
