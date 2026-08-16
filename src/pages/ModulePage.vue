<script setup lang="ts">
import AppShell from '../layouts/AppShell.vue'
import AppIcon from '../components/ui/AppIcon.vue'

defineProps<{ name: string }>()
</script>

<template>
  <AppShell :active="name">
    <div class="pagehead">
      <h1 class="pagehead__title">{{ name }}</h1>
      <p class="pagehead__meta">Nairobi Branch · 1 – 31 Aug 2026</p>
    </div>

    <section class="card empty">
      <span class="empty__icon"><AppIcon name="layers" :size="22" /></span>
      <h2 class="empty__title">{{ name }} module not built yet</h2>
      <p class="empty__text">
        The shell, navigation and design system are in place. This screen is the next one to lay out.
      </p>
      <a class="btn btn-secondary" href="#/dashboard">Back to Dashboard</a>
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

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-7) var(--space-4);
}

.empty__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.empty__title {
  font-size: var(--fs-h3);
  font-weight: 700;
  margin: 0 0 var(--space-2);
}

.empty__text {
  max-width: 46ch;
}
</style>
