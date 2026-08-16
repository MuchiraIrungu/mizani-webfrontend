<script setup lang="ts">
import MizaniLogo from '../ui/MizaniLogo.vue'
import AppIcon from '../ui/AppIcon.vue'

defineProps<{ active: string; open?: boolean }>()
defineEmits<{ (e: 'close'): void }>()

/* Order is locked by the design system — do not re-sort. */
const nav = [
  { label: 'Dashboard', icon: 'grid', href: '#/dashboard' },
  { label: 'Sales', icon: 'trendingUp', href: '#/sales' },
  { label: 'Inventory', icon: 'box', href: '#/inventory' },
  { label: 'Payroll', icon: 'users', href: '#/payroll' },
  { label: 'KRA', icon: 'receiptCheck', href: '#/kra', badge: '2' },
  { label: 'Suppliers', icon: 'truck', href: '#/suppliers' },
  { label: 'Reports', icon: 'barChart', href: '#/reports' },
  { label: 'Settings', icon: 'settings', href: '#/settings' },
]
</script>

<template>
  <aside class="sidebar" :class="{ 'is-open': open }">
    <div class="sidebar__top">
      <a class="sidebar__brand" href="#/dashboard">
        <MizaniLogo tone="light" :size="30" />
      </a>

      <button class="sidebar__add" type="button">
        <AppIcon name="plus" :size="16" />
        Add Transaction
      </button>
    </div>

    <nav class="sidebar__nav" aria-label="Main">
      <a
        v-for="item in nav"
        :key="item.label"
        class="navitem"
        :class="{ 'navitem--active': item.label === active }"
        :href="item.href"
        :aria-current="item.label === active ? 'page' : undefined"
        @click="$emit('close')"
      >
        <AppIcon :name="item.icon" :size="18" />
        <span class="navitem__label">{{ item.label }}</span>
        <span v-if="item.badge" class="navitem__badge">{{ item.badge }}</span>
      </a>
    </nav>

    <div class="profile">
      <span class="profile__avatar" aria-hidden="true">WM</span>
      <span class="profile__text">
        <span class="profile__name">Wanjiku Mwangi</span>
        <span class="profile__role">Owner · Nairobi</span>
      </span>
      <button class="profile__action" type="button" aria-label="Sign out">
        <AppIcon name="logout" :size="16" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  background: var(--sidebar-bg);
  color: #ffffff;
  z-index: 50;
}

.sidebar__top {
  padding: var(--space-4) var(--space-3) var(--space-3);
  border-bottom: var(--border-width) solid var(--sidebar-border);
}

.sidebar__brand {
  display: inline-flex;
  margin-bottom: var(--space-3);
}

.sidebar__add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: 9px var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid #ffffff;
  background: #ffffff;
  color: var(--sidebar-bg);
  font-weight: 600;
  font-size: var(--fs-body);
  cursor: pointer;
}

.sidebar__add:hover {
  background: transparent;
  color: #ffffff;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.navitem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 9px 11px;
  border-radius: var(--radius-btn);
  border: var(--border-width) solid transparent;
  color: var(--sidebar-text);
  font-size: var(--fs-body);
  font-weight: 500;
}

.navitem:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #ffffff;
}

.navitem--active {
  background: var(--sidebar-active);
  border-color: var(--sidebar-border);
  color: #ffffff;
  font-weight: 600;
}

.navitem__label {
  flex: 1;
}

.navitem__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid rgba(255, 255, 255, 0.35);
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
}

.profile {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-top: var(--border-width) solid var(--sidebar-border);
}

.profile__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--sidebar-border);
  background: rgba(255, 255, 255, 0.1);
  font-size: var(--fs-small);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.profile__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.profile__name {
  font-size: var(--fs-small);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile__role {
  font-size: 11px;
  color: var(--sidebar-text);
}

.profile__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--sidebar-border);
  background: transparent;
  color: var(--sidebar-text);
  cursor: pointer;
}

.profile__action:hover {
  color: #ffffff;
  border-color: #ffffff;
}

@media (max-width: 960px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.18s ease-out;
    border-right: var(--border-width) solid var(--sidebar-border);
  }

  .sidebar.is-open {
    transform: none;
  }
}
</style>
