/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** OAuth 2.0 Web client ID from Google Cloud Console → Credentials. */
  readonly VITE_GOOGLE_CLIENT_ID?: string
  /** Backend endpoint that exchanges the Google auth code for a session. */
  readonly VITE_AUTH_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
