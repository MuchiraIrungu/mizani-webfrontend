<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import HomePage from './pages/HomePage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import InvoicesPage from './pages/InvoicesPage.vue'
import InvoiceDetailPage from './pages/InvoiceDetailPage.vue'
import ModulePage from './pages/ModulePage.vue'

/**
 * Minimal hash routing — the marketing site lives at the root, every
 * logged-in screen sits under `#/`. Swap for vue-router when the app grows.
 */
const appRoutes: Record<string, string> = {
  '#/dashboard': 'Dashboard',
  '#/sales': 'Sales',
  '#/inventory': 'Inventory',
  '#/payroll': 'Payroll',
  '#/kra': 'KRA',
  '#/suppliers': 'Suppliers',
  '#/reports': 'Reports',
  '#/settings': 'Settings',
}

const hash = ref(window.location.hash)

function onHashChange() {
  hash.value = window.location.hash
  if (hash.value.startsWith('#/')) window.scrollTo({ top: 0 })
}

onMounted(() => window.addEventListener('hashchange', onHashChange))
onBeforeUnmount(() => window.removeEventListener('hashchange', onHashChange))

const activeModule = computed(() => appRoutes[hash.value] ?? null)

/** `#/sales/INV-2043` — an invoice opened from the Sales list. */
const invoiceRef = computed(() => {
  const match = hash.value.match(/^#\/sales\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
})
</script>

<template>
  <DashboardPage v-if="activeModule === 'Dashboard'" />
  <InvoicesPage v-else-if="activeModule === 'Sales'" />
  <InvoiceDetailPage v-else-if="invoiceRef" :invoice-ref="invoiceRef" />
  <ModulePage v-else-if="activeModule" :name="activeModule" />
  <HomePage v-else />
</template>
