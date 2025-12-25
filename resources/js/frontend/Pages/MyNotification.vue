<script setup>
import Pagination from '@/Components/Pagination.vue';
import roundLogo from '@images/frontend/logo/logo-round.png';
import { Head, Link, router } from '@inertiajs/vue3';
import moment from 'moment';
import { ref, watch } from 'vue';

const props = defineProps({
  seo: Object,
  notifications: Array,
  meta: Object,
  appliedFilters: Object,
})

const filters = ref(props.appliedFilters)

const paginate = page => {
  router.get('/notifications', { ...filters.value, page }, {
    preserveState: true,
    replace: true
  })
}

watch(filters, (value) => {
  router.get('/notifications', value, {
    preserveState: true,
    replace: true
  })
}, { deep: true })

const formatDate = date => {
  return moment(date).fromNow()
}
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description">
    </Head>

    <section class="section-padding mx-auto max-w-4xl">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="text-sm mb-4 sm:mb-6" aria-label="Breadcrumb">
          <ol class="list-reset flex text-primary-gray flex-wrap">
            <li>
              <Link href="/" class="hover:underline">Home</Link>
              <span class="mx-2">></span>
            </li>
            <li>
              <Link href="/profile" class="hover:underline">Profile</Link>
              <span class="mx-2">></span>
            </li>
            <li class="text-gray-800 font-semibold">Notifications</li>
          </ol>
        </nav>

        <div class="space-y-4 lg:space-y-6">
          <!-- Page Header -->
          <div class="mb-4 lg:mb-6">
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4">
              Notifications
            </h1>
            <p class="text-sm sm:text-sm lg:text-base">
              Stay updated with your latest orders, payments, and account activities.
            </p>
          </div>

          <!-- Search And Sort Notifications -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <!-- Search Bar -->
            <!-- <div class="relative flex-1 sm:max-w-xs">
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" placeholder="Search" class="form-control w-full !pl-10 !py-2.5" />
            </div> -->

            <!-- Sort Filter -->
            <div class="relative flex-shrink-0 min-w-56">
              <!-- Sort Icon -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 12L5.25 15L8.25 12M5.25 15V3M8.25 3H15.75M8.25 6H13.5M8.25 9H11.25" stroke="currentColor"
                  stroke-opacity="0.64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <!-- Custom Chevron Icon -->
              <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>

              <select class="form-control w-full sm:w-auto min-w-[220px] !pl-10 !py-2.5" v-model="filters.sort">
                <option value="latest">Recent</option>
                <option value="oldest">Oldest</option>
                <!-- <option value="unread">Unread First</option>
                <option value="read">Read First</option> -->
              </select>
            </div>
          </div>

          <!-- Notifications Container -->
          <div class="space-y-3 lg:space-y-4">
            <!-- Notification One -->
            <div v-for="notification in notifications" :key="notification.id"
              class="border border-border-primary rounded-lg p-3 sm:p-4 lg:p-6 hover:bg-border-primary/10 transition-all">
              <div class="flex items-start gap-3 lg:gap-4">
                <!-- Icon -->
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative bg-border-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <!-- <svg width="20" height="20" sm:width="20" sm:height="20" lg:width="22" lg:height="22"
                    viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.584 19.4798H6.41732C3.07148 19.4798 1.14648 17.5548 1.14648 14.209V7.79232C1.14648 4.44648 3.07148 2.52148 6.41732 2.52148H15.584C18.9298 2.52148 20.8548 4.44648 20.8548 7.79232V14.209C20.8548 17.5548 18.9298 19.4798 15.584 19.4798ZM6.41732 3.89648C3.79565 3.89648 2.52148 5.17065 2.52148 7.79232V14.209C2.52148 16.8307 3.79565 18.1048 6.41732 18.1048H15.584C18.2057 18.1048 19.4798 16.8307 19.4798 14.209V7.79232C19.4798 5.17065 18.2057 3.89648 15.584 3.89648H6.41732Z"
                      fill="#0F0F0F" />
                    <path
                      d="M11 14.4375C9.1025 14.4375 7.5625 12.8975 7.5625 11C7.5625 9.1025 9.1025 7.5625 11 7.5625C12.8975 7.5625 14.4375 9.1025 14.4375 11C14.4375 12.8975 12.8975 14.4375 11 14.4375ZM11 8.9375C9.86333 8.9375 8.9375 9.86333 8.9375 11C8.9375 12.1367 9.86333 13.0625 11 13.0625C12.1367 13.0625 13.0625 12.1367 13.0625 11C13.0625 9.86333 12.1367 8.9375 11 8.9375Z"
                      fill="#0F0F0F" />
                    <path
                      d="M5.04102 13.9798C4.66518 13.9798 4.35352 13.6682 4.35352 13.2923V8.70898C4.35352 8.33315 4.66518 8.02148 5.04102 8.02148C5.41685 8.02148 5.72852 8.33315 5.72852 8.70898V13.2923C5.72852 13.6682 5.41685 13.9798 5.04102 13.9798Z"
                      fill="#404040" />
                    <path
                      d="M16.959 13.9798C16.5832 13.9798 16.2715 13.6682 16.2715 13.2923V8.70898C16.2715 8.33315 16.5832 8.02148 16.959 8.02148C17.3348 8.02148 17.6465 8.33315 17.6465 8.70898V13.2923C17.6465 13.6682 17.3348 13.9798 16.959 13.9798Z"
                      fill="#404040" />
                  </svg> -->

                  <img :src="roundLogo" width="28" height="28" sm:width="28" sm:height="28" lg:width="30"
                    lg:height="30" />

                  <!-- Indicator -->
                  <!-- <div
                    class="absolute right-0.5 top-0.5 sm:right-1 sm:top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full">
                  </div> -->
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-primary-gray text-xs sm:text-sm lg:text-base mb-1">{{ notification.data.title }}</h3>
                  <p class="text-primary-black font-semibold text-sm sm:text-sm lg:text-base leading-relaxed">
                    {{ notification.data.body }}
                  </p>
                  <span class="text-xs sm:text-xs lg:text-sm text-primary-gray whitespace-nowrap">{{
                    formatDate(notification.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <Pagination :meta="meta" @paginate="paginate" />
      </div>
    </section>
  </div>
</template>
