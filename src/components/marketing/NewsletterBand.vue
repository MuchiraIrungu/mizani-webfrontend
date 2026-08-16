<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'

const email = ref('')
const submitted = ref(false)

function subscribe() {
  if (!email.value) return
  submitted.value = true
}
</script>

<template>
  <section class="news" id="pricing">
    <div class="container news__inner">
      <span class="eyebrow">Stay in the loop</span>
      <h2 class="news__title">Join our newsletter</h2>
      <p class="news__sub">
        A short monthly note on KRA deadline changes, new Mizani features and practical bookkeeping tips for Kenyan
        SMEs. No sales pitches.
      </p>

      <form class="news__form" @submit.prevent="subscribe">
        <label class="news__label" for="newsletter-email">Email address</label>
        <div class="news__row">
          <input
            id="newsletter-email"
            v-model="email"
            class="news__input"
            type="email"
            required
            placeholder="you@business.co.ke"
            autocomplete="email"
          />
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </div>
      </form>

      <p v-if="submitted" class="news__ack">
        <AppIcon name="check" :size="14" />
        Thanks — check your inbox to confirm the subscription.
      </p>
      <p v-else class="news__note">Unsubscribe in one click. We never share your address.</p>
    </div>
  </section>
</template>

<style scoped>
.news {
  padding: var(--space-7) 0;
  background: var(--color-primary-light);
}

.news__inner {
  max-width: 620px;
  text-align: center;
}

.news__title {
  font-size: clamp(26px, 3vw, 34px);
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0 0 var(--space-2);
  color: var(--color-text-primary);
}

.news__sub {
  margin: 0 auto var(--space-4);
  max-width: 52ch;
}

.news__form {
  text-align: left;
  max-width: 480px;
  margin: 0 auto var(--space-3);
}

.news__label {
  display: block;
  font-size: var(--fs-small);
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text-secondary);
}

.news__row {
  display: flex;
  gap: var(--space-2);
}

.news__input {
  flex: 1;
  min-width: 0;
  padding: 11px var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--fs-body);
}

.news__input::placeholder {
  color: var(--color-text-secondary);
}

.news__input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.news__note,
.news__ack {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.news__ack {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 480px) {
  .news__row {
    flex-direction: column;
  }
}
</style>
