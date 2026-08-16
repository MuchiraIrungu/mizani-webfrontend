<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const dashboardFeed = [
  { name: 'Till 5482 — Naivas', meta: 'M-Pesa · 14:22', amount: '+12,400', tag: 'Settled', tone: 'success' },
  { name: 'Kilimani Branch', meta: 'Cash sale · 13:05', amount: '+3,850', tag: 'Posted', tone: '' },
  { name: 'Bidii Suppliers', meta: 'Bank payout · 11:40', amount: '-46,000', tag: 'Cleared', tone: '' },
]

const salesFeed = [
  { ref: 'INV-2043', meta: 'Paybill 400200', amount: '18,900', tag: 'Settled', tone: 'success' },
  { ref: 'INV-2042', meta: 'Till 5482', amount: '7,250', tag: 'Settled', tone: 'success' },
  { ref: 'INV-2041', meta: 'Bank transfer', amount: '52,000', tag: 'Pending', tone: 'warning' },
]

const bars = [38, 54, 42, 66, 51, 78, 61]
</script>

<template>
  <div class="mockups" aria-hidden="true">
    <div class="dot-grid mockups__dots mockups__dots--tr"></div>
    <div class="dot-grid mockups__dots mockups__dots--bl"></div>

    <!-- Back phone — dashboard -->
    <div class="phone phone--back">
      <div class="phone__notch"></div>
      <div class="phone__screen">
        <div class="screen__statusbar"><span>9:41</span><span>KE · 5G</span></div>

        <div class="screen__row">
          <div>
            <p class="screen__hello">Karibu,</p>
            <p class="screen__name">Wanjiku M.</p>
          </div>
          <span class="mini-pill">Westlands</span>
        </div>

        <div class="balance">
          <p class="balance__label">Total balance</p>
          <p class="balance__value">KSh 482,900</p>
          <span class="balance__delta">+12.4% this week</span>
        </div>

        <div class="stat-row">
          <div class="stat">
            <p class="stat__label">Sales today</p>
            <p class="stat__value">38,400</p>
          </div>
          <div class="stat">
            <p class="stat__label">Expenses</p>
            <p class="stat__value">9,120</p>
          </div>
        </div>

        <div class="chart">
          <span v-for="(b, i) in bars" :key="i" class="chart__bar" :style="{ height: b + '%' }"></span>
        </div>

        <ul class="feed">
          <li v-for="row in dashboardFeed" :key="row.name" class="feed__item">
            <div class="feed__main">
              <p class="feed__title">{{ row.name }}</p>
              <p class="feed__meta">{{ row.meta }}</p>
            </div>
            <div class="feed__end">
              <p class="feed__amount">{{ row.amount }}</p>
              <span class="mini-pill" :class="row.tone && `mini-pill--${row.tone}`">{{ row.tag }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Front phone — sales & eTIMS -->
    <div class="phone phone--front">
      <div class="phone__notch"></div>
      <div class="phone__screen">
        <div class="screen__statusbar"><span>9:41</span><span>KE · 5G</span></div>

        <div class="screen__row">
          <p class="screen__title">Sales</p>
          <span class="mini-pill">Today</span>
        </div>

        <div class="tabs">
          <span class="tabs__item tabs__item--active">M-Pesa</span>
          <span class="tabs__item">Cash</span>
          <span class="tabs__item">Bank</span>
        </div>

        <div class="totals">
          <p class="totals__label">Collected · M-Pesa</p>
          <p class="totals__value">KSh 78,150</p>
        </div>

        <ul class="feed">
          <li v-for="row in salesFeed" :key="row.ref" class="feed__item">
            <div class="feed__main">
              <p class="feed__title">{{ row.ref }}</p>
              <p class="feed__meta">{{ row.meta }}</p>
            </div>
            <div class="feed__end">
              <p class="feed__amount">{{ row.amount }}</p>
              <span class="mini-pill" :class="row.tone && `mini-pill--${row.tone}`">{{ row.tag }}</span>
            </div>
          </li>
        </ul>

        <div class="etims">
          <span class="etims__icon"><AppIcon name="check" :size="12" /></span>
          <div>
            <p class="etims__title">eTIMS invoice signed</p>
            <p class="etims__meta">KRA control no. 0042·1187</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mockups {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Structured dot pattern flanking the devices */
.mockups__dots {
  position: absolute;
  width: 132px;
  height: 168px;
}
.mockups__dots--tr {
  top: 8px;
  right: 0;
}
.mockups__dots--bl {
  bottom: 8px;
  left: 0;
}

/* ---- Device frames ---- */
.phone {
  position: relative;
  width: 232px;
  height: 470px;
  border: var(--border-width) solid var(--color-border);
  border-radius: 30px;
  background: var(--color-bg);
  padding: 10px;
}

.phone--back {
  transform: rotate(-7deg) translateX(26px);
  margin-right: -72px;
  z-index: 1;
}

.phone--front {
  transform: rotate(5deg) translate(-26px, 34px);
  z-index: 2;
  border-color: var(--color-primary);
}

.phone__notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 62px;
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--color-border);
}

