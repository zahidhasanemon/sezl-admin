<script setup>
import { useApi } from "@/composables/useApi"
import { toast } from "vue3-toastify"

import { ref, watch } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  attributeItem: {
    type: Object,
    required: false,
    default: {
      id: null,
      attribute_id: null,
      name: '',
      additional_information: '',
      status: true,
    },
  },
})

const emit = defineEmits(['update:isDrawerOpen', 'attributeItemCreated'])

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const refVForm = ref()
const attribute_id = ref(null)
const name = ref('')
const additional_information = ref('')
const status = ref(true)
const attributes = ref([])

// Fetch attributes for dropdown
const fetchAttributes = async () => {
  const { data } = await useApi(createUrl('attribute-items/attributes', {
    query: {
      status: 'all',
    },
  }))

  if (data.value?.data?.attributes) {
    attributes.value = data.value.data.attributes
  }
}

// Fetch attributes on component mount
fetchAttributes()

watch(() => props.attributeItem, newVal => {
  if (newVal && newVal.id) {
    attribute_id.value = newVal.attribute_id
    name.value = newVal.name
    additional_information.value = newVal.additional_information || ''
    status.value = newVal.status ? true : false
  } else {
    attribute_id.value = null
    name.value = ''
    additional_information.value = ''
    status.value = true
  }
}, { immediate: true })

const resetForm = () => {
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
  attribute_id.value = null
  name.value = ''
  additional_information.value = ''
  status.value = true
}

const errors = ref({
  attribute_id: undefined,
  name: undefined,
  additional_information: undefined,
  status: undefined,
})

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      let url = '/attribute-items'

      if (props.attributeItem && props.attributeItem.id) {
        url = `/attribute-items/${props.attributeItem.id}/update`
      }

      const { data, error } = await useApi(url, {
        method: 'POST',
        body: {
          attribute_id: attribute_id.value,
          name: name.value,
          additional_information: additional_information.value,
          status: status.value ? '1' : '0',
        },
      })

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to create attribute item.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Attribute item created successfully.')

      emit('attributeItemCreated')
      resetForm()
    }
  })
}
</script>

<template>
  <VNavigationDrawer :model-value="props.isDrawerOpen" temporary location="end" width="370" border="none"
    class="attribute-navigation-drawer scrollable-content" @update:model-value="handleDrawerModelValueUpdate">
    <!-- 👉 Header -->
    <AppDrawerHeaderSection :title="props.attributeItem.id ? 'Edit Attribute Item' : 'Add Attribute Item'"
      @cancel="$emit('update:isDrawerOpen', false)" />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol class="pb-0" cols="12">
                <AppSelect v-model="attribute_id" label="Attribute" :items="attributes" :rules="[requiredValidator]"
                  placeholder="Select an attribute" :error-messages="errors.attribute_id" />
              </VCol>

              <VCol class="pb-0" cols="12">
                <AppTextField v-model="name" label="Name" :rules="[requiredValidator]"
                  placeholder="Name of the attribute item" :error-messages="errors.name" />
              </VCol>

              <VCol class="pb-0" cols="12">
                <AppTextField v-model="additional_information" label="Additional Information"
                  placeholder="E.g., #FF0000 for colors, Standard for sizes"
                  :error-messages="errors.additional_information" />
              </VCol>

              <VCol class="pb-0" cols="12">
                <div class="d-flex align-center gap-3">
                  <VSwitch v-model="status" />
                  <span>{{ status ? 'Active' : 'Inactive' }}</span>
                </div>
              </VCol>

              <VCol cols="12">
                <div class="d-flex justify-start">
                  <VBtn type="submit" color="primary" class="me-4">
                    Submit
                  </VBtn>
                  <VBtn color="error" variant="tonal" @click="resetForm">
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
.attribute-navigation-drawer {
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
