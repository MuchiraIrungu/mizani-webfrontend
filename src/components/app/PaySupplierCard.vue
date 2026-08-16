<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import AppIcon from '../ui/AppIcon.vue'
import { useSuppliersStore, type PayMethod } from '../../stores/suppliers'
import { money } from '../../data/invoices'

const store = useSuppliersStore()
const { payingSupplier, status, error, lastPayment } = storeToRefs(store)

const methods: PayMethod[] = ['M-Pesa', 'Bank']
const method = ref<PayMethod>('M-Pesa')
const amount = ref(0)
const note = ref('')

/* Re-arm the form whenever the card opens for a different supplier. */
watch(
  payingSupplier,
  (supplier) => {
    if (!supplier) return
    method.value = 'M-Pesa'
    amount.value = supplier.owed
    note.value = `Payment for ${supplier.name}`
  },
  { immediate: true },
)

const destination = computed(() =>
  payingSupplier.value ? store.destinationFor(payingSupplier.value, method.value) : '',
)

const remaining = computed(() =>
  payingSupplier.value ? Math.max(payingSupplier.value.owed - (amount.value || 0), 0) : 0,
)

const canSubmit = computed(
  () =>
    Boolean(payingSupplier.value) &&
    amount.value > 0 &&
    amount.value <= (payingSupplier.value?.owed ?? 0) &&
    status.value !== 'processing',
)

function payFull() {
  if (payingSupplier.value) amount.value = payingSupplier.value.owed
}

async function submit() {
  if (!payingSupplier.value) return
  await store.paySupplier({
    supplierId: payingSupplier.value.id,
    method: method.value,
    amount: amount.value,
    note: note.value,
  })
}
</script>

<template>
  <div v-if="payingSupplier" class="pay__scrim" @click="store.closePayCard()"></div>

  <div
    v-if="payingSupplier"
    class="card pay"
    role="dialog"
    aria-modal="true"
    :aria-label="`Pay ${payingSupplier.name}`"
  >
    <!-- Head -->
    <header class="pay__head">
      <div>
        <p class="pay__eyebrow">Pay supplier</p>
        <h2 class="pay__title">{{ payingSupplier.name }}</h2>
        <p class="pay__meta">{{ payingSupplier.category }} · {{ payingSupplier.terms }}</p>
      </div>
      <button class="pay__close" type="button" aria-label="Close" @click="store.closePayCard()">
        <AppIcon name="plus" :size="18" />
      </button>
    </header>

    <!-- Confirmation -->
    <div v-if="status === 'succeeded' && lastPayment" class="pay__body">
      <div class="receipt">
        <span class="receipt__icon"><AppIcon name="check" :size="18" /></span>
        <p class="receipt__amount tabular">{{ money(lastPayment.amount) }} sent</p>
        <p class="receipt__meta">{{ lastPayment.method }} · {{ lastPayment.destination }}</p>
      </div>

      <dl class="rows">
        <div><dt>Confirmation</dt><dd>{{ lastPayment.reference }}</dd></div>
        <div><dt>Sent</dt><dd>{{ lastPayment.paidAt }}</dd></div>
        <div><dt>Note</dt><dd>{{ lastPayment.note || '—' }}</dd></div>
        <div class="rows__total">
          <dt>Balance remaining</dt>
          <dd class="tabular">{{ money(payingSupplier.owed) }}</dd>
        </div>
      </dl>

      <p class="hint">
        The payment is posted to the ledger and matched against this supplier's open bills.
      </p>
    </div>

    <!-- Form -->
    <div v-else class="pay__body">
      <div class="due">
        <p class="due__label">Amount due</p>
        <p class="due__value tabular">{{ money(payingSupplier.owed) }}</p>
        <p class="due__meta">Last order {{ payingSupplier.lastOrder }}</p>
      </div>

      <div class="field">
        <p class="field__label">Payment method</p>
        <div class="pill-tabs">
          <button
            v-for="option in methods"
            :key="option"
            type="button"
            class="pill-tabs__item"
            :class="{ 'pill-tabs__item--active': option === method }"
            @click="method = option"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Saved details for the chosen method -->
      <div class="details">
        <div class="details__head">
          <p class="field__label">Paying to</p>
          <span class="pill">Saved details</span>
        </div>

        <dl v-if="method === 'M-Pesa'" class="rows">
          <div><dt>Type</dt><dd>{{ payingSupplier.mpesa.kind }}</dd></div>
          <div><dt>{{ payingSupplier.mpesa.kind === 'Send Money' ? 'Phone' : 'Number' }}</dt><dd class="tabular">{{ payingSupplier.mpesa.number }}</dd></div>
          <div v-if="payingSupplier.mpesa.account"><dt>Account ref</dt><dd>{{ payingSupplier.mpesa.account }}</dd></div>
          <div><dt>Registered name</dt><dd>{{ payingSupplier.mpesa.name }}</dd></div>
        </dl>

        <dl v-else class="rows">
          <div><dt>Bank</dt><dd>{{ payingSupplier.bank.bank }}</dd></div>
          <div><dt>Account</dt><dd class="tabular">{{ payingSupplier.bank.account }}</dd></div>
          <div><dt>Branch</dt><dd>{{ payingSupplier.bank.branch }}</dd></div>
          <div><dt>Account name</dt><dd>{{ payingSupplier.bank.name }}</dd></div>
        </dl>

        <p class="form-hint details__dest">Funds go to {{ destination }}.</p>
      </div>

      <div class="form-field">
        <div class="field__row">
          <label class="form-label" for="pay-amount">Amount to pay</label>
          <button class="linkbtn" type="button" @click="payFull">Pay full balance</button>
        </div>
        <div class="amount">
          <span class="amount__prefix">KSh</span>
          <input
            id="pay-amount"
            v-model.number="amount"
            class="form-input amount__input"
            type="number"
            min="1"
            :max="payingSupplier.owed"
            step="1"
            inputmode="numeric"
          />
        </div>
        <p class="form-hint">
          Balance after this payment: <strong>{{ money(remaining) }}</strong>
        </p>
      </div>

      <div class="form-field">
        <label class="form-label" for="pay-note">Note / reference</label>
        <input id="pay-note" v-model="note" class="form-input" type="text" maxlength="60" />
      </div>

      <p v-if="status === 'failed' && error" class="form-notice form-notice--danger">
        <AppIcon name="alert" :size="15" />
        {{ error }}
      </p>

      <p class="hint">
        <span class="hint__icon"><AppIcon name="shieldCheck" :size="13" /></span>
        Sent from your {{ method === 'M-Pesa' ? 'M-Pesa business account' : 'settlement bank account' }} and
        recorded against this supplier automatically.
      </p>
    </div>

    <!-- Foot -->
    <footer class="pay__foot">
      <template v-if="status === 'succeeded'">
        <button class="btn btn-primary pay__confirm" type="button" @click="store.closePayCard()">Done</button>
      </template>
      <template v-else>
        <button class="btn btn-secondary" type="button" @click="store.closePayCard()">Cancel</button>
        <button class="btn btn-primary pay__confirm" type="button" :disabled="!canSubmit" @click="submit">
          <AppIcon v-if="status !== 'processing'" name="check" :size="16" />
          {{ status === 'processing' ? 'Sending…' : `Pay ${money(amount || 0)}` }}
        </button>
      </template>
    </footer>
  </div>
