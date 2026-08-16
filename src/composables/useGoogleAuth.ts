import { ref } from 'vue'
import router from '../router'

/**
 * Google sign-in, authorization-code flow.
 *
 * The browser never sees a token: Google Identity Services hands us a one-time
 * `code`, and the backend exchanges it for tokens using the client secret. That
 * keeps the secret off the client and lets the server set an httpOnly session
 * cookie. Because we drive it with `initCodeClient` rather than Google's own
 * rendered button, the trigger can be a normal Mizani-styled button.
 *
 * Setup, once the backend exists:
 *   1. Google Cloud Console → APIs & Services → Credentials → OAuth client ID
 *      → Web application. Add your origin (http://localhost:5173 in dev) under
 *      "Authorised JavaScript origins".
 *   2. Put the client ID in `.env.local` as VITE_GOOGLE_CLIENT_ID.
 *   3. Point VITE_AUTH_ENDPOINT at the route that exchanges the code, e.g.
 *      POST /api/auth/google  { code, redirect_uri: 'postmessage' }
 *      → the server calls https://oauth2.googleapis.com/token with the client
 *        secret, verifies the id_token, and sets the session cookie.
 *
 * Until VITE_GOOGLE_CLIENT_ID is set the flow reports itself as unconfigured
 * instead of failing silently.
 */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT ?? ''
const GSI_SRC = 'https://accounts.google.com/gsi/client'
const SCOPES = 'openid email profile'

interface CodeResponse {
  code?: string
  error?: string
  error_description?: string
}

interface CodeClient {
  requestCode: () => void
}

interface GoogleIdentity {
  accounts: {
    oauth2: {
      initCodeClient: (config: {
        client_id: string
        scope: string
        ux_mode: 'popup' | 'redirect'
        callback: (response: CodeResponse) => void
      }) => CodeClient
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentity
  }
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'

let scriptPromise: Promise<void> | null = null

function loadGsi(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`)
    const script = existing ?? document.createElement('script')
    script.src = GSI_SRC
    script.async = true
    script.defer = true
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', () => reject(new Error('Could not reach Google sign-in')))
    if (!existing) document.head.appendChild(script)
  })

  return scriptPromise
}

export function useGoogleAuth() {
  const status = ref<AuthStatus>(CLIENT_ID ? 'idle' : 'unconfigured')
  const message = ref('')
  const busy = ref(false)

  async function exchange(code: string) {
    if (!AUTH_ENDPOINT) {
      status.value = 'unconfigured'
      message.value = 'Google returned an authorisation code. Set VITE_AUTH_ENDPOINT to exchange it for a session.'
      return
    }

    const response = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code, redirect_uri: 'postmessage' }),
    })

    if (!response.ok) throw new Error(`Sign-in failed (${response.status})`)

    status.value = 'success'
    message.value = 'Signed in. Taking you to your dashboard…'
    await router.push('/dashboard')
  }

  async function signInWithGoogle() {
    if (!CLIENT_ID) {
      status.value = 'unconfigured'
      message.value = 'Google sign-in is not configured yet — add VITE_GOOGLE_CLIENT_ID to .env.local.'
      return
    }

    busy.value = true
    message.value = ''

    try {
      await loadGsi()
      const oauth2 = window.google?.accounts?.oauth2
      if (!oauth2) throw new Error('Google sign-in did not load')

      oauth2
        .initCodeClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          ux_mode: 'popup',
          callback: (response) => {
            busy.value = false
            if (response.error || !response.code) {
              status.value = 'error'
              message.value = response.error_description ?? 'Google sign-in was cancelled.'
              return
            }
            exchange(response.code).catch((error: unknown) => {
              status.value = 'error'
              message.value = error instanceof Error ? error.message : 'Sign-in failed.'
            })
          },
        })
        .requestCode()
    } catch (error: unknown) {
      busy.value = false
      status.value = 'error'
      message.value = error instanceof Error ? error.message : 'Google sign-in is unavailable.'
    }
  }

  return { status, message, busy, signInWithGoogle, configured: Boolean(CLIENT_ID) }
}
