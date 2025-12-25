<script setup>
import { useApi } from "@/composables/useApi"
import { toast } from "vue3-toastify"

import { computed, ref, watch } from 'vue'
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
      name: '',
      parent_id: null,
      description: '',
      status: true,
      featured: false,
    },
  },
})

const emit = defineEmits(['update:isDrawerOpen', 'categoryCreated'])

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const refVForm = ref()
const name = ref('')
const parent_id = ref(null)
const description = ref('')
const status = ref(true)
const featured = ref(false)
const image = ref(null)
const imagePreview = ref(null)

// Fetch parent categories
const parentCategoriesData = ref(null)
const parentCategories = computed(() => parentCategoriesData.value?.data?.categories || [])

const fetchParentCategories = async () => {
  const { data } = await useApi('/parent-categories')
  parentCategoriesData.value = data.value
}

// Initial fetch
await fetchParentCategories()

// Watch for drawer opening and refetch only for new category
watch(() => props.isDrawerOpen, async (newVal) => {
  if (newVal && !props.category?.id) {
    await fetchParentCategories()
  }
})

watch(() => props.category, newVal => {
  if (newVal && newVal.id) {
    name.value = newVal.name
    parent_id.value = newVal.parent_id || null
    description.value = newVal.description
    status.value = newVal.status ? true : false
    featured.value = newVal.featured ? true : false
    imagePreview.value = newVal.image
    image.value = null
  } else {
    name.value = ''
    parent_id.value = null
    description.value = ''
    status.value = true
    featured.value = false
    image.value = null
    imagePreview.value = null
  }
}, { immediate: true })

const onImageChange = event => {
  const file = event.target.files[0]
  if (file) {
    image.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const resetForm = () => {
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
  name.value = ''
  parent_id.value = null
  description.value = ''
  status.value = true
  featured.value = false
  image.value = null
  imagePreview.value = null
}

const errors = ref({
  name: undefined,
  parent_id: undefined,
  description: undefined,
  status: undefined,
  featured: undefined,
  image: undefined,
})

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      let url = '/categories'

      if (props.category && props.category.id) {
        url = `/categories/${props.category.id}/update`
      }

      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('parent_id', parent_id.value || 0)
      formData.append('description', description.value || '')
      formData.append('status', status.value ? '1' : '0')
      formData.append('featured', featured.value ? '1' : '0')
      if (image.value) {
        formData.append('image', image.value)
      }

      const { data, error } = await useApi(url, {
        method: 'POST',
        body: formData,
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
                  v-model="name"
                  label="Name"
                  :rules="[requiredValidator]"
                  placeholder="Category Name"
                  :error-messages="errors.name"
                />
              </VCol>

              <VCol
                class="pb-0"
                cols="12"
              >
                <AppSelect
                  v-model="parent_id"
                  label="Parent Category"
                  :items="parentCategories"
                  placeholder="Select Parent Category"
                  clearable
                  :error-messages="errors.parent_id"
                />
              </VCol>

              <VCol
                class="pb-0"
                cols="12"
              >
                <AppTextarea
                  v-model="description"
                  label="Description"
                  placeholder="Category Description"
                  rows="3"
                  :error-messages="errors.description"
                />
              </VCol>

              <VCol
                class="pb-0"
                cols="12"
              >
                <VFileInput
                  accept="image/*"
                  label="Image"
                  placeholder="Upload Image"
                  prepend-icon=""
                  prepend-inner-icon="tabler-photo"
                  :error-messages="errors.image"
                  @change="onImageChange"
                />
                <VImg
                  v-if="imagePreview"
                  :src="imagePreview"
                  max-height="150"
                  class="mt-2 rounded"
                />
              </VCol>

              <VCol
                class="pb-0 d-flex gap-6"
                cols="12"
              >
                <div class="d-flex align-center gap-3">
                  <VSwitch v-model="status" />
                  <span>{{ status ? 'Active' : 'Inactive' }}</span>
                </div>
                
                <div class="d-flex align-center gap-3">
                  <VSwitch v-model="featured" />
                  <span>{{ featured ? 'Featured' : 'Not Featured' }}</span>
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
