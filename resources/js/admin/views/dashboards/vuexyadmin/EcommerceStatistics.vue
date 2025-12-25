<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const statistics = computed(() => {
  const stats = props.data.statistics || {}
  return [{
    title: 'Orders',
    stats: stats?.total_orders || 0,
    icon: 'tabler-shopping-cart',
    color: 'secondary',
  },
  {
    title: 'Products',
    stats: stats?.products || 0,
    icon: 'tabler-parking-circle',
    color: 'primary',
  },
  {
    title: 'Customers',
    stats: stats?.customers || 0,
    icon: 'tabler-users',
    color: 'info',
  },
  {
    title: 'Refunded Orders',
    stats: stats?.total_refunded_orders || 0,
    icon: 'tabler-rotate-clockwise',
    color: 'warning',
  },
  {
    title: 'Refunded Amount',
    stats: `$${stats?.total_refunded_amount || 0}`,
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
  ]
})
const updatedAt = computed(() => props.data.statistics?.updated_at || '')
</script>

<template>
  <VCard title="Statistics">
    <template #append>
      <span class="text-sm text-disabled">Updated {{ updatedAt }}</span>
    </template>

    <VCardText>
      <VRow>
        <VCol v-for="item in statistics" :key="item.title">
          <div class="d-flex align-center gap-4 mt-md-9 mt-0">
            <VAvatar :color="item.color" variant="tonal" rounded size="40">
              <VIcon :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <h5 class="text-h5">
                {{ item.stats }}
              </h5>
              <div class="text-sm">
                {{ item.title }}
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
