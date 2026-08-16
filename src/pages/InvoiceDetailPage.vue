<script setup lang="ts">
import { computed } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import {
  invoices,
  invoiceSubtotal,
  invoiceTotal,
  invoiceVat,
  lineTotal,
  money,
  statusTone,
} from '../data/invoices'

const props = defineProps<{ invoiceRef: string }>()

const invoice = computed(() => invoices.find((item) => item.ref === props.invoiceRef))

const paid = computed(() =>
  invoice.value ? invoice.value.payments.reduce((sum, p) => sum + p.amount, 0) : 0,
)
const balance = computed(() => (invoice.value ? invoiceTotal(invoice.value) - paid.value : 0))
</script>

<template>
  <AppShell active="Sales">
    <template v-if="invoice">
      <a class="back" href="#/sales">
        <AppIcon name="chevronLeft" :size="15" />
        All invoices
      </a>

      <div class="pagehead">
        <div>
          <div class="pagehead__row">
            <h1 class="pagehead__title">{{ invoice.ref }}</h1>
            <span class="pill" :class="statusTone[invoice.status]">{{ invoice.status }}</span>
            <span class="pill">eTIMS {{ invoice.etims }}</span>
          </div>
          <p class="pagehead__meta">
            {{ invoice.client }} · Issued {{ invoice.issued }} · {{ invoice.dueNote }}
          </p>
        </div>
        <div class="pagehead__actions">
          <button class="btn btn-secondary" type="button">
            <AppIcon name="download" :size="16" />
            Download PDF
          </button>
          <button class="btn btn-secondary" type="button">
            <AppIcon name="mail" :size="16" />
            Send reminder
          </button>
          <button class="btn btn-primary" type="button">
            <AppIcon name="check" :size="16" />
            Record payment
          </button>
        </div>
      </div>

      <!-- Party + terms -->
      <section class="facts">
        <article class="card fact">
          <h2 class="fact__title">Billed to</h2>
          <p class="fact__strong">{{ invoice.client }}</p>
          <p class="fact__line">{{ invoice.contact }}</p>
          <p class="fact__line">KRA PIN {{ invoice.pin }}</p>
        </article>

        <article class="card fact">
          <h2 class="fact__title">Terms</h2>
          <dl class="fact__grid">
            <div><dt>Issued</dt><dd>{{ invoice.issued }}</dd></div>
            <div><dt>Due</dt><dd>{{ invoice.due }}</dd></div>
            <div><dt>Branch</dt><dd>{{ invoice.branch }}</dd></div>
            <div><dt>Method</dt><dd>{{ invoice.source }}</dd></div>
          </dl>
        </article>

        <article class="card fact fact--balance">
          <h2 class="fact__title">Balance due</h2>
          <p class="fact__amount tabular">{{ money(balance) }}</p>
          <p class="fact__line">
            {{ money(paid) }} received of {{ money(invoiceTotal(invoice)) }}
          </p>
        </article>
      </section>

      <!-- Line items -->
      <section class="card panel">
        <header class="panel__head">
          <div>
            <h2 class="panel__title">Line items</h2>
            <p class="panel__meta">{{ invoice.items.length }} items · VAT applied per line</p>
          </div>
          <button class="btn btn-secondary panel__btn" type="button">
            <AppIcon name="plus" :size="15" />
            Add item
          </button>
        </header>

        <div class="panel__scroll">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col" class="is-right">Qty</th>
                <th scope="col" class="is-right">Unit price</th>
                <th scope="col" class="is-right">VAT</th>
                <th scope="col" class="is-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in invoice.items" :key="item.description">
                <td>
                  <span class="cell-strong">{{ item.description }}</span>
                  <span class="cell-sub">{{ item.detail }}</span>
                </td>
                <td class="is-right tabular">{{ item.qty }}</td>
                <td class="is-right tabular">{{ money(item.unit) }}</td>
                <td class="is-right">
                  <span class="pill">{{ item.vat }}%</span>
                </td>
                <td class="is-right tabular cell-strong">{{ money(lineTotal(item)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="totals">
          <dl class="totals__list">
            <div>
              <dt>Subtotal</dt>
              <dd class="tabular">{{ money(invoiceSubtotal(invoice)) }}</dd>
            </div>
            <div>
              <dt>VAT</dt>
              <dd class="tabular">{{ money(invoiceVat(invoice)) }}</dd>
            </div>
            <div class="totals__grand">
              <dt>Total</dt>
              <dd class="tabular">{{ money(invoiceTotal(invoice)) }}</dd>
            </div>
          </dl>
        </footer>
      </section>

      <!-- Payments -->
      <section class="card panel">
        <header class="panel__head">
          <div>
            <h2 class="panel__title">Payments</h2>
            <p class="panel__meta">Receipts matched against this invoice</p>
          </div>
        </header>

        <div v-if="invoice.payments.length" class="panel__scroll">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Method</th>
                <th scope="col">Reference</th>
                <th scope="col" class="is-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in invoice.payments" :key="payment.reference">
                <td>{{ payment.date }}</td>
                <td>{{ payment.method }}</td>
                <td class="cell-sub cell-sub--inline">{{ payment.reference }}</td>
                <td class="is-right tabular cell-strong">{{ money(payment.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="panel__empty">No payments recorded yet.</p>
      </section>
    </template>

    <section v-else class="card missing">
      <h1 class="missing__title">Invoice not found</h1>
      <p>No invoice matches the reference “{{ invoiceRef }}”.</p>
      <a class="btn btn-secondary" href="#/sales">Back to invoices</a>
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
  flex-wrap: wrap;
}

.pagehead__actions .btn {
  padding: 8px var(--space-3);
  font-size: var(--fs-small);
}

.pagehead__actions .btn-secondary {
  background: var(--color-bg);
}

/* ---- Fact cards ---- */
.facts {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(0, 0.8fr);
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

.fact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2) var(--space-3);
  margin: 0;
}

.fact__grid dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.fact__grid dd {
  margin: 1px 0 0;
  font-size: var(--fs-small);
  font-weight: 600;
}

.fact--balance {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.fact__amount {
  margin: 0 0 2px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

/* ---- Panels ---- */
.panel {
  padding: 0;
  overflow: hidden;
  margin-bottom: var(--space-4);
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

.panel__empty {
  margin: 0;
  padding: var(--space-4);
  font-size: var(--fs-small);
}

.table {
  min-width: 640px;
}

.table th {
  background: var(--color-surface);
  white-space: nowrap;
  padding: 10px var(--space-3);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.is-right {
  text-align: right;
}

.cell-strong {
  display: block;
  font-weight: 600;
  color: var(--color-text-primary);
}

.cell-sub {
  display: block;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.cell-sub--inline {
  font-family: var(--font-sans);
  letter-spacing: 0.02em;
}

/* ---- Totals ---- */
.totals {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
}

.totals__list {
  width: 100%;
  max-width: 320px;
  margin: 0;
}

.totals__list > div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 4px 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.totals__list dd {
  margin: 0;
  font-weight: 600;
  color: var(--color-text-primary);
}

.totals__grand {
  margin-top: var(--space-2);
  padding-top: var(--space-2) !important;
  border-top: var(--border-width) solid var(--color-border);
  font-size: var(--fs-body) !important;
  font-weight: 700;
  color: var(--color-text-primary) !important;
}

.totals__grand dd {
  font-size: var(--fs-h3);
  letter-spacing: -0.02em;
}

/* ---- Missing ---- */
.missing {
  text-align: center;
  padding: var(--space-7) var(--space-4);
}

.missing__title {
  font-size: var(--fs-h2);
  font-weight: 700;
  margin: 0 0 var(--space-2);
}

@media (max-width: 1100px) {
  .facts {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 780px) {
  .pagehead {
    flex-direction: column;
    align-items: flex-start;
  }

  .facts {
    grid-template-columns: 1fr;
  }
}
</style>
