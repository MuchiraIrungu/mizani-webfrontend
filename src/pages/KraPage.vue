<script setup lang="ts">
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { etims, filing, totalDue } from '../data/kra'
import { money } from '../data/invoices'

const syncing = etims.filter((entry) => entry.status === 'Syncing').length
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">KRA</h1>
        <p class="pagehead__meta">{{ filing.period }} · {{ filing.form }} return · Nairobi Branch</p>
      </div>
      <button class="btn btn-secondary pagehead__btn" type="button">
        <AppIcon name="refresh" :size="16" />
        Re-sync eTIMS
      </button>
    </div>

    <!-- Filing alert -->
    <section class="alert" role="status">
      <span class="alert__icon"><AppIcon name="alert" :size="18" /></span>
      <div class="alert__body">
        <h2 class="alert__title">VAT Filing Due</h2>
        <p class="alert__text">
          Your {{ filing.form }} return for {{ filing.period }} must be filed by {{ filing.due }}.
        </p>
      </div>
      <span class="pill pill--warning alert__pill">{{ filing.daysRemaining }} days remaining</span>
      <button class="alert__action" type="button">File now</button>
    </section>

    <!-- Estimated liability -->
    <section class="card liability">
      <header class="liability__head">
        <div>
          <h2 class="liability__title">Estimated Liability</h2>
          <p class="liability__meta">Computed from signed eTIMS invoices for {{ filing.period }}</p>
        </div>
        <span class="pill">Due {{ filing.due }}</span>
      </header>

      <dl class="lines">
        <div class="line">
          <dt>
            <span class="line__name">VAT (16%)</span>
            <span class="line__note">Output tax less input tax on purchases</span>
          </dt>
          <dd class="tabular">{{ money(filing.vat) }}</dd>
        </div>
        <div class="line">
          <dt>
            <span class="line__name">Turnover Tax</span>
            <span class="line__note">3% on non-VAT branch turnover</span>
          </dt>
          <dd class="tabular">{{ money(filing.turnoverTax) }}</dd>
        </div>
        <div class="line line--total">
          <dt><span class="line__name">Total Due</span></dt>
          <dd class="tabular">{{ money(totalDue) }}</dd>
        </div>
      </dl>

      <footer class="liability__foot">
        <p class="liability__note">
          PAYE of {{ money(filing.paye) }} is filed separately with the payroll return.
        </p>
        <button class="btn btn-primary" type="button">
          <AppIcon name="download" :size="16" />
          Export Filing Report
        </button>
      </footer>
    </section>

    <!-- eTIMS compliance -->
    <section class="card panel">
      <header class="panel__head">
        <div>
          <h2 class="panel__title">eTIMS Compliance</h2>
          <p class="panel__meta">{{ etims.length }} invoices in this period · {{ syncing }} still syncing</p>
        </div>
        <div class="pill-tabs">
          <span class="pill-tabs__item pill-tabs__item--active">All</span>
          <span class="pill-tabs__item">Validated</span>
          <span class="pill-tabs__item">Syncing</span>
        </div>
      </header>

      <ul class="list">
        <li v-for="entry in etims" :key="entry.ref">
          <RouterLink class="row" :to="`/sales/invoice/${entry.ref}`">
            <span class="row__main">
              <span class="row__ref">{{ entry.ref }}</span>
              <span class="row__meta">{{ entry.date }} · {{ money(entry.amount) }}</span>
            </span>

            <span class="row__client">{{ entry.client }}</span>

            <span class="row__control">{{ entry.control ? `Control ${entry.control}` : 'Awaiting control no.' }}</span>

            <span class="pill row__status" :class="entry.status === 'Validated' ? 'pill--success' : 'pill--warning'">
              {{ entry.status }}
            </span>
          </RouterLink>
        </li>
      </ul>
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

.pagehead__btn {
  padding: 8px var(--space-3);
  font-size: var(--fs-small);
  background: var(--color-bg);
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

.alert__pill {
  background: var(--color-bg);
  white-space: nowrap;
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

/* ---- Liability ---- */
.liability {
  padding: 0;
  margin-bottom: var(--space-4);
  overflow: hidden;
}

.liability__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.liability__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
}

.liability__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.lines {
  margin: 0;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.line dt {
  display: flex;
  flex-direction: column;
}

.line__name {
  font-size: var(--fs-body);
  font-weight: 600;
}

.line__note {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.line dd {
  margin: 0;
  font-size: var(--fs-h3);
  font-weight: 600;
  white-space: nowrap;
}

.line--total {
  background: var(--color-surface);
}

.line--total .line__name {
  font-size: var(--fs-h3);
  font-weight: 700;
}

.line--total dd {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

.liability__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
}

.liability__note {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

/* ---- eTIMS list ---- */
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
  grid-template-columns: 170px minmax(0, 1fr) auto 110px;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
}

.row:hover {
  background: var(--color-surface);
}

.row__main {
  display: flex;
  flex-direction: column;
}

.row__ref {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
}

.row__meta {
  font-size: var(--fs-small);
}

.row__client {
  font-size: var(--fs-small);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row__control {
  font-size: var(--fs-small);
  white-space: nowrap;
}

.row__status {
  justify-self: end;
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .row__client,
  .row__control {
    grid-column: 1 / -1;
  }

  .liability__foot,
  .panel__head,
  .pagehead {
    flex-direction: column;
    align-items: flex-start;
  }

  .alert {
    flex-wrap: wrap;
  }
}
</style>
