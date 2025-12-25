<script setup>
import navItems from '@/navigation/horizontal'
import logoSrc from '@images/logo-full-black.svg?url'
import shortLogoSrc from '@images/sa-logo-black.svg?url'

// Components
import Footer from '@/layouts/components/Footer.vue'
// import NavSearchBar from '@/layouts/components/NavSearchBar.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { HorizontalNavLayout } from '@layouts'
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink to="/" class="app-logo d-flex align-center gap-x-3">
        <VImg :src="shortLogoSrc" alt="logo" height="40" width="40" cover />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          <!-- {{ themeConfig.app.title }} -->
          <VImg :src="logoSrc" alt="logo" height="40" width="100" cover />
        </h1>
      </RouterLink>
      <VSpacer />

      <!-- <NavSearchBar trigger-btn-class="ms-lg-n3" /> -->

      <!-- <NavbarThemeSwitcher /> -->
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>
