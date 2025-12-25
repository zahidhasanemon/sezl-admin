<script setup>
import { useAppStore } from "@/stores";
import { activeStatusColor } from "@core/utils/helpers";
import { toast } from "vue3-toastify";
const appStore = useAppStore()

const searchQuery = ref('')
const selectedStatus = ref('all')

// Data table options
const perPage = ref(50)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const selectedRows = ref([])
const toDeleteId = ref(0)
const isConfirmDialogVisible = ref(false)

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// Headers
const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: 'Avatar',
    key: 'avatar',
    sortable: false,
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Address',
    key: 'address',
  },
  {
    title: 'Testimonial',
    key: 'testimonial',
    nowrap: false,
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Created At',
    key: 'created_at',
  },
  {
    title: 'Updated At',
    key: 'updated_at',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const {
  data: itemsData,
  execute: fetchItems,
} = await useApi(createUrl('/testimonials', {
  query: {
    search: searchQuery,
    status: selectedStatus,
    perPage,
    page,
    sortBy,
    orderBy,
  },
}))

const items = computed(() => itemsData.value?.data?.testimonials || [])
const totalItems = computed(() => itemsData.value?.data?.pagination.total || 0)

const status = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Active',
    value: '1',
  },
  {
    title: 'Inactive',
    value: '0',
  },
]

const confirmBeforeDelete = id => {
  toDeleteId.value = id
  isConfirmDialogVisible.value = true
}

const deleteItem = async val => {
  isConfirmDialogVisible.value = false

  if (val) {
    const { data, error } = await useApi(`/testimonials/${toDeleteId.value}/delete`, {
      method: 'POST',
    }).json()

    if (error.value) {
      const errorData = error.value.response?._data || {}

      toast.error(errorData.message || 'Failed to delete Testimonial.')

      return
    }

    if (data.value?.success === false) {
      toast.error(data.value?.message || 'Failed to delete Testimonial.')

      return
    }

    toast.success(data.value?.message || 'Testimonial deleted successfully.')

    await fetchItems()
  }
}
</script>

<template>
  <section>
    <VCol cols="12">
      <h4 class="text-h4">
        Testimonial List
      </h4>
    </VCol>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>

      <VCardText>
        <VRow>
          <VCol cols="12" sm="6" md="4">
            <!-- 👉 Search  -->
            <AppTextField v-model="searchQuery" label="Search" placeholder="Search" />
          </VCol>

          <!-- 👉 Select Status -->
          <VCol cols="12" sm="6" md="4">
            <AppSelect v-model="selectedStatus" label="Status" placeholder="Select Status" :items="status" dense />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VCardText class="d-flex flex-wrap gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect :model-value="perPage" :items="[
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
          ]" style="inline-size: 6.25rem;" @update:model-value="perPage = parseInt($event, 10)" />
        </div>
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Add user button -->
          <VBtn prepend-icon="tabler-plus" to="testimonials/create">
            Add New Testimonial
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer v-model:items-per-page="perPage" v-model:page="page" v-model:model-value="selectedRows"
        :items="items" item-value="id" :items-length="totalItems" :headers="headers" :loading="appStore.loading"
        class="text-no-wrap" @update:options="updateOptions" fixed-header height="500">
        <!-- Avatar -->
        <template #item.avatar="{ item }">
          <VAvatar size="34" :variant="!item.avatar ? 'tonal' : undefined">
            <VImg v-if="item.avatar" :src="item.avatar" />
            <span v-else>{{ avatarText(item.name) }}</span>
          </VAvatar>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip :color="activeStatusColor(item.status)" size="small" label class="text-capitalize">
            {{ item.status_text }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <IconBtn :to="{ name: 'testimonials-id-edit', params: { id: item.id } }">
              <VIcon icon="tabler-pencil" />
            </IconBtn>

            <IconBtn @click="confirmBeforeDelete(item.id)">
              <VIcon icon="tabler-trash" />
            </IconBtn>
          </div>
        </template>

        <!-- pagination -->
        <template #bottom>
          <TablePagination v-model:page="page" :items-per-page="perPage" :total-items="totalItems" />
        </template>
      </VDataTableServer>
      <!-- SECTION -->

      <ConfirmDialog v-model:is-dialog-visible="isConfirmDialogVisible"
        confirmation-title="This action cannot be undone."
        confirmation-question="Are you sure you want to delete this Testimonial?"
        confirm-msg="Testimonial deleted successfully." cancel-title="Cancel" cancel-msg="Keep this Testimonial"
        @confirm="deleteItem" />
    </VCard>
  </section>
</template>

<style scoped>
/* Enable text wrapping in table cells */
:deep(.v-data-table__td) {
  white-space: normal !important;
  word-wrap: break-word !important;
}

/* Optional: Set max width for specific columns */
:deep(.v-data-table__td) {
  max-inline-size: 400px;
}
</style>
