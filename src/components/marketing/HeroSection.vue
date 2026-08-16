<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'
import PhoneMockups from './PhoneMockups.vue'
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">Secure • Compliant • Automated</p>

        <h1 class="hero__title">Run your entire business from one dashboard</h1>

        <p class="hero__sub">
          Mizani ties your M-Pesa till, bank payouts and KRA eTIMS filing into a single ledger — so every sale,
          supplier payment and payroll run is recorded once and reconciled automatically.
        </p>

        <div class="hero__actions">
          <RouterLink class="btn btn-primary btn-lg" to="/register">
            Get Started
            <AppIcon name="arrowRight" :size="18" />
          </RouterLink>
          <a class="btn btn-secondary btn-lg" href="#demo">
            <AppIcon name="play" :size="18" />
            Product Demo
          </a>
        </div>

        <p class="hero__trust">
          <span class="hero__badge"><AppIcon name="shieldCheck" :size="14" /></span>
          Data hosted in-region · KRA eTIMS certified integration · No card required for the 30-day trial
        </p>

        <dl class="hero__stats">
          <div class="hero__stat">
            <dt>2,400+</dt>
            <dd>SMEs onboarded</dd>
          </div>
          <div class="hero__stat">
            <dt>KSh 1.8B</dt>
            <dd>Processed yearly</dd>
          </div>
          <div class="hero__stat">
            <dt>99.9%</dt>
            <dd>Uptime in 2025</dd>
          </div>
        </dl>
      </div>

      <div class="hero__visual">
        <PhoneMockups />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: var(--space-7) 0 var(--space-6);
  border-bottom: var(--border-width) solid var(--color-border);
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--space-6);
  align-items: center;
}

.hero__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.hero__title {
  font-size: clamp(34px, 4.4vw, 52px);
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 700;
  margin: 0 0 var(--space-3);
  max-width: 15ch;
}

.hero__sub {
  font-size: 17px;
  max-width: 54ch;
  margin: 0 0 var(--space-4);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.hero__trust {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4);
  max-width: 52ch;
}

.hero__badge {
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

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin: 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  max-width: 520px;
}

.hero__stat {
  flex: 1 1 140px;
  padding: var(--space-3) var(--space-4);
  border-right: var(--border-width) solid var(--color-border);
}

.hero__stat:last-child {
  border-right: none;
}

.hero__stat dt {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero__stat dd {
  margin: 2px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .hero__title {
    max-width: 20ch;
  }
}

@media (max-width: 560px) {
  .hero {
    padding-top: var(--space-6);
  }

  .hero__stat {
    flex-basis: 100%;
    border-right: none;
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .hero__stat:last-child {
    border-bottom: none;
  }
}
</style>
