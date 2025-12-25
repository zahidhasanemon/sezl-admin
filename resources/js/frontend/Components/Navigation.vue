<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <Link href="/" class="text-2xl font-bold text-gray-800">
          Silken
        </Link>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <Link
            href="/"
            class="text-gray-600 hover:text-gray-900 transition"
            :class="{ 'text-gray-900 font-semibold': $page.url === '/' }"
          >
            Home
          </Link>
          <Link
            href="/products"
            class="text-gray-600 hover:text-gray-900 transition"
            :class="{ 'text-gray-900 font-semibold': $page.url.startsWith('/products') }"
          >
            Products
          </Link>
          <Link
            v-if="$page.props.auth.user"
            href="/profile"
            class="text-gray-600 hover:text-gray-900 transition"
            :class="{ 'text-gray-900 font-semibold': $page.url === '/profile' }"
          >
            Welcome, {{ $page.props.auth.user.name }}
          </Link>
          <div v-else>
            Login
          </div>
        </div>

        <!-- Cart & Auth -->
        <div class="flex items-center space-x-4">
          <button class="relative p-2 text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {{ cartCount }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button class="md:hidden p-2" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t">
        <Link
          href="/"
          class="block py-2 text-gray-600 hover:text-gray-900"
          @click="isMobileMenuOpen = false"
        >
          Home
        </Link>
        <Link
          href="/products"
          class="block py-2 text-gray-600 hover:text-gray-900"
          @click="isMobileMenuOpen = false"
        >
          Products
        </Link>
        <Link
          href="/profile"
          class="block py-2 text-gray-600 hover:text-gray-900"
          @click="isMobileMenuOpen = false"
        >
          Profile
        </Link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const cartCount = ref(0) // You'd typically get this from a store
</script>
