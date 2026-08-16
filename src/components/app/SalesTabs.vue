<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

/** Sub-navigation inside the Sales module. The sidebar itself never changes. */
const tabs = [
  { label: 'Invoices', to: '/sales' },
  { label: 'Customers', to: '/sales/customers' },
]

const route = useRoute()
const active = computed(() => (route.path.startsWith('/sales/customers') ? 'Customers' : 'Invoices'))
</script>

<template>
  <div class="pill-tabs subnav">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.label"
      class="pill-tabs__item"
      :class="{ 'pill-tabs__item--active': tab.label === active }"
      :to="tab.to"
      :aria-current="tab.label === active ? 'page' : undefined"
    >
      {{ tab.label }}
    </RouterLink>
  </div>
</template>

<style scoped>
.subnav {
  background: var(--color-bg);
}
</style>
