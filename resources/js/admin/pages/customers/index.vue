<script setup>
import { useAppStore } from "@/stores";

const appStore = useAppStore();

// Remove unused wishlist/product filters
const searchQuery = ref("");
const perPage = ref(50);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();
const selectedRows = ref([]);

// Headers for customer table
const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Avatar",
    key: "avatar",
    sortable: false,
  },
  {
    title: "Full Name",
    key: "full_name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Phone",
    key: "phone",
  },
  {
    title: "DOB",
    key: "dob",
  },
  {
    title: "Order Count",
    key: "order_count",
  },
  {
    title: "Order Total",
    key: "order_total",
  },
  {
    title: "Status",
    key: "status",
    sortable: false,
  },
  {
    title: "Email Verified",
    key: "email_verified_at",
    sortable: false,
  },
  {
    title: "Created At",
    key: "created_at",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];

// Fetch customers
const { data: itemsData, execute: fetchItems } = await useApi(
  createUrl("/customers", {
    query: {
      search: searchQuery,
      perPage,
      page,
      sortBy,
      orderBy,
    },
  })
);

const items = computed(() => itemsData.value?.data?.customers);
const totalItems = computed(() => itemsData.value?.data?.pagination.total || 0);

// Helper for status
const resolveStatusVariant = (status) => {
  if (status === 1) return "success";
  return "error";
};

// Helper for avatar text
const avatarText = (name) => {
  if (!name) return "";
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
};

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}
</script>

<template>
  <section>
    <VCol cols="12">
      <h4 class="text-h4">Customer List</h4>
    </VCol>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>

      <VCardText>
        <VRow>
          <VCol cols="12" sm="6" md="4">
            <!-- 👉 Search  -->
            <AppTextField v-model="searchQuery" label="Search" placeholder="Search by name or email" />
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
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer v-model:items-per-page="perPage" v-model:page="page" v-model:model-value="selectedRows"
        :items="items" item-value="id" :items-length="totalItems" :headers="headers" :loading="appStore.loading"
        class="text-no-wrap" @update:options="updateOptions" fixed-header height="500">
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn :to="{ name: 'customers-id', params: { id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
        </template>

        <!-- Avatar -->
        <template #item.avatar="{ item }">
          <VAvatar size="50" :variant="!item.avatar ? 'tonal' : undefined" rounded="lg" class="ma-1">
            <VImg v-if="item.avatar" :src="item.avatar" />
            <span v-else>{{ avatarText(item.full_name) }}</span>
          </VAvatar>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip :color="resolveStatusVariant(item.status)" size="small" label>
            {{ item.status_text }}
          </VChip>
        </template>

        <!-- Email Verified -->
        <template #item.email_verified_at="{ item }">
          <VChip v-if="item.email_verified_at" :color="item.email_verified_at ? 'success' : 'error'" size="small" label>
            {{ item.email_verified_at ? 'Verified' : '' }}
          </VChip>
        </template>

        <!-- pagination -->
        <template #bottom>
          <TablePagination v-model:page="page" :items-per-page="perPage" :total-items="totalItems" />
        </template>
      </VDataTableServer>
      <!-- SECTION -->
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
