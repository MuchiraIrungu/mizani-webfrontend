<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'

type Source = 'M-Pesa' | 'Bank' | 'Cash'

interface Txn {
  date: string
  time: string
  details: string
  ref: string
  category: string
  source: Source
  kra: 'Compliant' | 'Pending' | 'Exempt'
  amount: number
}

const transactions: Txn[] = [
  { date: '16 Aug 2026', time: '14:22', details: 'Counter sale — Till 5482', ref: 'INV-2043', category: 'Sales', source: 'M-Pesa', kra: 'Compliant', amount: 18900 },
  { date: '16 Aug 2026', time: '12:05', details: 'Bidii Suppliers — stock order', ref: 'PO-0881', category: 'Purchases', source: 'Bank', kra: 'Compliant', amount: -46000 },
  { date: '16 Aug 2026', time: '10:41', details: 'Counter sale — walk-in', ref: 'INV-2042', category: 'Sales', source: 'Cash', kra: 'Pending', amount: 7250 },
  { date: '15 Aug 2026', time: '17:30', details: 'Paybill collection — Sokoni Ltd', ref: 'INV-2041', category: 'Sales', source: 'M-Pesa', kra: 'Compliant', amount: 52000 },
  { date: '15 Aug 2026', time: '16:12', details: 'KPLC — Westlands meter', ref: 'EXP-0417', category: 'Utilities', source: 'Bank', kra: 'Exempt', amount: -8340 },
  { date: '15 Aug 2026', time: '09:58', details: 'Staff advance — J. Otieno', ref: 'PAY-0139', category: 'Payroll', source: 'M-Pesa', kra: 'Exempt', amount: -12000 },
  { date: '14 Aug 2026', time: '18:44', details: 'Counter sale — Till 5482', ref: 'INV-2040', category: 'Sales', source: 'M-Pesa', kra: 'Compliant', amount: 24610 },
  { date: '14 Aug 2026', time: '15:20', details: 'Mafuta Distributors — fuel', ref: 'EXP-0416', category: 'Logistics', source: 'Cash', kra: 'Pending', amount: -5400 },
  { date: '14 Aug 2026', time: '11:02', details: 'Bank transfer — Karibu Foods', ref: 'INV-2039', category: 'Sales', source: 'Bank', kra: 'Compliant', amount: 96500 },
]

const filters = ['All sources', 'M-Pesa', 'Bank', 'Cash'] as const
const activeFilter = ref<(typeof filters)[number]>('All sources')

const rows = computed(() =>
  activeFilter.value === 'All sources'
    ? transactions
    : transactions.filter((t) => t.source === activeFilter.value),
)

const money = (value: number) =>
  `${value < 0 ? '−' : ''}KSh ${Math.abs(value).toLocaleString('en-KE')}`

const sourceTone: Record<Source, string> = {
  'M-Pesa': 'pill--success',
  Bank: '',
  Cash: 'pill--warning',
}

const kraTone: Record<Txn['kra'], string> = {
  Compliant: 'pill--success',
  Pending: 'pill--warning',
  Exempt: '',
}
</script>

