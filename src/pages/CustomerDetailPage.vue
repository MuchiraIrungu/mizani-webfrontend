<script setup lang="ts">
import { computed } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { customers } from '../data/customers'
import { money, statusTone } from '../data/invoices'

const props = defineProps<{ customerId: string }>()

const customer = computed(() => customers.find((item) => item.id === props.customerId))

const lifetime = computed(() =>
  customer.value ? customer.value.purchases.reduce((sum, p) => sum + p.amount, 0) : 0,
)

const sourceTone: Record<string, string> = {
  'M-Pesa': 'pill--success',
  Bank: '',
  Cash: 'pill--warning',
}
</script>

<template>
  <AppShell>
    <template v-if="customer">
      <RouterLink class="back" to="/sales/customers">
        <AppIcon name="chevronLeft" :size="15" />
        All customers
      </RouterLink>

      <div class="pagehead">
        <div>
          <div class="pagehead__row">
            <h1 class="pagehead__title">{{ customer.name }}</h1>
            <span v-if="customer.balance > 0" class="pill pill--warning">{{ money(customer.balance) }} due</span>
            <span v-else class="pill pill--success">Settled</span>
          </div>
          <p class="pagehead__meta">
            Customer since {{ customer.since }} · Last purchase {{ customer.lastPurchase }}
          </p>
        </div>
        <div class="pagehead__actions">
          <button class="btn btn-secondary" type="button">
            <AppIcon name="mail" :size="16" />
            Send statement
          </button>
          <button class="btn btn-primary" type="button">
            <AppIcon name="plus" :size="16" />
            New invoice
          </button>
        </div>
      </div>

      <!-- Account facts -->
      <section class="facts">
        <article class="card fact">
          <h2 class="fact__title">Contact</h2>
          <p class="fact__strong">{{ customer.phone }}</p>
          <p class="fact__line">{{ customer.email }}</p>
          <p class="fact__line">KRA PIN {{ customer.pin }}</p>
        </article>

        <article class="card fact">
          <h2 class="fact__title">Terms</h2>
          <p class="fact__strong">{{ customer.terms }}</p>
          <p class="fact__line">{{ customer.purchases.length }} recorded purchases</p>
          <p class="fact__line">Lifetime value {{ money(lifetime) }}</p>
        </article>

        <article class="card fact" :class="customer.balance > 0 ? 'fact--due' : 'fact--clear'">
          <h2 class="fact__title">Outstanding balance</h2>
          <p class="fact__amount tabular">{{ money(customer.balance) }}</p>
          <p class="fact__line">
            {{ customer.balance > 0 ? 'Across unpaid invoices on this account' : 'No open invoices on this account' }}
          </p>
        </article>
      </section>

      <!-- Purchase history -->
      <section class="card panel">
        <header class="panel__head">
          <div>
            <h2 class="panel__title">Purchase history</h2>
            <p class="panel__meta">{{ customer.purchases.length }} transactions</p>
          </div>
          <button class="btn btn-secondary panel__btn" type="button">
            <AppIcon name="download" :size="15" />
            Export
          </button>
        </header>

        <div class="panel__scroll">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Invoice</th>
                <th scope="col">Details</th>
                <th scope="col">Source</th>
                <th scope="col">Status</th>
                <th scope="col" class="is-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="purchase in customer.purchases" :key="purchase.ref">
                <td class="cell-nowrap">{{ purchase.date }}</td>
                <td>
                  <RouterLink class="cell-link" :to="`/sales/invoice/${purchase.ref}`">{{ purchase.ref }}</RouterLink>
                </td>
                <td class="cell-muted">{{ purchase.details }}</td>
                <td><span class="pill" :class="sourceTone[purchase.source]">{{ purchase.source }}</span></td>
                <td><span class="pill" :class="statusTone[purchase.status]">{{ purchase.status }}</span></td>
                <td class="is-right tabular cell-strong">{{ money(purchase.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="panel__foot">
          <p class="panel__meta">Lifetime value</p>
          <p class="panel__total tabular">{{ money(lifetime) }}</p>
        </footer>
      </section>
    </template>

    <section v-else class="card missing">
      <h1 class="missing__title">Customer not found</h1>
      <p>No customer account matches “{{ customerId }}”.</p>
      <RouterLink class="btn btn-secondary" to="/sales/customers">Back to customers</RouterLink>
    </section>
  </AppShell>
</template>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: var(--space-3);
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.back:hover {
  color: var(--color-primary);
}

.pagehead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.pagehead__row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
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

.pagehead__actions {
  display: flex;
  gap: var(--space-2);
}

.pagehead__actions .btn {
  padding: 8px var(--space-3);
  font-size: var(--fs-small);
}

.pagehead__actions .btn-secondary {
  background: var(--color-bg);
}

/* ---- Facts ---- */
.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.fact__title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2);
}

.fact__strong {
  margin: 0 0 2px;
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--color-text-primary);
}

.fact__line {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.fact--due {
  border-color: var(--color-warning);
  background: var(--color-warning-bg);
}

.fact--due .fact__amount {
  color: var(--color-warning);
}

.fact--clear {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.fact--clear .fact__amount {
  color: var(--color-primary);
}

.fact__amount {
  margin: 0 0 2px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* ---- Panel ---- */
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

.panel__btn {
  padding: 7px var(--space-3);
  font-size: var(--fs-small);
  background: var(--color-bg);
}

.panel__scroll {
  overflow-x: auto;
}

.table {
  min-width: 760px;
}

.table th {
  background: var(--color-surface);
  white-space: nowrap;
  padding: 10px var(--space-3);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover td {
  background: var(--color-surface);
}

.is-right {
  text-align: right;
}

.cell-nowrap {
  white-space: nowrap;
}

.cell-muted {
  color: var(--color-text-secondary);
}

.cell-strong {
  font-weight: 600;
  white-space: nowrap;
}

.cell-link {
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: var(--border-width) solid var(--color-primary);
}

.panel__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
}

.panel__total {
  margin: 0;
  font-size: var(--fs-h3);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.missing {
  text-align: center;
  padding: var(--space-7) var(--space-4);
}

.missing__title {
  font-size: var(--fs-h2);
  font-weight: 700;
  margin: 0 0 var(--space-2);
}

@media (max-width: 1000px) {
  .facts {
    grid-template-columns: 1fr;
  }

  .pagehead {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
