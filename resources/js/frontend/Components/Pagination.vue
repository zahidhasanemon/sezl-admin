<script setup>
import { defineEmits, defineProps, computed } from 'vue';

const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['paginate']);

// Create a simple pages array for pagination buttons (shows first few pages + last page)
const pages = computed(() => {
  const current = props.meta.current_page;
  const last = props.meta.last_page;

  const pageNumbers = [];

  // Show pages from 1 to current+2 or last page whichever smaller
  const maxPageShown = Math.min(current + 2, last);

  for (let i = 1; i <= maxPageShown; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
});

const showLastPage = computed(() => {
  return props.meta.last_page > 6 && props.meta.current_page + 2 < props.meta.last_page;
});

const lastPageGap = computed(() => {
  return props.meta.last_page > 6 && props.meta.current_page + 2 < props.meta.last_page;
});

const changePage = page => {
  if (page >= 1 && page <= props.meta.last_page && page !== props.meta.current_page) {
    emit('paginate', page);
  }
}
</script>

<template>
  <div v-if="meta.last_page > 1" class="flex items-center justify-center mt-6 lg:mt-8 gap-1 sm:gap-2">
    <!-- Previous Button -->
    <button
      class="flex items-center gap-1 cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-gray rounded-lg hover:bg-gray-50 transition-colors"
      :disabled="meta.current_page === 1" @click="changePage(meta.current_page - 1)">
      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      <span class="hidden sm:inline">Previous</span>
      <span class="sm:hidden">Prev</span>
    </button>

    <!-- Page Numbers -->
    <button v-for="page in pages" :key="page" @click="changePage(page)" :class="[
      'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg min-w-6 sm:min-w-8 cursor-pointer transition-colors',
      page === meta.current_page
        ? 'bg-primary-black text-white'
        : 'text-primary-gray hover:bg-gray-50'
    ]" :aria-current="page === meta.current_page ? 'page' : null">
      {{ page }}
    </button>

    <span v-if="lastPageGap" class="px-1 sm:px-2 text-xs sm:text-sm text-primary-gray">...</span>

    <button v-if="showLastPage" @click="changePage(meta.last_page)"
      class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-primary-gray hover:bg-gray-50 rounded-lg min-w-6 sm:min-w-8 cursor-pointer transition-colors">
      {{ meta.last_page }}
    </button>

    <!-- Next Button -->
    <button
      class="flex cursor-pointer items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-gray rounded-lg hover:bg-gray-50 transition-colors"
      :disabled="meta.current_page === meta.last_page" @click="changePage(meta.current_page + 1)">
      <span class="hidden sm:inline">Next</span>
      <span class="sm:hidden">Next</span>
      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</template>
