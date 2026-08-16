<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import PillSelect from '../ui/PillSelect.vue'
import { useTheme } from '../../composables/useTheme'

defineEmits<{ (e: 'toggle-nav'): void }>()

const { theme, toggleTheme } = useTheme()

const branch = ref('Nairobi Branch')
const branches = ['Nairobi Branch', 'Westlands Branch', 'Mombasa Road Branch', 'All branches']

const range = ref('1 – 31 Aug 2026')
const ranges = ['Today', 'This week', '1 – 31 Aug 2026', 'Last 90 days', 'Year to date']

const query = ref('')
</script>

<template>
  <header class="topbar">
    <button class="iconbtn topbar__nav" type="button" aria-label="Open navigation" @click="$emit('toggle-nav')">
      <AppIcon name="filter" :size="18" />
    </button>

    <PillSelect v-model="branch" :options="branches" icon="storefront" label="Select branch" />
    <PillSelect v-model="range" :options="ranges" icon="calendar" label="Select date range" />

    <div class="search">
      <AppIcon name="search" :size="16" />
      <input v-model="query" type="search" placeholder="Search transactions, invoices, suppliers" />
      <kbd class="search__kbd">/</kbd>
    </div>

    <button class="iconbtn" type="button" :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggleTheme">
      <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
    </button>

    <button class="iconbtn iconbtn--bell" type="button" aria-label="Notifications (3 unread)">
      <AppIcon name="bell" :size="18" />
      <span class="iconbtn__dot" aria-hidden="true"></span>
    </button>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--topbar-h);
  padding: 0 var(--space-4);
  background: var(--color-bg);
  border-bottom: var(--border-width) solid var(--color-border);
}

.topbar__nav {
  display: none;
}

.search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
  max-width: 420px;
  margin-left: auto;
  padding: 0 var(--space-3);
  height: 36px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  color: var(--color-text-secondary);
}

.search:focus-within {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.search input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: var(--fs-small);
  color: var(--color-text-primary);
}

.search input::placeholder {
  color: var(--color-text-secondary);
}

.search input::-webkit-search-cancel-button {
  display: none;
}

.search__kbd {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border: var(--border-width) solid var(--color-border);
  border-radius: 5px;
  padding: 1px 6px;
}

.iconbtn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.iconbtn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.iconbtn__dot {
  position: absolute;
  top: 6px;
  right: 7px;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-pill);
  background: var(--color-danger);
  border: 2px solid var(--color-bg);
}

@media (max-width: 960px) {
  .topbar__nav {
    display: inline-flex;
  }
}

@media (max-width: 860px) {
  .search {
    display: none;
  }
}

@media (max-width: 560px) {
  .topbar {
    padding: 0 var(--space-3);
    gap: 6px;
  }
}
</style>
