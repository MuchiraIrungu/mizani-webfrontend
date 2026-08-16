<script setup lang="ts">
const cards = [
  {
    image: '/images/duka-owner.jpg',
    alt: 'A shop owner standing behind the counter of her general store',
    title: 'Retail & wholesale',
    body: 'Dukas, minimarts and hardware stores tracking stock and daily takings across counters.',
  },
  {
    image: '/images/market-vendor.jpg',
    alt: 'A market trader at his produce stall holding a mobile phone',
    title: 'Traders & distributors',
    body: 'Market and route traders reconciling mobile-money collections against supplier credit.',
  },
  {
    image: '/images/team-office.jpg',
    alt: 'A small team working together on laptops in an office',
    title: 'Service teams',
    body: 'Agencies, clinics and workshops running payroll and statutory filing for salaried staff.',
  },
]
</script>

<template>
  <section class="band" id="company">
    <div class="container">
      <div class="band__head">
        <div>
          <span class="eyebrow eyebrow--onDark">Who we are</span>
          <h2 class="band__title">Built for Kenyan SMEs</h2>
        </div>
        <p class="band__sub">
          Mizani is built in Nairobi by people who have kept these books by hand. We design for the shop with two
          tills and the distributor with twelve staff — not for the enterprise finance department.
        </p>
      </div>

      <div class="band__grid">
        <article v-for="card in cards" :key="card.title" class="band__card">
          <img :src="card.image" :alt="card.alt" loading="lazy" />
          <div class="band__cardBody">
            <h3 class="band__cardTitle">{{ card.title }}</h3>
            <p class="band__cardText">{{ card.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band {
  padding: var(--space-7) 0;
  background: var(--mkt-band);
  color: #ffffff;
}

.band__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-5);
}

.band__title {
  font-size: clamp(28px, 3.2vw, 40px);
  letter-spacing: -0.025em;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.band__sub {
  margin: 0;
  max-width: 52ch;
  font-size: var(--fs-body);
  color: var(--mkt-band-text);
}

.band__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
}

.band__card {
  border: var(--border-width) solid var(--mkt-band-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.band__card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: var(--border-width) solid var(--mkt-band-border);
}

.band__cardBody {
  padding: var(--space-3) var(--space-4) var(--space-4);
}

.band__cardTitle {
  font-size: var(--fs-h3);
  font-weight: 600;
  margin: 0 0 4px;
  color: #ffffff;
}

.band__cardText {
  margin: 0;
  font-size: var(--fs-small);
  line-height: 1.6;
  color: var(--mkt-band-text);
}

@media (max-width: 900px) {
  .band__head {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .band__grid {
    grid-template-columns: 1fr;
  }

  .band__card img {
    height: 200px;
  }
}
</style>