<template>
  <AppShell>
    <!-- Page heading -->
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Dashboard</h1>
        <p class="pagehead__meta">Nairobi Branch · 1 – 31 Aug 2026 · Last synced 14:26 EAT</p>
      </div>
      <div class="pagehead__actions">
        <button class="btn btn-secondary" type="button">
          <AppIcon name="refresh" :size="16" />
          Sync now
        </button>
        <button class="btn btn-secondary" type="button">
          <AppIcon name="download" :size="16" />
          Export
        </button>
      </div>
    </div>

    <!-- Compliance alert -->
    <section class="alert" role="status">
      <span class="alert__icon"><AppIcon name="alert" :size="18" /></span>
      <div class="alert__body">
        <h2 class="alert__title">KRA Filing Deadline Approaching</h2>
        <p class="alert__text">
          Your August VAT return (VAT-3) is due on 20 Sep 2026 — 14 invoices worth KSh 184,300 are still unsigned on
          eTIMS.
        </p>
      </div>
      <button class="alert__action" type="button">Review</button>
    </section>

    <!-- Summary row -->
    <section class="summary">
      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Total Revenue</p>
          <span class="pill pill--success">+12.5%</span>
        </div>
        <p class="summary__value tabular">KSh 2,486,900</p>
        <p class="summary__note">KSh 276,400 above the same period last month</p>
        <dl class="summary__split">
          <div><dt>M-Pesa</dt><dd class="tabular">1,642,300</dd></div>
          <div><dt>Bank</dt><dd class="tabular">618,200</dd></div>
          <div><dt>Cash</dt><dd class="tabular">226,400</dd></div>
        </dl>
      </article>

      <article class="card summary__card">
        <div class="summary__top">
          <p class="summary__label">Operating Costs</p>
          <span class="pill pill--warning">78% of budget</span>
        </div>
        <p class="summary__value tabular">KSh 1,394,150</p>
        <p class="summary__note">Budget for August: KSh 1,780,000</p>
        <div class="meter" aria-hidden="true"><span class="meter__fill" style="width: 78%"></span></div>
        <dl class="summary__split">
          <div><dt>Stock</dt><dd class="tabular">812,000</dd></div>
          <div><dt>Payroll</dt><dd class="tabular">402,150</dd></div>
          <div><dt>Other</dt><dd class="tabular">180,000</dd></div>
        </dl>
      </article>

      <article class="card card--dark summary__card summary__card--dark">
        <div class="summary__top">
          <p class="summary__label summary__label--dark">Estimated KRA Liability</p>
          <span class="pill--onDark">Due 20 Sep</span>
        </div>
        <p class="summary__value summary__value--dark tabular">KSh 318,472</p>
        <p class="summary__note summary__note--dark">VAT 218,940 · PAYE 74,532 · Turnover tax 25,000</p>
        <button class="btn btn-onDark summary__export" type="button">
          <AppIcon name="download" :size="16" />
          Auto-Export
        </button>
      </article>
    </section>

    <!-- Recent transactions -->
    <section class="card panel">
      <header class="panel__head">
        <div>
          <h2 class="panel__title">Recent Transactions</h2>
          <p class="panel__meta">{{ rows.length }} of 214 entries this period</p>
        </div>
        <div class="panel__tools">
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
          <RouterLink class="btn btn-secondary panel__view" to="/sales">View all</RouterLink>
        </div>
      </header>

      <div class="panel__scroll">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Details</th>
              <th scope="col">Category</th>
              <th scope="col">Source</th>
              <th scope="col">KRA Status</th>
              <th scope="col" class="is-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txn in rows" :key="txn.ref">
              <td class="cell-date">
                <span class="cell-date__day">{{ txn.date }}</span>
                <span class="cell-date__time">{{ txn.time }}</span>
              </td>
              <td>
                <span class="cell-details">{{ txn.details }}</span>
                <span class="cell-ref">{{ txn.ref }}</span>
              </td>
              <td class="cell-muted">{{ txn.category }}</td>
              <td><span class="pill" :class="sourceTone[txn.source]">{{ txn.source }}</span></td>
              <td><span class="pill" :class="kraTone[txn.kra]">{{ txn.kra }}</span></td>
              <td class="is-right">
                <span class="cell-amount tabular" :class="{ 'is-credit': txn.amount > 0 }">{{ money(txn.amount) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="panel__foot">
        <p class="panel__meta">Showing 1 – {{ rows.length }} of 214</p>
        <div class="pager">
          <button class="pager__btn" type="button" aria-label="Previous page"><AppIcon name="chevronLeft" :size="15" /></button>
          <button class="pager__btn pager__btn--active" type="button">1</button>
          <button class="pager__btn" type="button">2</button>
          <button class="pager__btn" type="button">3</button>
          <button class="pager__btn" type="button" aria-label="Next page"><AppIcon name="chevronRight" :size="15" /></button>
        </div>
      </footer>
    </section>
  </AppShell>
</template>

<style scoped>
/* ---- Page heading ---- */
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

.pagehead__actions {
  display: flex;
  gap: var(--space-2);
}

.pagehead__actions .btn {
  background: var(--color-bg);
  padding: 8px var(--space-3);
  font-size: var(--fs-small);
}

/* ---- Alert ---- */
.alert {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-4);
  border: var(--border-width) solid var(--color-warning);
  border-radius: var(--radius-card);
  background: var(--color-warning-bg);
}

.alert__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-warning);
  background: var(--color-bg);
  color: var(--color-warning);
}

