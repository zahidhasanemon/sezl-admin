<script setup>
import { useApi } from "@/composables/useApi"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const settings = ref({})
const refCreateForm = ref()

const errors = ref({})

// Fetch settings using the same pattern as index.vue
const {
  data: settingsData,
  execute: fetchSettings,
} = await useApi('/settings')

const onSubmit = () => {
  refCreateForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const { data, error } = await useApi('/settings', {
        method: 'POST',
        body: {
          settings: settings.value
        },
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to update settings.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Settings updated successfully.')
      
      await fetchSettings()
    }
  })
}

// Watch for settings data changes
watchEffect(() => {
  if (settingsData.value?.data?.settings) {
    settings.value = { ...settingsData.value.data.settings }
  }
})

definePage({
  meta: {
    action: ['user-settings-manage'],
    subject: ['Settings'],
    navActiveLink: 'settings',
    title: 'Settings',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Manage Settings
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard title="Settings Information">
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refCreateForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol 
                v-for="(value, key) in settings" 
                :key="key" 
                cols="12"
              >
                <AppTextarea 
                  v-model="settings[key]" 
                  :label="key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())" 
                  :placeholder="`Enter ${key.replace(/_/g, ' ')}`"
                  :rows="1"
                  :error-messages="errors[key]" 
                />
              </VCol>

              <VCol cols="12" class="d-flex gap-4">
                <VBtn type="submit">
                  Update Settings
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