.phone__screen {
  height: 100%;
  border-radius: 22px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  padding: 22px 12px 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ---- Screen contents ---- */
.screen__statusbar {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.screen__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.screen__hello {
  font-size: 8px;
  margin: 0;
  color: var(--color-text-secondary);
}

.screen__name,
.screen__title {
  font-size: 13px;
  font-weight: 700;
  margin: 0;
  color: var(--color-text-primary);
}

.mini-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  font-size: 7.5px;
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
.mini-pill--success {
  background: var(--color-success-bg);
  border-color: var(--color-success);
  color: var(--color-success);
}
.mini-pill--warning {
  background: var(--color-warning-bg);
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.balance {
  background: var(--color-primary-dark);
  border-radius: 10px;
  padding: 10px;
}
.balance__label {
  margin: 0;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.72);
}
.balance__value {
  margin: 2px 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.balance__delta {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid rgba(255, 255, 255, 0.35);
  font-size: 7.5px;
  font-weight: 600;
  color: #ffffff;
}

.stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.stat {
  border: var(--border-width) solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  padding: 6px 8px;
}
.stat__label {
  margin: 0;
  font-size: 7.5px;
  color: var(--color-text-secondary);
}
.stat__value {
  margin: 1px 0 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 46px;
  padding: 6px;
  border: var(--border-width) solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
}
.chart__bar {
  flex: 1;
  border-radius: 2px;
  background: var(--color-primary-light);
  border: var(--border-width) solid var(--color-primary);
}
.chart__bar:nth-child(6) {
  background: var(--color-primary);
}

.feed {
  list-style: none;
  margin: 0;
  padding: 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
}
.feed__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 7px 8px;
  border-bottom: var(--border-width) solid var(--color-border);
}
.feed__item:last-child {
  border-bottom: none;
}
.feed__title {
  margin: 0;
  font-size: 9px;
  font-weight: 600;
  color: var(--color-text-primary);
}
.feed__meta {
  margin: 0;
  font-size: 7.5px;
  color: var(--color-text-secondary);
}
.feed__end {
  text-align: right;
}
.feed__amount {
  margin: 0 0 2px;
  font-size: 9px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.totals {
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary-light);
  border-radius: 8px;
  padding: 8px 10px;
}
.totals__label {
  margin: 0;
  font-size: 7.5px;
  font-weight: 600;
  color: var(--color-primary);
}
.totals__value {
  margin: 2px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.tabs {
  display: inline-flex;
  align-self: flex-start;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-bg);
  padding: 2px;
  gap: 2px;
}
.tabs__item {
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  font-size: 8px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
.tabs__item--active {
  background: var(--color-primary);
  color: #ffffff;
}

.etims {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  padding: 8px;
  border: var(--border-width) solid var(--color-success);
  border-radius: 8px;
  background: var(--color-success-bg);
}
.etims__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: #ffffff;
}
.etims__title {
  margin: 0;
  font-size: 8.5px;
  font-weight: 700;
  color: var(--color-primary);
}
.etims__meta {
  margin: 0;
  font-size: 7.5px;
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .mockups {
    min-height: 470px;
  }
  .phone {
    width: 208px;
    height: 424px;
  }
}

@media (max-width: 420px) {
  .phone--back {
    transform: rotate(-6deg) translateX(14px);
    margin-right: -52px;
  }
  .phone--front {
    transform: rotate(4deg) translate(-14px, 26px);
  }
  .phone {
    width: 172px;
    height: 366px;
  }
  .mockups__dots {
    width: 92px;
  }
}
</style>
