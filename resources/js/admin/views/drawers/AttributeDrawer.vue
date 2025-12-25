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
  attribute: {
    type: Object,
    required: false,
    default: {
      id: null,
      name: '',
      status: true,
    },
  },
})

const emit = defineEmits(['update:isDrawerOpen', 'attributeCreated'])

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const refVForm = ref()
const name = ref('')
const status = ref(true)

watch(() => props.attribute, newVal => {
  if (newVal && newVal.id) {
    name.value = newVal.name
    status.value = newVal.status ? true : false
  } else {
    name.value = ''
    status.value = true
  }
}, { immediate: true })

const resetForm = () => {
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
  name.value = ''
  status.value = ''
}

const errors = ref({
  name: undefined,
  status: undefined,
})

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      let url = '/attributes'

      if (props.attribute && props.attribute.id) {
        url = `/attributes/${props.attribute.id}/update`
      }

      const { data, error } = await useApi(url, {
        method: 'POST',
        body: {
          name: name.value,
          status: status.value ? '1' : '0',
        },
      })

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to create attribute.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Attribute created successfully.')

      emit('attributeCreated')
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
    class="attribute-navigation-drawer scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="props.attribute.id ? 'Edit Attribute' : 'Add Attribute'"
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
                  placeholder="Name of the attribute"
                  :error-messages="errors.name"
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