</template>

<style scoped>
.pay__scrim {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(6, 61, 36, 0.45);
}

.pay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 61;
  width: min(460px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

/* ---- Head ---- */
.pay__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: var(--border-width) solid var(--color-border);
}

.pay__eyebrow {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.pay__title {
  margin: 2px 0 0;
  font-size: var(--fs-h2);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.pay__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.pay__close {
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

.pay__close:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* ---- Body ---- */
.pay__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.due {
  padding: var(--space-3) var(--space-4);
  border: var(--border-width) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-primary-light);
}

.due__label {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.due__value {
  margin: 2px 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

.due__meta {
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

.field__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
}

.pill-tabs__item {
  border: none;
  background: transparent;
  cursor: pointer;
  min-width: 82px;
  text-align: center;
}

.details__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.details__head .field__label {
  margin-bottom: 0;
}

.rows {
  margin: var(--space-2) 0 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.rows > div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 9px var(--space-3);
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  border-bottom: var(--border-width) solid var(--color-border);
}

.rows > div:last-child {
  border-bottom: none;
}

.rows dd {
  margin: 0;
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: right;
}

.rows__total {
  background: var(--color-surface);
  font-weight: 700;
  color: var(--color-text-primary) !important;
}

.details__dest {
  margin: var(--space-2) 0 0;
}

.amount {
  display: flex;
  align-items: center;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  overflow: hidden;
}

.amount:focus-within {
  border-color: var(--color-primary);
}

.amount__prefix {
  padding: 0 var(--space-3);
  font-size: var(--fs-small);
  font-weight: 700;
  color: var(--color-text-secondary);
  border-right: var(--border-width) solid var(--color-border);
  align-self: stretch;
  display: flex;
  align-items: center;
}

.amount__input {
  border: none;
  border-radius: 0;
  font-size: var(--fs-h3);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.amount__input:focus {
  border: none;
}

.linkbtn {
  border: none;
  background: transparent;
  padding: 0;
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: var(--border-width) solid var(--color-primary);
  cursor: pointer;
}

.hint {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.hint__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

/* ---- Receipt ---- */
.receipt {
  text-align: center;
  padding: var(--space-4);
  border: var(--border-width) solid var(--color-success);
  border-radius: var(--radius-card);
  background: var(--color-success-bg);
}

.receipt__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: #ffffff;
}

.receipt__amount {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-primary);
}

.receipt__meta {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

/* ---- Foot ---- */
.pay__foot {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
}

.pay__confirm {
  flex: 1;
}

.pay__confirm:disabled {
  opacity: 0.55;
  cursor: default;
}
</style>
