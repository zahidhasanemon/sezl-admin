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
    title: 'Image',
    key: 'avatar',
    sortable: false,
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Phone',
    key: 'phone',
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
  data: usersData,
  execute: fetchUsers,
} = await useApi(createUrl('/admins', {
  query: {
    search: searchQuery,
    status: selectedStatus,
    perPage,
    page,
    sortBy,
    orderBy,
  },
}))

const users = computed(() => usersData.value?.data?.admins)
const totalUsers = computed(() => usersData.value?.data?.pagination.total || 0)

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
    const { data, error } = await useApi(`/admins/${toDeleteId.value}/delete`, {
      method: 'POST',
    }).json()

    if (error.value) {
      const errorData = error.value.response?._data || {}

      toast.error(errorData.message || 'Failed to delete admin.')

      return
    }

    if (data.value?.success === false) {
      toast.error(data.value?.message || 'Failed to delete admin.')

      return
    }

    toast.success(data.value?.message || 'Admin deleted successfully.')

    await fetchUsers()
  }
}
</script>

<template>
  <section>
    <VCol cols="12">
      <h4 class="text-h4">
        Admin List
      </h4>
    </VCol>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>

      <VCardText>
        <VRow>
          <VCol cols="12" sm="6" md="3">
            <!-- 👉 Search  -->
            <AppTextField v-model="searchQuery" label="Name/Email/Phone" placeholder="Search" />
          </VCol>

          <!-- 👉 Select Status -->
          <VCol cols="12" sm="6" md="3">
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
          <VBtn prepend-icon="tabler-plus" to="admins/create">
            Add New Admin
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer v-model:items-per-page="perPage" v-model:page="page" v-model:model-value="selectedRows"
        :items="users" item-value="id" :items-length="totalUsers" :headers="headers" :loading="appStore.loading"
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
          <IconBtn :to="{ name: 'admins-id-change-password', params: { id: item.id } }">
            <VIcon icon="tabler-lock" />
          </IconBtn>

          <IconBtn :to="{ name: 'admins-id-edit', params: { id: item.id } }">
            <VIcon icon="tabler-pencil" />
          </IconBtn>

          <IconBtn @click="confirmBeforeDelete(item.id)" :disabled="item.id === 1">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <TablePagination v-model:page="page" :items-per-page="perPage" :total-items="totalUsers" />
        </template>
      </VDataTableServer>
      <!-- SECTION -->

      <ConfirmDialog v-model:is-dialog-visible="isConfirmDialogVisible" confirm-title="Delete Admin"
        confirmation-question="Are you sure you want to delete this admin?"
        confirmation-title="This action cannot be undone." confirm-msg="This action cannot be undone."
        cancel-title="Cancel" cancel-msg="Keep this Admin" @confirm="deleteItem" />
    </VCard>
  </section>
</template>
