<script setup lang="ts">
import { ref } from 'vue'
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { daysToPayout, deductions, estimatedPayout, netPay, payrollDate, pendingStaff, staff, type Staff } from '../data/payroll'
import { money } from '../data/invoices'

const selected = ref<Staff | null>(null)
const method = ref<'M-Pesa' | 'Bank'>('M-Pesa')
const sent = ref<string[]>([])

function openSheet(person: Staff) {
  selected.value = person
  method.value = person.method
}

function closeSheet() {
  selected.value = null
}

function confirmPayout() {
  if (selected.value && !sent.value.includes(selected.value.id)) sent.value.push(selected.value.id)
  closeSheet()
}

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const statusOf = (person: Staff) =>
  person.status === 'Paid' || sent.value.includes(person.id) ? 'Paid' : 'Pending'
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <div>
        <h1 class="pagehead__title">Payroll</h1>
        <p class="pagehead__meta">August 2026 cycle · {{ staff.length }} staff on the roster</p>
      </div>
      <button class="btn btn-secondary pagehead__btn" type="button">
        <AppIcon name="download" :size="16" />
        Download schedule
      </button>
    </div>

    <!-- Next payout -->
    <section class="card card--accent payout">
      <div class="payout__main">
        <p class="payout__label">Next Payout</p>
        <p class="payout__date">{{ payrollDate }}</p>
        <span class="pill pill--success payout__countdown">In {{ daysToPayout }} days</span>
      </div>

      <div class="payout__figures">
        <div class="payout__figure">
          <p class="payout__figureLabel">Estimated total</p>
          <p class="payout__amount tabular">{{ money(estimatedPayout) }}</p>
        </div>
        <div class="payout__figure">
          <p class="payout__figureLabel">Statutory deductions</p>
          <p class="payout__sub tabular">
            {{ money(pendingStaff.reduce((sum, person) => sum + deductions(person), 0)) }}
          </p>
        </div>
        <div class="payout__figure">
          <p class="payout__figureLabel">Staff to pay</p>
          <p class="payout__sub tabular">{{ pendingStaff.length }}</p>
        </div>
      </div>

      <button class="btn btn-primary payout__action" type="button">
        <AppIcon name="check" :size="16" />
        Run payroll
      </button>
    </section>

    <!-- Staff roster -->
    <header class="roster__head">
      <h2 class="roster__title">Staff Roster</h2>
      <span class="pill pill--warning">{{ staff.filter((p) => statusOf(p) === 'Pending').length }} pending</span>
      <span class="roster__meta">Tap a row to send this month's payout</span>
    </header>

    <ul class="roster">
      <li v-for="person in staff" :key="person.id">
        <button class="person" type="button" @click="openSheet(person)">
          <span class="person__avatar" aria-hidden="true">{{ initials(person.name) }}</span>

          <span class="person__main">
            <span class="person__name">{{ person.name }}</span>
            <span class="person__role">{{ person.role }}</span>
          </span>

          <span class="person__pay">
            <span class="person__net tabular">{{ money(netPay(person)) }}</span>
            <span class="person__netLabel">net pay</span>
          </span>

          <span class="pill person__status" :class="statusOf(person) === 'Paid' ? 'pill--success' : 'pill--warning'">
            {{ statusOf(person) }}
          </span>

          <AppIcon name="chevronRight" :size="16" />
        </button>
      </li>
    </ul>

    <!-- Payout sheet -->
    <div v-if="selected" class="sheet__scrim" @click="closeSheet"></div>
    <aside v-if="selected" class="sheet" role="dialog" aria-modal="true" aria-label="Send payout">
      <header class="sheet__head">
        <div>
          <h2 class="sheet__title">Send payout</h2>
          <p class="sheet__meta">{{ selected.name }} · {{ selected.role }}</p>
        </div>
        <button class="sheet__close" type="button" aria-label="Close" @click="closeSheet">
          <AppIcon name="plus" :size="18" />
        </button>
      </header>

      <div class="sheet__body">
        <div class="sheet__amount">
          <p class="sheet__amountLabel">Amount to send</p>
          <p class="sheet__amountValue tabular">{{ money(netPay(selected)) }}</p>
          <p class="sheet__amountNote">Net of all statutory deductions for August 2026</p>
        </div>

        <div class="field">
          <p class="field__label">Payment method</p>
          <div class="pill-tabs">
            <button
              v-for="option in (['M-Pesa', 'Bank'] as const)"
              :key="option"
              type="button"
              class="pill-tabs__item"
              :class="{ 'pill-tabs__item--active': option === method }"
              @click="method = option"
            >
              {{ option }}
            </button>
          </div>
          <p class="field__hint">
            {{ method === 'M-Pesa' ? `Sending to ${selected.phone}` : `Sending to ${selected.bank}` }}
          </p>
        </div>

        <div class="breakdown">
          <p class="field__label">Deduction breakdown</p>
          <dl class="breakdown__list">
            <div><dt>Gross pay</dt><dd class="tabular">{{ money(selected.gross) }}</dd></div>
            <div><dt>PAYE</dt><dd class="tabular">−{{ money(selected.paye) }}</dd></div>
            <div><dt>NSSF</dt><dd class="tabular">−{{ money(selected.nssf) }}</dd></div>
            <div><dt>SHA</dt><dd class="tabular">−{{ money(selected.sha) }}</dd></div>
            <div><dt>Housing levy</dt><dd class="tabular">−{{ money(selected.housing) }}</dd></div>
            <div class="breakdown__net"><dt>Net pay</dt><dd class="tabular">{{ money(netPay(selected)) }}</dd></div>
          </dl>
        </div>

        <p class="note">
          <span class="note__icon"><AppIcon name="shieldCheck" :size="14" /></span>
          PAYE, NSSF, SHA and the housing levy are calculated automatically at current KRA rates and filed with your
          monthly return — you do not need to work them out.
        </p>
      </div>

      <footer class="sheet__foot">
        <button class="btn btn-secondary" type="button" @click="closeSheet">Cancel</button>
        <button class="btn btn-primary sheet__confirm" type="button" @click="confirmPayout">
          Confirm &amp; Send Payslip
        </button>
      </footer>
    </aside>
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

