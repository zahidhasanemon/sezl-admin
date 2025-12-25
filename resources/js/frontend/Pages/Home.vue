<script setup>
import CategorySlider from '@/Components/CategorySlider.vue';
import HeroSlider from '@/Components/HeroSlider.vue';
import ProductCard from '@/Components/ProductCard.vue';
import WelcomeBanner from '@/Components/WelcomeBanner.vue';
import circleLogo from '@images/frontend/shapes/circle-logo.png';
import storyImage from '@images/frontend/sustainability-banner.jpg';
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const props = defineProps({
  featuredProducts: Array,
  categories: Array,
  slides: Array,
  seo: Object,
  notice: Object || null
});

const showSaleModal = ref(false)

onMounted(() => {
  if (!sessionStorage.getItem('saleModalSeen') && props.notice) {
    showSaleModal.value = true
    // sessionStorage.setItem('saleModalSeen', 'true')
  }
})
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>
    <!-- Hero Slider -->
    <HeroSlider :slides="slides" />

    <!-- Featured Products -->
    <section class="section-padding">
      <div class="container">
        <h2 class="section-title mb-2 md:mb-4">Featured Products</h2>
        <p class="section-subtitle">Discover our most popular items</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 md:mt-12 mb-8 md:mb-15">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>

        <div class="flex justify-center">
          <!-- <Link href="/products?featured=true" class="primary-button !rounded-full !px-20">See All Products</Link> -->
          <Link href="/products" class="primary-button !rounded-full !px-20">See All Products</Link>
        </div>
      </div>

      <div class="absolute home-shape -left-40 w-full overflow-hidden leading-[0] -z-10">
        <img :src="circleLogo" alt="" />
      </div>
    </section>

    <section class="section-padding bg-[#FFF8F3]">
      <div class="container">
        <div>
          <h2 class="section-title mb-2 md:mb-4">Shop by Category</h2>
          <p class="section-subtitle">Find exactly what you're looking for</p>
        </div>

        <!-- Category Listing -->
        <div class="mt-6 md:mt-12">
          <!-- Category Card 1 -->
          <!-- <Link v-for="category in categories" :key="category.id" :href="`/categories/${category.slug}`"
            class="category-card group w-full sm:w-full md:w-[48%] lg:w-[32%] flex-shrink-0">
          <img :src="category.image" :alt="category.name"
            class="category-card-image group-hover:scale-105 transition-transform duration-300" />
          <div class="category-card-overlay">
            <h3 class="text-xl sm:text-2xl md:text-3xl">{{ category.name }}</h3>
          </div>
          </Link> -->
          <CategorySlider :categories="categories" />
        </div>
      </div>
    </section>

    <!-- Sustainability Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-6 md:mb-12">
          <h2 class="section-title mb-2 md:mb-4">From ocean waste to your feet</h2>
          <p class="section-subtitle max-w-2xl mx-auto mb-4 md:mb-8">
            Discover how our eco-friendly sneakers are making a difference in style and sustainability. Each pair is
            crafted from recycled ocean plastics, turning environmental challenges into fashion-forward solutions.
          </p>
          <a href="#" class="primary-button !rounded-full !px-20 inline-block">View our stories</a>
        </div>

        <!-- Sustainability Image -->
        <div class="relative rounded-lg overflow-hidden">
          <img :src="storyImage" alt="Sustainable Fashion - People wearing eco-friendly clothing"
            class="max-h-[500px] sm:max-h-[600px] lg:max-h-[70vh] rounded-lg h-full w-full object-cover object-top" />
          <div class="absolute inset-0 bg-primary-black/50"></div>
        </div>
      </div>
    </section>

    <WelcomeBanner v-model="showSaleModal" :notice="props.notice" />
  </div>
</template>

<style>
.home-shape {
  inset-block-end: -70rem;
}
</style>
