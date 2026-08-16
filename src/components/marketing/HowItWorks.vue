<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'

const steps = [
  {
    step: '01',
    icon: 'storefront',
    title: 'Create Your Branch',
    body: 'Register the business, add each shop or outlet, and invite staff with the permissions they need. Setup takes under ten minutes.',
  },
  {
    step: '02',
    icon: 'trendingUp',
    title: 'Track Sales & Payments',
    body: 'M-Pesa till, paybill, cash and bank transfers post to one ledger in real time. Stock counts adjust with every receipt.',
  },
  {
    step: '03',
    icon: 'users',
    title: 'Run Payroll',
    body: 'Salaries, PAYE, NSSF and SHA are computed from current rates. Approve once and pay staff straight to M-Pesa or bank.',
  },
  {
    step: '04',
    icon: 'receiptCheck',
    title: 'Stay KRA Compliant',
    body: 'Invoices are signed to eTIMS as they are issued, and VAT and turnover-tax returns are drafted from the same records.',
  },
]
</script>

<template>
  <section class="steps">
    <div class="container">
      <div class="steps__head">
        <div>
          <span class="eyebrow">How it works</span>
          <h2 class="steps__title">Four steps from receipt book to real books</h2>
        </div>
        <p class="lede steps__lede">
          Each step is a module you can switch on when you are ready — nothing has to be migrated all at once.
        </p>
      </div>

      <ol class="steps__grid">
        <li v-for="item in steps" :key="item.step" class="card step">
          <div class="step__top">
            <span class="step__icon"><AppIcon :name="item.icon" :size="20" /></span>
            <span class="step__num">{{ item.step }}</span>
          </div>
          <h3 class="step__title">{{ item.title }}</h3>
          <p class="step__body">{{ item.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  padding: var(--space-7) 0;
  background: var(--color-surface);
  border-bottom: var(--border-width) solid var(--color-border);
}

.steps__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-5);
}

.steps__title {
  font-size: clamp(26px, 2.8vw, 34px);
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0;
  max-width: 18ch;
}

.steps__lede {
  max-width: 44ch;
}

.steps__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-3);
}

.step {
  display: flex;
  flex-direction: column;
}

.step__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.step__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.step__num {
  font-size: var(--fs-small);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
}

.step__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0 0 6px;
}

.step__body {
  margin: 0;
  font-size: var(--fs-small);
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .steps__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .steps__head {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
}

@media (max-width: 560px) {
  .steps__grid {
    grid-template-columns: 1fr;
  }
}
</style>
