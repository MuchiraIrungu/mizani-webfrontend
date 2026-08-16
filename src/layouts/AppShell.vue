<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '../components/app/AppSidebar.vue'
import AppTopbar from '../components/app/AppTopbar.vue'

const navOpen = ref(false)
</script>

<template>
  <div class="shell">
    <AppSidebar :open="navOpen" @close="navOpen = false" />
    <div v-if="navOpen" class="shell__scrim" @click="navOpen = false"></div>

    <div class="shell__main">
      <AppTopbar @toggle-nav="navOpen = !navOpen" />
      <main class="shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  background: var(--color-surface);
}

.shell__main {
  margin-left: var(--sidebar-w);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
}

.shell__content {
  flex: 1;
  padding: var(--space-4);
}

.shell__scrim {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: rgba(6, 61, 36, 0.45);
}

@media (max-width: 960px) {
  .shell__main {
    margin-left: 0;
  }
}

@media (max-width: 560px) {
  .shell__content {
    padding: var(--space-3);
  }
}
</style>
