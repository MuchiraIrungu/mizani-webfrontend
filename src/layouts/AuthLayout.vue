<script setup lang="ts">
import MizaniLogo from '../components/ui/MizaniLogo.vue'
import AppIcon from '../components/ui/AppIcon.vue'

defineProps<{ points: string[]; caption: string }>()
</script>

<template>
  <div class="auth">
    <!-- Brand panel -->
    <aside class="brand">
      <div class="brand__top">
        <a href="#top"><MizaniLogo tone="light" /></a>
      </div>

      <div class="brand__body">
        <h2 class="brand__title">One dashboard for the whole business</h2>
        <ul class="brand__points">
          <li v-for="point in points" :key="point">
            <span class="brand__check"><AppIcon name="check" :size="13" /></span>
            {{ point }}
          </li>
        </ul>
        <p class="brand__caption">{{ caption }}</p>
      </div>

      <div class="dot-grid brand__dots" aria-hidden="true"></div>

      <p class="brand__foot">
        <span class="brand__badge"><AppIcon name="shieldCheck" :size="13" /></span>
        Data hosted in-region · KRA eTIMS certified integration
      </p>
    </aside>

    <!-- Form panel -->
    <main class="pane">
      <div class="pane__inner">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  min-height: 100vh;
  background: var(--color-bg);
}

/* ---- Brand panel ---- */
.brand {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-6);
  background: var(--sidebar-bg);
  color: #ffffff;
  overflow: hidden;
}

.brand__body {
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.brand__title {
  font-size: clamp(24px, 2.4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-4);
  max-width: 16ch;
  color: #ffffff;
}

.brand__points {
  list-style: none;
  margin: 0 0 var(--space-4);
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.brand__points li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--fs-body);
  color: rgba(255, 255, 255, 0.82);
}

.brand__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
}

.brand__caption {
  margin: 0;
  padding: var(--space-3);
  border: var(--border-width) solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.05);
  font-size: var(--fs-small);
  color: rgba(255, 255, 255, 0.78);
  max-width: 44ch;
}

.brand__dots {
  position: absolute;
  right: -30px;
  top: 90px;
  width: 180px;
  height: 200px;
  opacity: 0.28;
  --mkt-dot: #ffffff;
}

.brand__foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  font-size: var(--fs-small);
  color: rgba(255, 255, 255, 0.7);
}

.brand__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
}

/* ---- Form panel ---- */
.pane {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-4);
}

.pane__inner {
  width: 100%;
  max-width: 460px;
}

@media (max-width: 900px) {
  .auth {
    grid-template-columns: 1fr;
  }

  .brand {
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .brand__title {
    font-size: 22px;
    margin-bottom: var(--space-3);
  }

  .brand__points,
  .brand__caption,
  .brand__dots {
    display: none;
  }

  .pane {
    padding: var(--space-5) var(--space-3);
  }
}
</style>