.alert__body {
  flex: 1;
  min-width: 0;
}

.alert__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
  color: var(--color-warning);
}

.alert__text {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.alert__action {
  flex: none;
  padding: 7px var(--space-4);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-warning);
  background: var(--color-warning);
  color: #ffffff;
  font-size: var(--fs-small);
  font-weight: 600;
  cursor: pointer;
}

.alert__action:hover {
  background: transparent;
  color: var(--color-warning);
}

/* ---- Summary cards ---- */
.summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.summary__card {
  display: flex;
  flex-direction: column;
}

.summary__card--dark {
  border: var(--border-width) solid var(--color-primary-dark);
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

.summary__label--dark {
  color: rgba(255, 255, 255, 0.78);
}

.summary__value {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-text-primary);
}

.summary__value--dark {
  color: #ffffff;
}

.summary__note {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.summary__note--dark {
  color: rgba(255, 255, 255, 0.72);
}

.pill--onDark {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid rgba(255, 255, 255, 0.4);
  font-size: var(--fs-small);
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
}

.btn-onDark {
  margin-top: auto;
  background: #ffffff;
  color: var(--color-primary-dark);
  border-color: #ffffff;
}

.btn-onDark:hover {
  background: transparent;
  color: #ffffff;
}

.summary__export {
  align-self: flex-start;
  margin-top: var(--space-4);
}

.summary__split {
  display: flex;
  margin: var(--space-3) 0 0;
  padding-top: var(--space-3);
  border-top: var(--border-width) solid var(--color-border);
}

.summary__split > div {
  flex: 1;
  padding-right: var(--space-3);
}

.summary__split dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.summary__split dd {
  margin: 2px 0 0;
  font-size: var(--fs-body);
  font-weight: 600;
}

.meter {
  height: 8px;
  margin-top: var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
}

.meter__fill {
  display: block;
  height: 100%;
  background: var(--color-warning);
}

/* ---- Transactions panel ---- */
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

.panel__tools {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.pill-tabs__item {
  border: none;
  background: transparent;
  cursor: pointer;
}

.panel__view {
  padding: 7px var(--space-3);
  font-size: var(--fs-small);
}

.panel__scroll {
  overflow-x: auto;
}

.table {
  min-width: 860px;
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

.cell-date {
  white-space: nowrap;
}

.cell-date__day {
  display: block;
  font-weight: 500;
}

.cell-date__time,
.cell-ref {
  display: block;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.cell-details {
  display: block;
  font-weight: 500;
}

.cell-muted {
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.cell-amount {
  font-weight: 600;
  white-space: nowrap;
}

.cell-amount.is-credit {
  color: var(--color-success);
}

.panel__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
}

.pager {
  display: inline-flex;
  gap: 4px;
}

.pager__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: var(--fs-small);
  font-weight: 500;
  cursor: pointer;
}

.pager__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pager__btn--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

@media (max-width: 1100px) {
  .summary {
    grid-template-columns: 1fr 1fr;
  }

  .summary__card--dark {
    grid-column: span 2;
  }
}

@media (max-width: 780px) {
  .pagehead,
  .panel__head,
  .panel__foot {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary {
    grid-template-columns: 1fr;
  }

  .summary__card--dark {
    grid-column: auto;
  }

  .alert {
    flex-wrap: wrap;
  }
}
</style>
