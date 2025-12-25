<script setup>
import { useAppStore } from "@/stores";

const appStore = useAppStore();

const searchQuery = ref("");
const perPage = ref(50);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();
const selectedRows = ref([]);

// Headers for inquiry table
const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Subject", key: "subject", sortable: false },
  { title: "Created At", key: "created_at" },
  { title: "Message", key: "message", sortable: false },
];

// Fetch inquiries
const { data: itemsData, execute: fetchItems } = await useApi(
  createUrl("/inquiries", {
    query: {
      search: searchQuery,
      perPage,
      page,
      sortBy,
      orderBy,
    },
  })
);

const items = computed(() => itemsData.value?.data?.inquiries);
const totalItems = computed(() => itemsData.value?.data?.pagination.total || 0);

// Helper for status
const resolveStatusVariant = (status) => {
  return status === 1 ? "success" : "error";
};

const resolveStatusText = (status) => {
  return status === 1 ? "Resolved" : "Pending";
};

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const showMessageModal = ref(false)
const modalMessage = ref("")
const modalInquiry = ref(null)

function openMessageModal(item) {
  modalInquiry.value = item
  modalMessage.value = item.message
  showMessageModal.value = true
}

function closeMessageModal() {
  showMessageModal.value = false
  modalInquiry.value = null
  modalMessage.value = ""
}
</script>

<template>
  <section>
    <VCol cols="12">
      <h4 class="text-h4">Inquiry List</h4>
    </VCol>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>

      <VCardText>
        <VRow>
          <VCol cols="12" sm="6" md="4">
            <!-- 👉 Search  -->
            <AppTextField v-model="searchQuery" label="Search" placeholder="Search by fields" />
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
        <!-- Message (eye icon opens modal) -->
        <template #item.message="{ item }">
          <IconBtn @click="openMessageModal(item)">
            <VIcon icon="tabler-eye" />
          </IconBtn>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip :color="resolveStatusVariant(item.status)" size="small" label>
            {{ resolveStatusText(item.status) }}
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

  <!-- Message Modal -->
  <VDialog v-model="showMessageModal" max-width="800" top>
    <VCard>
      <VCardTitle>
        Inquiry Message #{{ modalInquiry ? modalInquiry.id : '..' }}
      </VCardTitle>
      <VCardText>
        <div v-if="modalInquiry">
          <div class="mb-2"><strong>Name:</strong> {{ modalInquiry.name }}</div>
          <div class="mb-2"><strong>Email:</strong> {{ modalInquiry.email }}</div>
          <div class="mb-2"><strong>Subject:</strong> {{ modalInquiry.subject || '-' }}</div>
          <VDivider class="my-2" />
          <div><strong>Message:</strong></div>
          <div class="mt-2" style="white-space: pre-line;">{{ modalMessage }}</div>
        </div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn border color="error" @click="closeMessageModal">Close</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
:deep(.v-data-table__td) {
  max-inline-size: 400px;
  white-space: normal !important;
  word-wrap: break-word !important;
}
</style>
