<script setup lang="ts">
import SiteHeader from '../components/marketing/SiteHeader.vue'
import HeroSection from '../components/marketing/HeroSection.vue'
import TrustBar from '../components/marketing/TrustBar.vue'
import DiscoverSection from '../components/marketing/DiscoverSection.vue'
import HowItWorks from '../components/marketing/HowItWorks.vue'
import WhyChooseUs from '../components/marketing/WhyChooseUs.vue'
import WhoWeAre from '../components/marketing/WhoWeAre.vue'
import NewsletterBand from '../components/marketing/NewsletterBand.vue'
import SiteFooter from '../components/marketing/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <TrustBar />
    <DiscoverSection />
    <HowItWorks />
    <WhyChooseUs />
    <WhoWeAre />
    <NewsletterBand />
  </main>
  <SiteFooter />
</template>
