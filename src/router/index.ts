import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

/**
 * Marketing site at `/`, the logged-in app on named routes below.
 * App screens are lazy-loaded so the homepage ships on its own.
 */
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Mizani — Run your entire business from one dashboard' } },

  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue'), meta: { title: 'Sign in · Mizani' } },
  { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue'), meta: { title: 'Create your account · Mizani' } },

  { path: '/dashboard', name: 'dashboard', component: () => import('../pages/DashboardPage.vue'), meta: { nav: 'Dashboard', title: 'Dashboard · Mizani' } },

  { path: '/sales', name: 'invoices', component: () => import('../pages/InvoicesPage.vue'), meta: { nav: 'Sales', title: 'Invoices · Mizani' } },
  {
    path: '/sales/invoice/:invoiceRef',
    name: 'invoice',
    component: () => import('../pages/InvoiceDetailPage.vue'),
    props: true,
    meta: { nav: 'Sales', title: 'Invoice · Mizani' },
  },
  { path: '/sales/customers', name: 'customers', component: () => import('../pages/CustomersPage.vue'), meta: { nav: 'Sales', title: 'Customers · Mizani' } },
  {
    path: '/sales/customers/:customerId',
    name: 'customer',
    component: () => import('../pages/CustomerDetailPage.vue'),
    props: true,
    meta: { nav: 'Sales', title: 'Customer · Mizani' },
  },

  { path: '/inventory', name: 'inventory', component: () => import('../pages/InventoryPage.vue'), meta: { nav: 'Inventory', title: 'Inventory · Mizani' } },
  { path: '/payroll', name: 'payroll', component: () => import('../pages/PayrollPage.vue'), meta: { nav: 'Payroll', title: 'Payroll · Mizani' } },
  { path: '/kra', name: 'kra', component: () => import('../pages/KraPage.vue'), meta: { nav: 'KRA', title: 'KRA · Mizani' } },
  { path: '/suppliers', name: 'suppliers', component: () => import('../pages/SuppliersPage.vue'), meta: { nav: 'Suppliers', title: 'Suppliers · Mizani' } },
  { path: '/reports', name: 'reports', component: () => import('../pages/ReportsPage.vue'), meta: { nav: 'Reports', title: 'Reports · Mizani' } },
  { path: '/settings', name: 'settings', component: () => import('../pages/SettingsPage.vue'), meta: { nav: 'Settings', title: 'Settings · Mizani' } },

  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') document.title = title
})

export default router
