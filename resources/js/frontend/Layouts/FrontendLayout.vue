<script setup>
import CookieConsent from '@/Components/CookieConsent.vue';
import Footer from '@/Components/Footer.vue';
import Header from '@/Components/Header.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const hideHeaderFooter = computed(() => {
  const url = new URL(page.url, window.location.origin);
  return url.searchParams.get('hideHeaderFooter') === 'true';
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!hideHeaderFooter" :user="user" />

    <main class="flex-grow">
      <slot />
    </main>

    <Footer v-if="!hideHeaderFooter" />

    <CookieConsent v-if="!hideHeaderFooter" />
  </div>
</template>
