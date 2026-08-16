# Mizani — web frontend

Vue 3 + TypeScript + Vite. One dashboard for sales, stock, payroll and KRA
compliance, built for Kenyan SMEs.

```bash
npm install
npm run dev
```

## Routes

vue-router in HTML5 history mode — `src/router/index.ts`. Every app screen is
lazy-loaded, so the marketing homepage ships on its own bundle.

| Path | Name | Screen |
|---|---|---|
| `/` | `home` | Marketing homepage |
| `/login` · `/register` | `login` · `register` | Auth screens |
| `/dashboard` | `dashboard` | Dashboard |
| `/sales` | `invoices` | Invoices list |
| `/sales/invoice/:invoiceRef` | `invoice` | Invoice detail |
| `/sales/customers` | `customers` | Customers list |
| `/sales/customers/:customerId` | `customer` | Customer detail |
| `/inventory` | `inventory` | Inventory |
| `/payroll` | `payroll` | Payroll + payout sheet |
| `/kra` | `kra` | KRA filing + eTIMS compliance |
| `/suppliers` | `suppliers` | Suppliers |
| `/reports` | `reports` | Reports (revenue trend, expense breakdown) |
| `/settings` | `settings` | Settings |
| anything else | — | redirects to `/` |

Each app route carries `meta.nav` (the sidebar item it belongs to) and
`meta.title` (the document title). `AppSidebar` reads `meta.nav` to set its
active item, so no page passes its own nav state. Route params are delivered as
component props (`props: true`).

Because this is history mode, any host serving the built site needs an SPA
fallback rewriting unknown paths to `index.html`. `vite dev` and `vite preview`
already do.

## State

[Pinia](https://pinia.vuejs.org) — stores live in `src/stores/`.

`useSuppliersStore` owns supplier balances, the payments log and the pay-card
state (which supplier is open, request status, last receipt). `paySupplier()`
validates the amount against the balance, simulates the payments call, then
decrements the balance and prepends a receipt — so the summary cards, the list
row and the "Settled" pill all update from one place. Replace the `setTimeout`
in that action with `POST /api/payments/suppliers` when the backend lands.

Everything else still reads its fixtures from `src/data/*.ts`; move a module
into a store when its state starts being written from more than one screen.

## Design system

`src/design.css` is the locked token set — colours, Lexend type scale, spacing,
and the card / pill / button / table primitives. `src/styles/marketing.css` adds
the marketing layout helpers, `src/styles/app.css` the app-shell tokens, chart
ramp and form primitives. Themes switch through `data-theme` on `<html>`
(`light` default, plus `dark`, `simba`, `bahari`).

Chart colours are a single-hue ordinal green ramp validated for monotone
lightness, adjacent step separation and light-end contrast in both light and
dark modes.

## Google sign-in

The frontend runs the OAuth 2.0 **authorization-code** flow via Google Identity
Services (`src/composables/useGoogleAuth.ts`). The browser only ever receives a
one-time code; the backend exchanges it using the client secret and sets an
httpOnly session cookie.

1. Google Cloud Console → APIs & Services → Credentials → **Create OAuth client
   ID** → *Web application*.
2. Under **Authorised JavaScript origins** add your dev origin
   (`http://localhost:5173`) and your production origin.
3. Copy `.env.example` to `.env.local` and fill in:

   ```
   VITE_GOOGLE_CLIENT_ID=<client id>.apps.googleusercontent.com
   VITE_AUTH_ENDPOINT=/api/auth/google
   ```

4. Implement the backend route:

   ```
   POST /api/auth/google   { code, redirect_uri: "postmessage" }
   ```

   It should POST to `https://oauth2.googleapis.com/token` with the client ID,
   client secret, `grant_type=authorization_code` and `redirect_uri=postmessage`,
   verify the returned `id_token`, then set the session cookie.

Until `VITE_GOOGLE_CLIENT_ID` is set the button reports that sign-in is not
configured rather than failing silently. The email/password forms are wired to
`/api/auth/login` and `/api/auth/register` and currently show the same notice.
