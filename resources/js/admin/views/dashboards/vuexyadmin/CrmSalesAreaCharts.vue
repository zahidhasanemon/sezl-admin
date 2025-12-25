<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
const totalSales = computed(() => props.data.total_sales || 0)
const salesChange = computed(() => props.data.sales_this_year?.change || 0)
// const series = ref([{ name: 'Sales', data: [] }])
const series = [{
  name: 'Sales',
  data: [
    200,
    55,
    400,
    250,
  ],
}]

const chartOptions = {
  chart: {
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  markers: {
    colors: 'transparent',
    strokeColors: 'transparent',
  },
  grid: { show: false },
  colors: [currentTheme.success],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.07,
      stops: [
        0,
        80,
        100,
      ],
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  xaxis: {
    show: true,
    lines: { show: false },
    labels: { show: false },
    stroke: { width: 0 },
    axisBorder: { show: false },
  },
  yaxis: {
    stroke: { width: 0 },
    show: false,
  },
  tooltip: { enabled: false },
}
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle>
        Total Sales
      </VCardTitle>
      <VCardSubtitle>
        Through Web & Apps
      </VCardSubtitle>
    </VCardItem>

    <VueApexCharts
      :options="chartOptions"
      :series="series"
      :height="68"
    />

    <VCardText class="pt-1">
      <div class="d-flex align-center justify-space-between gap-x-2">
        <h4 class="text-h4 text-center">
          {{ totalSales }}
        </h4>
      </div>
    </VCardText>
  </VCard>
</template>
