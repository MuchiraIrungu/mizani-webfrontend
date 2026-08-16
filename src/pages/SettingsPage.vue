<script setup lang="ts">
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import MizaniLogo from '../components/ui/MizaniLogo.vue'

const integrations = [
  { icon: 'smartphone', name: 'M-Pesa Till', detail: 'Till 5482 · Buy Goods · Safaricom', status: 'Active' },
  { icon: 'smartphone', name: 'M-Pesa Paybill', detail: 'Paybill 400200 · Account by invoice ref', status: 'Active' },
  { icon: 'bank', name: 'Equity Bank', detail: 'Account ····4471 · Statement feed daily 06:00', status: 'Active' },
  { icon: 'receiptCheck', name: 'KRA eTIMS', detail: 'PIN P051428776K · 2 invoices awaiting control no.', status: 'Fix' },
  { icon: 'cloud', name: 'QuickBooks Export', detail: 'Last export 31 Jul 2026 · Monthly journal', status: 'Active' },
] as const

const staffRows = [
  { icon: 'users', name: 'Manage Staff', detail: '6 staff · 2 pending invitations' },
  { icon: 'lock', name: 'Permissions & Roles', detail: '4 roles · Owner, Manager, Cashier, Accountant' },
] as const
</script>

<template>
  <AppShell>
    <div class="pagehead">
      <h1 class="pagehead__title">Settings</h1>
      <p class="pagehead__meta">Business profile, integrations and access control</p>
    </div>

    <!-- Business profile -->
    <section class="card profile">
      <span class="profile__logo" aria-hidden="true">
        <MizaniLogo :size="44" />
      </span>

      <div class="profile__body">
        <h2 class="profile__name">Mizani Trading Co. Ltd</h2>
        <p class="profile__line">Westlands, Nairobi · 3 branches</p>
        <div class="profile__pills">
          <span class="pill">KRA PIN P051428776K</span>
          <span class="pill">Reg. PVT-8KLM2QP</span>
          <span class="pill pill--success">VAT registered</span>
        </div>
      </div>

      <button class="btn btn-secondary profile__edit" type="button">Edit Profile</button>
    </section>

    <!-- Integrations -->
    <section class="section">
      <header class="section__head">
        <h2 class="section__title">Connected Integrations</h2>
        <RouterLink class="section__link" to="/settings">
          <AppIcon name="plus" :size="14" />
          Add Integration
        </RouterLink>
      </header>

      <ul class="rows">
        <li v-for="item in integrations" :key="item.name" class="card row">
          <span class="row__icon"><AppIcon :name="item.icon" :size="18" /></span>

          <span class="row__main">
            <span class="row__name">{{ item.name }}</span>
            <span class="row__detail">{{ item.detail }}</span>
          </span>

          <span class="pill" :class="item.status === 'Active' ? 'pill--success' : 'pill--danger'">
            {{ item.status }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Staff & roles -->
    <section class="section">
      <header class="section__head">
        <h2 class="section__title">Staff &amp; Roles</h2>
      </header>

      <ul class="rows">
        <li v-for="item in staffRows" :key="item.name">
          <RouterLink class="card row row--link" :to="item.name === 'Manage Staff' ? '/payroll' : '/settings'">
            <span class="row__icon"><AppIcon :name="item.icon" :size="18" /></span>

            <span class="row__main">
              <span class="row__name">{{ item.name }}</span>
              <span class="row__detail">{{ item.detail }}</span>
            </span>

            <AppIcon name="chevronRight" :size="16" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </AppShell>
</template>

<style scoped>
.pagehead {
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

/* ---- Business profile ---- */
.profile {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.profile__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  flex: none;
  border-radius: var(--radius-card);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
}

.profile__logo :deep(.logo__word) {
  display: none;
}

.profile__body {
  flex: 1;
  min-width: 0;
}

.profile__name {
  font-size: var(--fs-h2);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.profile__line {
  margin: 2px 0 var(--space-2);
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.profile__pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.profile__edit {
  flex: none;
  background: var(--color-bg);
}

/* ---- Sections ---- */
.section {
  margin-bottom: var(--space-5);
  padding: 0;
  border: none;
}

.section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.section__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0;
}

.section__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: var(--border-width) solid var(--color-primary);
  padding-bottom: 1px;
}

.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
}

.row--link {
  color: var(--color-text-secondary);
}

.row--link:hover {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.row__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
}

.row__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.row__name {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--color-text-primary);
}

.row__detail {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .profile {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile__edit {
    width: 100%;
  }
}
</style>
