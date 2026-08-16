<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const features = [
  {
    icon: 'lock',
    title: 'Money you can account for',
    label: 'Bank-Grade Security',
    tone: 'success',
    body: 'Every entry is written to an append-only ledger with a full audit trail, role-based access and 256-bit encryption at rest.',
  },
  {
    icon: 'smartphone',
    title: 'Payments reconcile themselves',
    label: 'M-Pesa Integrated',
    tone: 'success',
    body: 'Till and paybill callbacks match to invoices automatically, so you stop cross-checking SMS confirmations line by line.',
  },
  {
    icon: 'receiptCheck',
    title: 'Filing without the last-minute rush',
    label: 'KRA eTIMS Certified',
    tone: 'success',
    body: 'Signed invoices, VAT schedules and turnover-tax summaries are produced continuously, not rebuilt the week they are due.',
  },
  {
    icon: 'bank',
    title: 'Payouts from the same ledger',
    label: 'Bank & Wallet Payouts',
    tone: '',
    body: 'Pay suppliers and staff by bank transfer or mobile money, with approvals, limits and a reference on every disbursement.',
  },
  {
    icon: 'branch',
    title: 'Built for more than one shop',
    label: 'Multi-Branch Ready',
    tone: '',
    body: 'Compare branches side by side, move stock between them, and give each manager only the figures they are meant to see.',
  },
  {
    icon: 'cloud',
    title: 'Works on the network you have',
    label: 'Offline Capable',
    tone: 'warning',
    body: 'Record sales when the connection drops; entries queue on the device and sync in order as soon as you are back online.',
  },
]
</script>

<template>
  <section class="why" id="features">
    <div class="container">
      <div class="section-head section-head--center why__head">
        <span class="eyebrow">Why choose us</span>
        <h2 class="why__title">The Modern Operating System for Kenyan SMEs</h2>
        <p class="lede">
          One system for sales, stock, staff and statutory filing — priced for a business that counts every shilling,
          and built around the way money actually moves in Kenya.
        </p>
      </div>

      <div class="why__grid">
        <article v-for="item in features" :key="item.title" class="card why__card">
          <span class="why__icon"><AppIcon :name="item.icon" :size="20" /></span>
          <h3 class="why__cardTitle">{{ item.title }}</h3>
          <span class="pill" :class="item.tone && `pill--${item.tone}`">{{ item.label }}</span>
          <p class="why__body">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why {
  padding: var(--space-7) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}

.why__head {
  margin-bottom: var(--space-5);
}

.why__title {
  font-size: clamp(26px, 3vw, 36px);
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0 0 var(--space-2);
}

.why__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
}

.why__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.why__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.why__cardTitle {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0 0 var(--space-2);
}

.why__body {
  margin: var(--space-2) 0 0;
  font-size: var(--fs-small);
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .why__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