/* ---- Next payout ---- */
.payout {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  flex-wrap: wrap;
  margin-bottom: var(--space-5);
}

.payout__label {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.payout__date {
  margin: 2px 0 6px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-text-primary);
}

.payout__countdown {
  margin: 0;
}

.payout__figures {
  display: flex;
  gap: var(--space-5);
  margin-left: auto;
  padding-left: var(--space-5);
  border-left: var(--border-width) solid var(--color-border);
}

.payout__figureLabel {
  margin: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.payout__amount {
  margin: 2px 0 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

.payout__sub {
  margin: 2px 0 0;
  font-size: var(--fs-h3);
  font-weight: 600;
}

.payout__action {
  flex: none;
}

/* ---- Roster ---- */
.roster__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.roster__title {
  font-size: var(--fs-h2);
  font-weight: 700;
  margin: 0;
}

.roster__meta {
  margin-left: auto;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.roster {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.person {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto 96px 16px;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  text-align: left;
  cursor: pointer;
}

.person:hover {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.person__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: var(--fs-small);
  font-weight: 700;
}

.person__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.person__name {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
}

.person__role {
  font-size: var(--fs-small);
}

.person__pay {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;
}

.person__net {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--color-text-primary);
}

.person__netLabel {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.person__status {
  justify-self: end;
}

/* ---- Payout sheet ---- */
.sheet__scrim {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(6, 61, 36, 0.45);
}

.sheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 61;
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border-left: var(--border-width) solid var(--color-border);
}

.sheet__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.sheet__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
}

.sheet__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.sheet__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transform: rotate(45deg);
}

.sheet__close:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.sheet__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.sheet__amount {
  padding: var(--space-3) var(--space-4);
  border: var(--border-width) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-primary-light);
}

.sheet__amountLabel {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.sheet__amountValue {
  margin: 2px 0 2px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

.sheet__amountNote {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.field__label {
  margin: 0 0 var(--space-2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.field__hint {
  margin: var(--space-2) 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.pill-tabs__item {
  border: none;
  background: transparent;
  cursor: pointer;
}

.breakdown__list {
  margin: 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.breakdown__list > div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 9px var(--space-3);
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  border-bottom: var(--border-width) solid var(--color-border);
}

.breakdown__list dd {
  margin: 0;
  font-weight: 600;
  color: var(--color-text-primary);
}

.breakdown__net {
  background: var(--color-surface);
  border-bottom: none !important;
  font-weight: 700;
  color: var(--color-text-primary) !important;
}

.note {
  display: flex;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  font-size: var(--fs-small);
}

.note__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.sheet__foot {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
}

.sheet__confirm {
  flex: 1;
}

@media (max-width: 900px) {
  .payout__figures {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
    border-top: var(--border-width) solid var(--color-border);
    padding-top: var(--space-3);
    width: 100%;
  }

  .person {
    grid-template-columns: 40px minmax(0, 1fr) auto;
    row-gap: var(--space-2);
  }

  .person__status {
    grid-column: 2 / -1;
    justify-self: start;
  }

  .person > svg:last-child {
    display: none;
  }
}

@media (max-width: 560px) {
  .payout__figures {
    flex-direction: column;
    gap: var(--space-3);
  }

  .roster__meta {
    display: none;
  }
}
</style>
