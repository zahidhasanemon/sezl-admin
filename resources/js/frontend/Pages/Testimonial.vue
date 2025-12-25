<script setup>
import { Head } from '@inertiajs/vue3';

defineProps({
  testimonials: Array,
  seo: Object
});
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>

    <section class="section-padding">
      <div class="container">
        <!-- Testimonials Section -->
        <div class="space-y-8 md:space-y-12 lg:space-y-16">
          <!-- Page Header -->
          <div class="text-center mb-8 lg:mb-12 px-4 sm:px-0">
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-4 lg:mb-6">
              What our customers say
            </h1>
            <p class="text-sm sm:text-base lg:text-base max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Discover authentic testimonials from our valued customers who have experienced the elegance and quality
              of VuexyAdmin. Their genuine feedback speaks to our commitment to providing exceptional fashion that
              makes every woman feel confident and beautiful.
            </p>
          </div>

          <!-- Testimonial Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Testimonial Card -->
            <div v-for="testimonial in testimonials" :key="testimonial.id"
              class="bg-white border border-border-primary rounded-lg p-3 sm:p-4 lg:p-6 hover:-translate-y-0.5 hover:shadow-theme transition-all">
              <p class="text-primary-black text-sm sm:text-sm lg:text-base leading-relaxed mb-3 lg:mb-4">
                {{ testimonial.testimonial }}
              </p>
              <div class="flex items-center gap-3 lg:gap-4">
                <img :src="testimonial.avatar" :alt="testimonial.name"
                  class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <h4 class="font-semibold text-primary-black text-sm sm:text-sm lg:text-base truncate">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-primary-gray text-xs sm:text-xs lg:text-sm">{{ testimonial.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
