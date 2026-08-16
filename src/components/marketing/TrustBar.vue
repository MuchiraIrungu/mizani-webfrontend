<script setup lang="ts">
/** Grayscale placeholder marks — swap for real partner logos when licensed. */
const logos = [
  { name: 'Sokoni', kind: 'Retail Group' },
  { name: 'Tuskys Fresh', kind: 'Grocery' },
  { name: 'Jenga Hardware', kind: 'Hardware' },
  { name: 'Afya Pharma', kind: 'Pharmacy' },
  { name: 'Rift Logistics', kind: 'Transport' },
  { name: 'Karibu Foods', kind: 'Restaurants' },
]
</script>

<template>
  <section class="trust">
    <div class="container trust__inner">
      <p class="trust__label">Trusted by leading organizations</p>
      <ul class="trust__grid">
        <li v-for="logo in logos" :key="logo.name" class="trust__item">
          <span class="trust__mark" aria-hidden="true">{{ logo.name.charAt(0) }}</span>
          <span class="trust__text">
            <span class="trust__name">{{ logo.name }}</span>
            <span class="trust__kind">{{ logo.kind }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.trust {
  padding: var(--space-5) 0;
  background: var(--color-surface);
  border-bottom: var(--border-width) solid var(--color-border);
}

.trust__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.trust__label {
  margin: 0;
  flex: none;
  max-width: 150px;
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.trust__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--space-2);
  flex: 1;
}

.trust__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 10px var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-bg);
  filter: grayscale(1);
  opacity: 0.85;
}

.trust__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex: none;
  border-radius: 7px;
  border: var(--border-width) solid var(--color-border);
  background: var(--color-surface);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.trust__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.trust__name {
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trust__kind {
  font-size: 11px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .trust__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .trust__label {
    max-width: none;
  }

  .trust__grid {
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .trust__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
