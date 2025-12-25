<script setup>
import { useCartStore } from '@/stores';
import mainLogo from '@images/frontend/logo/logo-main.png';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

defineProps({
  user: Object
});

const page = usePage();
const cartStore = useCartStore()
const categories = computed(() => page.props.navigation?.categories || []);
const wishlistCount = computed(() => page.props.auth?.user?.wishlist_count || 0);
// const cartCount = computed(() => page.props.auth?.user?.cart_count || 0);
const notificationCount = computed(() => page.props.auth?.user?.notifications_count || 0);

const cartCount = computed(() => {
  if (page.props.auth?.user) {
    return page.props.auth.user.cart_count || 0
  } else {
    return cartStore.count
  }
})

// Mobile menu state
const isMobileMenuOpen = ref(false);
const navRef = ref(null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (navRef.value && !navRef.value.contains(event.target) && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Search functionality
const searchQuery = ref('');
onMounted(() => {
  searchQuery.value = page.props.appliedFilters?.search || '';
  // Add click event listener to document
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  // Remove click event listener when component is unmounted
  document.removeEventListener('click', handleClickOutside);
});

const suggestions = ref([])
const debounceTimer = ref(null)

const fetchSuggestions = async query => {
  try {
    const res = await fetch(`/products/search/suggestion?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await res.json();
    suggestions.value = data
  } catch (err) {
    console.error(err)
  }
}

watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimer.value)
  if (!newVal) {
    suggestions.value = []
    return
  }
  debounceTimer.value = setTimeout(() => {
    fetchSuggestions(newVal)
  }, 300)
})

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.value.trim()) {
    router.get('/products', { search: searchQuery.value });
  }
};

watch(
  () => page.props.appliedFilters?.search,
  (newSearch) => {
    searchQuery.value = newSearch || '';
  }
);

const logout = () => {
  router.post('/logout');
  toast.error('Logged out successfully.');
};
</script>

<template>
  <header class="bg-primary-black text-white sticky top-0 z-10">
    <nav class="container" ref="navRef">
      <div class="flex items-center justify-between py-2.5 lg:py-4 gap-3">
        <!-- Logo -->
        <Link href="/" class="">
          <img :src="mainLogo" alt="VuexyAdmin" class="h-10 md:h-14" />
        </Link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8 max-[1150px]:gap-4">
          <template v-for="category in categories">
            <div v-if="category.children && category.children.length" :key="'parent' + category.id"
              class="relative group">
              <button class="nav-link flex items-center gap-1 hover:text-gray-300 transition-colors">
                {{ category.name }}
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                class="absolute top-full left-0 mt-2 w-56 bg-white text-primary-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <Link v-for="subCategory in category.children" :key="'child' + subCategory.id"
                    :href="`/categories/${subCategory.slug}`"
                    class="block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray">
                    {{ subCategory.name }}
                  </Link>
                </div>
              </div>
            </div>

            <Link v-else :key="category.id" :href="`/categories/${category.slug}`"
              class="nav-link hover:text-gray-300 transition-colors">
              {{ category.name }}
            </Link>
          </template>

          <Link href="/products?sale=true" class="nav-link hover:text-gray-300 transition-colors">
            Sale
          </Link>
        </div>

        <!-- Right Side Actions -->
        <div class="hidden lg:flex items-center gap-4">
          <!-- Search Bar -->
          <!-- <form @submit="handleSearch" class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="w-52 px-4 py-2 pl-10 bg-transparent border border-white rounded-full text-white placeholder-white focus:outline-none transition-colors" />
            <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </form> -->
          <div class="relative">
            <form @submit.prevent="handleSearch" class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="w-52 px-4 py-2 pl-10 pr-8 bg-transparent border border-white rounded-full text-white placeholder-white focus:outline-none transition-colors" />
              <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>

              <!-- Clear Icon -->
              <button v-if="searchQuery" type="button" @click="searchQuery = ''; suggestions = []"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                ✕
              </button>
            </form>

            <!-- Suggestions Dropdown -->
            <ul v-if="suggestions.length"
              class="absolute mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
              <li v-for="product in suggestions" :key="product.id" class="hover:bg-gray-100 transition-colors">
                <Link :href="`/products/${product.slug}`" class="flex items-center gap-3 px-4 py-2 cursor-pointer"
                  @click="searchQuery = ''; suggestions = []">
                  <!-- Thumbnail -->
                  <img :src="product.default_image" alt="product image" class="w-10 h-10 object-cover rounded" />

                  <!-- Product Info -->
                  <span class="text-sm font-medium truncate">
                    {{ product.name }}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <!-- Conditional: Sign In or User Profile -->
          <template v-if="!user">
            <Link href="/login"
              class="flex items-center gap-2 px-4 py-2 border border-white rounded-full hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Signup/ Signin
            </Link>
          </template>

          <template v-else>
            <div class="relative group">
              <button class="nav-link flex items-center gap-1 hover:text-gray-300 transition-colors">
                <img v-if="user.avatar" :src="user.avatar" class="w-8 h-8 rounded-full">
                <svg v-else stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32"
                  class="size-7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z">
                  </path>
                </svg>
                {{ user.first_name }}
              </button>

              <!-- Dropdown Menu -->
              <div
                class="absolute top-full left-0 mt-2 w-56 bg-white text-primary-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <Link href="/profile" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray">
                    Profile
                  </Link>
                  <Link href="/my-orders" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray">
                    Orders
                  </Link>
                  <button @click="logout"
                    class="w-full text-left block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </template>

          <template v-if="user">
            <!-- Notification icon with badge -->
            <Link href="/notifications" class="relative hover:text-gray-300 transition-colors mr-2">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961"
                  stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span v-if="notificationCount > 0"
                class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2">
                {{ notificationCount }}
              </span>
            </Link>

            <!-- Favorite Icon -->
            <Link href="/wishlist" class="hover:text-gray-300 transition-colors relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z"
                  fill="#E9E9E9" />
              </svg>
              <span v-if="wishlistCount > 0"
                class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full">
                {{ wishlistCount }}
              </span>
            </Link>
          </template>

          <!-- Cart Icon -->
          <Link href="/cart" class="hover:text-gray-300 transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z"
                stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z"
                stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348"
                stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span v-if="cartCount > 0"
              class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full">
              {{ cartCount }}
            </span>
          </Link>
        </div>

        <!-- Mobile Icons and Menu Button -->
        <div class="flex lg:hidden items-center gap-3">
          <template v-if="user">
            <!-- Notification icon with badge -->
            <Link href="/notifications" class="relative hover:text-gray-300 transition-colors mr-2">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961"
                  stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span v-if="notificationCount > 0"
                class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2">
                {{ notificationCount }}
              </span>
            </Link>

            <!-- Favorite Icon -->
            <Link href="/wishlist" class="relative hover:text-gray-300 transition-colors mr-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z"
                  fill="#E9E9E9" />
              </svg>
              <span v-if="wishlistCount > 0"
                class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2">
                {{ wishlistCount }}
              </span>
            </Link>
          </template>

          <!-- Cart Icon -->
          <Link href="/cart" class="relative hover:text-gray-300 transition-colors mr-2">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z"
                stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z"
                stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348"
                stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span v-if="cartCount > 0"
              class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2">
              {{ cartCount }}
            </span>
          </Link>

          <!-- Mobile Menu Button -->
          <button @click.stop="toggleMobileMenu" class="text-white cursor-pointer">
            <!-- Hamburger Icon -->
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <!-- Cross Icon -->
            <svg v-else class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="transition-all duration-300 ease-in-out lg:hidden overflow-hidden"
        :class="isMobileMenuOpen ? 'max-h-96' : 'max-h-0'">
        <div class="pb-4 pt-2 overflow-y-auto mobile-menu-scrollbar" style="max-block-size: 400px;">
          <!-- Search Bar Mobile -->
          <!-- <form @submit="handleSearch" class="relative mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="w-full px-4 py-2 pl-10 bg-transparent border border-white/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white" />
            <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </form> -->
          <div class="relative mb-4 w-full max-w-md">
            <!-- Search Form -->
            <form @submit.prevent="handleSearch" class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="w-full px-4 py-2 pl-10 pr-10 bg-transparent border border-white/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white" />

              <!-- Search Icon -->
              <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>

              <!-- Clear Icon -->
              <button v-if="searchQuery" type="button" @click="searchQuery = ''; suggestions = []"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                ✕
              </button>
            </form>

            <!-- Suggestions Dropdown -->
            <ul v-if="suggestions.length"
              class="absolute mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
              <li v-for="product in suggestions" :key="product.id" class="hover:bg-gray-100 transition-colors">
                <Link :href="`/products/${product.slug}`" class="flex items-center gap-3 px-4 py-2 cursor-pointer"
                  @click="searchQuery = ''; suggestions = []">
                  <!-- Thumbnail -->
                  <img :src="product.default_image" alt="product image" class="w-10 h-10 object-cover rounded" />

                  <!-- Product Name -->
                  <span class="text-sm font-medium truncate">
                    {{ product.name }}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-2">
            <template v-for="category in categories">
              <!-- Category with children -->
              <div v-if="category.children && category.children.length" :key="'mobile-parent-' + category.id">
                <button @click="category.showChildren = !category.showChildren"
                  class="w-full text-left py-2 flex items-center justify-between hover:text-gray-300 transition-colors">
                  {{ category.name }}
                  <svg class="w-4 h-4 transition-transform duration-300"
                    :class="{ 'rotate-180': category.showChildren }" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div class="transition-all duration-300 ease-in-out overflow-hidden"
                  :class="category.showChildren ? 'max-h-96' : 'max-h-0'">
                  <div class="pl-4 space-y-2 mt-2 pb-2">
                    <Link v-for="child in category.children" :key="'mobile-child-' + child.id"
                      :href="`/categories/${child.slug}`"
                      class="block py-1 text-gray-300 hover:text-white transition-colors"
                      @click="isMobileMenuOpen = false">
                      {{ child.name }}
                    </Link>
                  </div>
                </div>
              </div>

              <!-- Category without children -->
              <Link v-else :key="'mobile-' + category.id" :href="`/categories/${category.slug}`"
                class="block py-2 hover:text-gray-300 transition-colors" @click="isMobileMenuOpen = false">
                {{ category.name }}
              </Link>
            </template>

            <Link href="/products?sale=true" class="block py-2 hover:text-gray-300 transition-colors"
              @click="isMobileMenuOpen = false">
              Sale
            </Link>

            <!-- User Actions -->
            <template v-if="!user">
              <Link href="/login"
                class="block py-2 hover:text-gray-300 transition-colors mt-4 border-t border-white/20 pt-4"
                @click="isMobileMenuOpen = false">
                Signup/Signin
              </Link>
            </template>
            <template v-else>
              <Link href="/profile"
                class="block py-2 hover:text-gray-300 transition-colors mt-4 border-t border-white/20 pt-4"
                @click="isMobileMenuOpen = false">
                Profile ({{ user.first_name }})
              </Link>
              <Link href="/my-orders"
                class="block py-2 hover:text-gray-300 transition-colors mt-4 border-t border-white/20 pt-4"
                @click="isMobileMenuOpen = false">
                Orders
              </Link>
              <Link href="/logout" method="post" as="button"
                class="block w-full text-left py-2 hover:text-gray-300 transition-colors"
                @click="isMobileMenuOpen = false">
                Logout
              </Link>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
