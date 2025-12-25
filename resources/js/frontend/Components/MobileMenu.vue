<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const openDropdown = ref(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const toggleDropdown = (dropdown) => {
  openDropdown.value = openDropdown.value === dropdown ? null : dropdown;
};
</script>

<template>
  <!-- Mobile Menu Button -->
  <button @click="toggleMenu" class="text-white cursor-pointer lg:hidden">
    <!-- Hamburger Icon -->
    <svg
      v-if="!isOpen"
      class="w-6 h-6 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>

    <!-- Cross Icon -->
    <svg
      v-else
      class="w-6 h-6 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Mobile Menu Content -->
  <div
    class="transition-all duration-300 ease-in-out lg:hidden overflow-y-auto"
    :class="isOpen ? 'max-h-96' : 'max-h-0'"
  >
    <div class="pb-4 pt-2">
      <!-- Search Bar Mobile -->
      <form action="/search" class="relative mb-4">
        <input
          type="text"
          placeholder="Search products..."
          class="w-full px-4 py-2 pl-10 bg-transparent border border-white/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white"
        />
        <!-- SVG Icon -->
      </form>

      <!-- Navigation Links -->
      <div class="space-y-2">
        <!-- Clothing Dropdown -->
        <div>
          <button
            @click="toggleDropdown('clothing')"
            class="w-full text-left py-2 flex items-center justify-between hover:text-gray-300 transition-colors"
          >
            Clothing & Footwear
            <svg
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': openDropdown === 'clothing' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="openDropdown === 'clothing' ? 'max-h-96' : 'max-h-0'"
          >
            <div class="pl-4 space-y-2 mt-2 pb-2">
              <Link href="/dresses" class="block py-1 text-gray-300 hover:text-white transition-colors">Dresses</Link>
              <Link href="/tops" class="block py-1 text-gray-300 hover:text-white transition-colors">Tops & Shirts</Link>
              <!-- More links -->
            </div>
          </div>
        </div>

        <Link href="/accessories" class="block py-2 hover:text-gray-300 transition-colors">Accessories</Link>
        <Link href="/beauty" class="block py-2 hover:text-gray-300 transition-colors">Beauty</Link>
      </div>
    </div>
  </div>
</template>
