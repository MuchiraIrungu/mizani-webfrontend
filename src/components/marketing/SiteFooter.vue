<script setup lang="ts">
import MizaniLogo from './MizaniLogo.vue'

const columns = [
  {
    title: 'Quick Links',
    links: ['Home', 'Features', 'Pricing', 'Product Demo', 'Dashboard'],
  },
  {
    title: 'Resources',
    links: ['KRA eTIMS guide', 'Payroll calculator', 'Help centre', 'API documentation', 'System status'],
  },
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Contact', 'Privacy policy', 'Terms of service'],
  },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <MizaniLogo />
        <p class="footer__desc">
          One dashboard for sales, stock, payroll and KRA compliance — built in Nairobi for Kenyan small and medium
          businesses.
        </p>
        <p class="footer__contact">Westlands, Nairobi · hello@mizani.co.ke</p>
      </div>

      <nav v-for="col in columns" :key="col.title" class="footer__col" :aria-label="col.title">
        <h3 class="footer__colTitle">{{ col.title }}</h3>
        <ul>
          <li v-for="link in col.links" :key="link"><a href="#top">{{ link }}</a></li>
        </ul>
      </nav>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} Mizani Technologies Ltd. All rights reserved.</p>
      <p>Nairobi, Kenya</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: var(--border-width) solid var(--color-border);
  background: var(--color-bg);
  padding-top: var(--space-6);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: var(--space-5);
  padding-bottom: var(--space-5);
}

.footer__desc {
  margin: var(--space-3) 0 var(--space-2);
  font-size: var(--fs-small);
  max-width: 38ch;
}

.footer__contact {
  margin: 0;
  font-size: var(--fs-small);
  font-weight: 500;
  color: var(--color-text-primary);
}

.footer__colTitle {
  font-size: var(--fs-small);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 var(--space-3);
}

.footer__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.footer__col a {
  font-size: var(--fs-small);
  color: var(--color-text-secondary);
}

.footer__col a:hover {
  color: var(--color-primary);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding-top: var(--space-3);
  padding-bottom: var(--space-4);
  border-top: var(--border-width) solid var(--color-border);
}

.footer__bottom p {
  margin: 0;
  font-size: var(--fs-small);
}

@media (max-width: 900px) {
  .footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .footer__bottom {
    flex-direction: column;
  }
}
</style>
