<script setup lang="ts">
import { computed, ref } from 'vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import GoogleButton from '../components/ui/GoogleButton.vue'
import { useGoogleAuth } from '../composables/useGoogleAuth'

const { status, message, busy, signInWithGoogle } = useGoogleAuth()

const fullName = ref('')
const business = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const businessType = ref('Retail / duka')
const accepted = ref(false)
const showPassword = ref(false)
const formNotice = ref('')

const businessTypes = [
  'Retail / duka',
  'Wholesale / distribution',
  'Hardware & building',
  'Food & hospitality',
  'Services / professional',
  'Other',
]

/* Mirrors the rule the backend should enforce, so the message is immediate. */
const passwordOk = computed(() => password.value.length >= 8 && /\d/.test(password.value))

function onSubmit() {
  if (!passwordOk.value) {
    formNotice.value = 'Use at least 8 characters, including one number.'
    return
  }
  /* Backend not wired yet — POST the form to /api/auth/register. */
  formNotice.value = 'Account creation needs the backend. Connect /api/auth/register to complete this flow.'
}

const points = [
  'Set up your branch and staff in under ten minutes',
  'Connect your till, paybill and bank account once',
  'File VAT and turnover tax from records you never re-keyed',
]
</script>

<template>
  <AuthLayout
    :points="points"
    caption="30-day trial on every plan. No card required, and you can export your data at any time."
  >
    <div class="head">
      <h1 class="head__title">Create your Mizani account</h1>
      <p class="head__meta">Start with one branch — add the rest whenever you are ready.</p>
    </div>

    <div class="card panel">
      <GoogleButton label="Sign up with Google" :busy="busy" @click="signInWithGoogle" />

      <p v-if="message" class="form-notice" :class="status === 'error' ? 'form-notice--danger' : 'form-notice--warn'">
        <AppIcon name="alert" :size="15" />
        {{ message }}
      </p>

      <p class="form-divider">or sign up with email</p>

      <form class="form" @submit.prevent="onSubmit">
        <div class="grid2">
          <div class="form-field">
            <label class="form-label" for="reg-name">Full name</label>
            <input id="reg-name" v-model="fullName" class="form-input" type="text" required autocomplete="name" placeholder="Wanjiku Mwangi" />
          </div>

          <div class="form-field">
            <label class="form-label" for="reg-phone">Phone number</label>
            <input id="reg-phone" v-model="phone" class="form-input" type="tel" required autocomplete="tel" placeholder="0722 000 000" />
          </div>
        </div>

        <div class="form-field">
          <label class="form-label" for="reg-business">Business name</label>
          <input id="reg-business" v-model="business" class="form-input" type="text" required autocomplete="organization" placeholder="Mizani Trading Co." />
        </div>

        <div class="form-field">
          <label class="form-label" for="reg-type">Business type</label>
          <select id="reg-type" v-model="businessType" class="form-input">
            <option v-for="type in businessTypes" :key="type">{{ type }}</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="reg-email">Work email</label>
          <input id="reg-email" v-model="email" class="form-input" type="email" required autocomplete="email" placeholder="you@business.co.ke" />
        </div>

        <div class="form-field">
          <label class="form-label" for="reg-password">Password</label>
          <div class="password">
            <input
              id="reg-password"
              v-model="password"
              class="form-input"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="At least 8 characters"
            />
            <button
              class="password__toggle"
              type="button"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p class="form-hint">At least 8 characters and one number.</p>
        </div>

        <label class="form-check">
          <input v-model="accepted" type="checkbox" required />
          I agree to the Mizani terms of service and privacy policy, and to Mizani filing on my behalf where I enable it.
        </label>

        <p v-if="formNotice" class="form-notice">
          <AppIcon name="alert" :size="15" />
          {{ formNotice }}
        </p>

        <button class="btn btn-primary submit" type="submit">
          Create account
          <AppIcon name="arrowRight" :size="16" />
        </button>
      </form>
    </div>

    <p class="alt">
      Already have an account?
      <RouterLink class="link" to="/login">Sign in</RouterLink>
    </p>
    <p class="alt alt--muted">
      <RouterLink class="link link--muted" to="/">← Back to mizani.co.ke</RouterLink>
    </p>
  </AuthLayout>
</template>

<style scoped>
.head {
  margin-bottom: var(--space-4);
}

.head__title {
  font-size: var(--fs-h1);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.head__meta {
  margin: 4px 0 0;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.panel {
  display: grid;
  gap: var(--space-3);
}

.form {
  display: grid;
  gap: var(--space-3);
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.password {
  position: relative;
}

.password__toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  border: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.password__toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.submit {
  width: 100%;
  padding: 12px var(--space-4);
}

.alt {
  margin: var(--space-3) 0 0;
  text-align: center;
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.alt--muted {
  margin-top: var(--space-2);
}

.link {
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: var(--border-width) solid var(--color-primary);
}

.link--muted {
  color: var(--color-text-secondary);
  border-bottom-color: transparent;
}

.link--muted:hover {
  color: var(--color-primary);
}

@media (max-width: 560px) {
  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>
