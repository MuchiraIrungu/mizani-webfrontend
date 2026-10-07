# Mizani Web Frontend

Mizani is a business operations platform designed for Kenyan SMEs and retail businesses. The web frontend provides a modern dashboard for managing sales, inventory, payroll, suppliers, compliance, and operational reporting from a single interface.

This project is built with Vue 3, TypeScript, and Vite, with a strong emphasis on dashboard UX, modular state management, and a clean design system.

## Overview

Mizani brings together the core business workflows that small businesses usually manage across disconnected tools:

- Sales and invoices
- Inventory and stock visibility
- Payroll and payouts
- Supplier payments
- KRA and compliance workflows
- Reporting and operational insights

The frontend is structured as a single-page application with route-driven screens and a reusable app shell.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind-inspired design tokens and CSS primitives

## Key Features

- Sales dashboard and invoice management
- Customer and supplier management
- Inventory oversight
- Payroll and payout workflows
- KRA / eTIMS compliance support
- Reports for revenue, expenses, and operational trends
- Theme support with light/dark and brand variations
- Route-based navigation with clear app sections

## Application Structure

```bash
mizani-webfrontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── composables/     # Reusable logic and hooks
│   ├── data/            # Local mock data fixtures
│   ├── design.css       # Design system tokens
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── styles/          # App and marketing theme styles
│   ├── App.vue          # Root app component
│   ├── main.ts          # App bootstrap
│   └── ...
├── .env.example         # Example environment file
├── index.html           # Entry HTML file
├── package.json          # Scripts and dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts       # Vite config
├── README.md            # Documentation
└── .gitignore
```

## Route Overview

The app uses Vue Router in HTML5 history mode. Main routes include:

| Path | Screen |
|---|---|
| `/` | Marketing homepage |
| `/login` | Login |
| `/register` | Registration |
| `/dashboard` | Dashboard |
| `/sales` | Invoices /
| `/sales/invoice/:invoiceRef` | Invoice detail |
| `/sales/customers` | Customer list |
| `/sales/customers/:customerId` | Customer detail |
| `/inventory` | Inventory |
| `/payroll` | Payroll |
| `/kra` | KRA compliance |
| `/suppliers` | Suppliers |
| `/reports` | Reports |
| `/settings` | Settings |

All routes are organized around app navigation metadata for consistent sidebar state and page titles.

## State Management

Pinia is used for application state. Stores are designed to centralize logic for business modules such as:

- supplier balances and supplier payment flow
- inventory state
- sales and reporting state
- UI state for open panels and active selections

This keeps the app easier to scale as more screens begin to manipulate shared business data.

## Design System

The design system is intentionally opinionated and centralized in `src/design.css`. It defines:

- color palette
- typography scale
- spacing and layout rules
- card, table, pill, and button styles
- theme support via `data-theme` attributes

The frontend ships with a few theme variants such as `light`, `dark`, `simba`, and `bahari`, making it easy to brand the product for different contexts.

## Google Sign-In

The app supports Google OAuth 2.0 authorization code flow via Google Identity Services. The browser receives a one-time code and the backend exchanges it for session cookies.

### Local setup

1. Create a Google OAuth client in Google Cloud Console
2. Add your web origin (for example `http://localhost:5173`)
3. Copy `.env.example` to `.env.local`
4. Set:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_AUTH_ENDPOINT=/api/auth/google
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Notes

- The app is designed for a front-end-first workflow while the backend APIs are still being connected.
- Several modules still use local fixture data before being wired to a live backend.
- Route metadata and stores are organized so app state can move from mock data to real API responses without major rework.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## License

Copyright (c) 2026 MuchiraIrungu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
