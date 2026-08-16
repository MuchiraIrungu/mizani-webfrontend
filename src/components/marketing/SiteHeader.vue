<script setup lang="ts">
import { ref } from 'vue'
import MizaniLogo from '../ui/MizaniLogo.vue'
import AppIcon from '../ui/AppIcon.vue'
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const menuOpen = ref(false)

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Company', href: '#company' },
]
</script>

<template>
  <header class="site-header" id="top">
    <div class="container site-header__inner">
      <a class="site-header__brand" href="#top" aria-label="Mizani home">
        <MizaniLogo />
      </a>

      <nav class="site-header__nav" :class="{ 'is-open': menuOpen }" aria-label="Primary">
        <a v-for="link in links" :key="link.label" class="site-header__link" :href="link.href" @click="menuOpen = false">
          {{ link.label }}
        </a>
      </nav>

      <div class="site-header__actions">
        <button
          class="icon-btn"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
        </button>
        <a class="dashboard-pill" href="#/dashboard">Dashboard</a>
        <button
          class="icon-btn icon-btn--menu"
          type="button"
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon name="layers" :size="18" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--color-bg);
  border-bottom: var(--border-width) solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  height: 68px;
}

.site-header__brand {
  display: inline-flex;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-right: auto;
}

.site-header__link {
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--color-text-secondary);
  padding: 6px 2px;
  border-bottom: 2px solid transparent;
}

.site-header__link:hover {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.icon-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.icon-btn--menu {
  display: none;
}

.dashboard-pill {
  display: inline-flex;
  align-items: center;
  padding: 8px var(--space-4);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-primary);
  background: var(--color-primary);
  color: #ffffff;
  font-size: var(--fs-body);
  font-weight: 600;
}

.dashboard-pill:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

@media (max-width: 860px) {
  .site-header__inner {
    gap: var(--space-3);
  }

  .site-header__nav {
    position: absolute;
    inset: 68px 0 auto;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background: var(--color-bg);
    border-bottom: var(--border-width) solid var(--color-border);
    padding: var(--space-2) var(--mkt-gutter) var(--space-3);
  }

  .site-header__nav.is-open {
    display: flex;
  }

  .site-header__link {
    width: 100%;
    padding: 10px 0;
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .site-header__brand {
    margin-right: auto;
  }

  .icon-btn--menu {
    display: inline-flex;
  }
}

@media (max-width: 480px) {
  .dashboard-pill {
    padding: 8px var(--space-3);
  }
}
</style>
