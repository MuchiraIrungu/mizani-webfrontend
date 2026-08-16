<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const points = [
  { icon: 'clock', text: '11 hours a week returned to owners who drop manual books' },
  { icon: 'receiptCheck', text: 'Every sale invoiced to eTIMS within seconds of payment' },
]
</script>

<template>
  <section class="discover" id="how">
    <div class="container discover__inner">
      <figure class="discover__figure">
        <img
          src="/images/owner-laptop.jpg"
          alt="A Kenyan business owner reviewing her accounts on a laptop"
          width="1200"
          height="1800"
          loading="lazy"
        />
        <figcaption class="discover__caption">
          <span class="pill pill--success">Live since 2021</span>
          <span>Grace runs three branches on Mizani</span>
        </figcaption>
      </figure>

      <div class="discover__body">
        <span class="eyebrow">Discover Mizani</span>
        <h2 class="discover__title">How Mizani Works</h2>

        <p>
          Most Kenyan SMEs still run on carbon-copy receipt books, an M-Pesa statement and a WhatsApp thread with the
          accountant. Records are split across three places, cash sales go unrecorded, and by the time a VAT return or
          a payroll deadline lands, nobody can say with confidence what the business actually earned.
        </p>
        <p>
          Mizani closes that gap. Connect your till, paybill and bank account once, and every transaction lands in one
          ledger the moment it happens. Stock levels move with each sale, payroll draws from the same figures, and your
          eTIMS invoices and PAYE, NSSF and SHA schedules are generated from records that were never re-keyed by hand.
        </p>

        <ul class="discover__points">
          <li v-for="point in points" :key="point.text">
            <span class="discover__pointIcon"><AppIcon :name="point.icon" :size="16" /></span>
            {{ point.text }}
          </li>
        </ul>

        <a class="discover__link" href="#features">
          See the full feature list
          <AppIcon name="arrowRight" :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.discover {
  padding: var(--space-7) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}

.discover__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: var(--space-6);
  align-items: center;
}

.discover__figure {
  margin: 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--color-surface);
}

.discover__figure img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  object-position: center 25%;
}

.discover__caption {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-top: var(--border-width) solid var(--color-border);
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.discover__title {
  font-size: clamp(28px, 3vw, 36px);
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0 0 var(--space-3);
}

.discover__points {
  list-style: none;
  margin: 0 0 var(--space-4);
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.discover__points li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 10px var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  font-size: var(--fs-body);
  font-weight: 500;
}

.discover__pointIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.discover__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: var(--border-width) solid var(--color-primary);
  padding-bottom: 2px;
}

@media (max-width: 900px) {
  .discover__inner {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .discover__figure img {
    height: 320px;
  }
}
</style>
