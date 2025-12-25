<script setup>
import { useApi } from '@/composables/useApi'
import CrmOrderBarChart from '@/views/dashboards/vuexyadmin/CrmOrderBarChart.vue'
import CrmSalesAreaCharts from '@/views/dashboards/vuexyadmin/CrmSalesAreaCharts.vue'
import EcommerceStatistics from '@/views/dashboards/vuexyadmin/EcommerceStatistics.vue'
import LogisticsCardStatistics from '@/views/dashboards/vuexyadmin/LogisticsCardStatistics.vue'

definePage({
  meta: {
    title: 'Ecommerce Dashboard',
  },
})

const { data: dashboardData, execute: fetchDashboard } = await useApi(
  createUrl('/dashboard', {
    query: {
      // Add any query params if needed
    },
  })
)

const summaries = computed(() => dashboardData.value?.data?.summaries || {})

onMounted(async () => {
  await fetchDashboard()
})

</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Order -->
    <VCol cols="12" md="3" lg="2">
      <CrmOrderBarChart :data="summaries" />
    </VCol>
    <VCol cols="12" md="3" lg="2">
      <CrmSalesAreaCharts :data="summaries" />
    </VCol>

    <!-- 👉 Ecommerce Transition -->
    <VCol cols="12" md="7" lg="8">
      <EcommerceStatistics class="h-100" :data="summaries" />
    </VCol>
  </VRow>
  <VRow class="match-height mt-4">
    <VCol cols="12" md="12" lg="12">
      <LogisticsCardStatistics :data="summaries" />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core-scss/template/libs/apex-chart";
</style>
