<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import GoogleButton from '../components/ui/GoogleButton.vue'
import { useGoogleAuth } from '../composables/useGoogleAuth'

const { status, message, busy, signInWithGoogle } = useGoogleAuth()

const email = ref('')
const password = ref('')
const remember = ref(true)
const showPassword = ref(false)
const formNotice = ref('')

function onSubmit() {
  /* Backend not wired yet — POST { email, password, remember } to /api/auth/login. */
  formNotice.value = 'Email sign-in needs the backend. Connect /api/auth/login to complete this flow.'
}

const points = [
  'Every M-Pesa, bank and cash entry in one ledger',
  'eTIMS invoices signed as you issue them',
  'Payroll with PAYE, NSSF and SHA worked out for you',
]
</script>

<template>
  <AuthLayout
    :points="points"
    caption="Used by 2,400+ Kenyan SMEs to close their books without a weekend of data entry."
  >
    <div class="head">
      <h1 class="head__title">Sign in to Mizani</h1>
      <p class="head__meta">Welcome back. Pick up where your books left off.</p>
    </div>

    <div class="card panel">
      <GoogleButton label="Continue with Google" :busy="busy" @click="signInWithGoogle" />

      <p v-if="message" class="form-notice" :class="status === 'error' ? 'form-notice--danger' : 'form-notice--warn'">
        <AppIcon name="alert" :size="15" />
        {{ message }}
      </p>

      <p class="form-divider">or sign in with email</p>

      <form class="form" @submit.prevent="onSubmit">
        <div class="form-field">
          <label class="form-label" for="login-email">Email address</label>
          <input
            id="login-email"
            v-model="email"
            class="form-input"
            type="email"
            required
            autocomplete="email"
            placeholder="you@business.co.ke"
          />
        </div>

        <div class="form-field">
          <div class="form-labelRow">
            <label class="form-label" for="login-password">Password</label>
            <RouterLink class="link link--small" to="/login">Forgot password?</RouterLink>
          </div>
          <div class="password">
            <input
              id="login-password"
              v-model="password"
              class="form-input"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
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
        </div>

        <label class="form-check">
          <input v-model="remember" type="checkbox" />
          Keep me signed in on this device
        </label>

        <p v-if="formNotice" class="form-notice">
          <AppIcon name="alert" :size="15" />
          {{ formNotice }}
        </p>

        <button class="btn btn-primary submit" type="submit">
          Sign in
          <AppIcon name="arrowRight" :size="16" />
        </button>
      </form>
    </div>

    <p class="alt">
      New to Mizani?
      <RouterLink class="link" to="/register">Create an account</RouterLink>
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

.form-labelRow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
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

.link--small {
  font-size: var(--fs-small);
}

.link--muted {
  color: var(--color-text-secondary);
  border-bottom-color: transparent;
}

.link--muted:hover {
  color: var(--color-primary);
}
</style>
