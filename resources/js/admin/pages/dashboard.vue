<script setup>
import { useApi } from '@/composables/useApi';

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

const keyMetrics = computed(() => [
  {
    title: 'Total Pages',
    value: Number(summaries.value.total_pages || 0).toLocaleString(),
  },
  {
    title: 'Active Job Openings',
    value: Number(summaries.value.total_open_jobs || 0).toLocaleString(),
  },
  {
    title: 'New Job Applications',
    value: Number(summaries.value.total_job_applications || 0).toLocaleString(),
  },
  {
    title: 'New Contact Messages',
    value: Number(summaries.value.total_contact_messages || 0).toLocaleString(),
  },
]);
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <h4 class="text-h4 mb-6">Dashboard</h4>
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <VRow class="match-height">
          <VCol v-for="(metric, index) in keyMetrics" :key="index" cols="12" sm="6" md="3">
            <div class="key-metric-card pa-4 rounded" style="background-color: #f1f5f9;">
              <div class="text-caption text-medium-emphasis mb-1">
                {{ metric.title }}
              </div>
              <div class="text-h4 font-weight-semibold text-high-emphasis">
                {{ metric.value }}
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
@use "@core-scss/template/libs/apex-chart";
</style>
