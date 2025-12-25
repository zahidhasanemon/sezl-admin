<script setup>
import { useApi } from "@/composables/useApi"
import { toast } from "vue3-toastify"

import { ref } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Object,
    required: false,
    default: {
      id: null,
      title: '',
      status: true,
    },
  },
})

const emit = defineEmits(['update:isDrawerOpen', 'categoryCreated'])

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const refVForm = ref()
const title = ref('')
const status = ref(true)

watch(() => props.category, newVal => {
  if (newVal && newVal.id) {
    title.value = newVal.title
    status.value = newVal.status ? true : false
  } else {
    title.value = ''
    status.value = true
  }
}, { immediate: true })

const resetForm = () => {
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
  title.value = ''
  status.value = ''
}

const errors = ref({
  title: undefined,
  status: undefined,
})

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      let url = '/faq-categories'

      if (props.category && props.category.id) {
        url = `/faq-categories/${props.category.id}/update`
      }

      const { data, error } = await useApi(url, {
        method: 'POST',
        body: {
          title: title.value,
          status: status.value ? '1' : '0',
        },
      })

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to create category.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Category created successfully.')

      emit('categoryCreated')
      resetForm()
    }
  })
}
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    temporary
    location="end"
    width="370"
    border="none"
    class="category-navigation-drawer scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="props.category.id ? 'Edit Category' : 'Add Category'"
      @cancel="$emit('update:isDrawerOpen', false)"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol
                class="pb-0"
                cols="12"
              >
                <AppTextField
                  v-model="title"
                  label="Title"
                  :rules="[requiredValidator]"
                  placeholder="Title"
                  :error-messages="errors.title"
                />
              </VCol>

              <VCol
                class="pb-0"
                cols="12"
              >
                <div class="d-flex align-center gap-3">
                  <VSwitch v-model="status" />
                  <span>{{ status ? 'Active' : 'Inactive' }}</span>
                </div>
              </VCol>

              <VCol cols="12">
                <div class="d-flex justify-start">
                  <VBtn
                    type="submit"
                    color="primary"
                    class="me-4"
                  >
                    Submit
                  </VBtn>
                  <VBtn
                    color="error"
                    variant="tonal"
                    @click="resetForm"
                  >
                    Cancel
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss">
.category-navigation-drawer {
  .ProseMirror {
    min-block-size: 9vh !important;

    p {
      margin-block-end: 0;
    }

    p.is-editor-empty:first-child::before {
      block-size: 0;
      color: #adb5bd;
      content: attr(data-placeholder);
      float: inline-start;
      pointer-events: none;
    }

    &-focused {
      outline: none;
    }

    ul,
    ol {
      padding-inline: 1.125rem;
    }
  }

  .is-active {
    border-color: rgba(var(--v-theme-primary), var(--v-border-opacity)) !important;
    background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));
    color: rgb(var(--v-theme-primary));
  }
}
</style>
