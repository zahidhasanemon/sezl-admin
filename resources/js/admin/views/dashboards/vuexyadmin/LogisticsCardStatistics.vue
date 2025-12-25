<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const statusMeta = {
  pending: { icon: 'tabler-clock', color: 'warning' },
  confirmed: { icon: 'tabler-check', color: 'success' },
  processing: { icon: 'tabler-a-b-2', color: 'info' },
  in_transit: { icon: 'tabler-truck', color: 'primary' },
  delivered: { icon: 'tabler-checks', color: 'success' },
  cancelled: { icon: 'tabler-x', color: 'error' },
}

const logisticData = computed(() => {
  const statusCounts = props.data.status_counts || {}

  if (!statusCounts) return []

  return Object.entries(statusCounts).map(([key, value]) => ({
    icon: statusMeta[key]?.icon || 'tabler-info-circle',
    color: statusMeta[key]?.color || 'primary',
    title: value.label,
    value: value.count,
    isHover: false,
  }))
})
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in logisticData"
      :key="index"
      cols="12"
      md="2"
      sm="4"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? `border-block-end-color: rgb(var(--v-theme-${data.color}))` : `border-block-end-color: rgba(var(--v-theme-${data.color}),0.38)`"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-1">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <h4 class="text-h4">
                {{ data.value }}
              </h4>
            </div>
            <div class="text-body-1 mb-1">
              {{ data.title }}
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core-scss/base/mixins" as mixins;

.logistics-card-statistics {
  border-block-end-style: solid;
  border-block-end-width: 2px;

  &:hover {
    border-block-end-width: 3px;
    margin-block-end: -1px;

    @include mixins.elevation(8);

    transition: all 0.1s ease-out;
  }
}

.skin--bordered {
  .logistics-card-statistics {
    border-block-end-width: 2px;

    &:hover {
      border-block-end-width: 3px;
      margin-block-end: -2px;
      transition: all 0.1s ease-out;
    }
  }
}
</style>
