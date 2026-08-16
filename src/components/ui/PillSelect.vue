<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  modelValue: string
  options: string[]
  icon?: string
  label?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function choose(option: string) {
  emit('update:modelValue', option)
  open.value = false
}

function onDocClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="pillselect">
    <button
      class="pillselect__trigger"
      type="button"
      :aria-label="props.label"
      :aria-expanded="open"
      @click="open = !open"
    >
      <AppIcon v-if="icon" :name="icon" :size="15" />
      <span class="pillselect__value">{{ modelValue }}</span>
      <AppIcon name="chevronDown" :size="14" />
    </button>

    <ul v-if="open" class="pillselect__menu">
      <li v-for="option in options" :key="option">
        <button
          type="button"
          class="pillselect__option"
          :class="{ 'is-selected': option === modelValue }"
          @click="choose(option)"
        >
          {{ option }}
          <AppIcon v-if="option === modelValue" name="check" :size="14" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pillselect {
  position: relative;
}

.pillselect__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-size: var(--fs-small);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.pillselect__trigger:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pillselect__value {
  font-weight: 600;
}

.pillselect__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  min-width: 200px;
  list-style: none;
  margin: 0;
  padding: 4px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-bg);
}

.pillselect__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: var(--radius-btn);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--fs-small);
  text-align: left;
  cursor: pointer;
}

.pillselect__option:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.pillselect__option.is-selected {
  color: var(--color-primary);
  font-weight: 600;
}
</style>
