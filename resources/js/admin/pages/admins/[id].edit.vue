<script setup>
import { useApi } from "@/composables/useApi"
import { useAuthStore } from '@/stores/auth'
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const route = useRoute('admins-id-edit')
const router = useRouter()


const userId = ref(0)
const name = ref("")
const email = ref("")
const avatar = ref(null)
const status = ref(true)
const existingAvatar = ref()
const refUpdateForm = ref()
const authStore = useAuthStore()
const loggedinUser = authStore.adminData

const errors = ref({
  name: undefined,
  email: undefined,
  avatar: undefined,
  status: undefined,
})

userId.value = route.params.id

const { data } = await useApi(`/admins/${route.params.id}`)


const fetchUser = data._value.data.admin

name.value = fetchUser.name || ""
email.value = fetchUser.email || ""
status.value = fetchUser.status == 1 ? true : false
existingAvatar.value = fetchUser.avatar || null

const loadImage = () => {
  const file = avatar.value
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      existingAvatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    existingAvatar.value = fetchUser.avatar || null
  }
}

const onSubmit = () => {
  refUpdateForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const formData = new FormData()

      formData.append('name', name.value)
      formData.append('email', email.value)
      formData.append('status', status.value ? '1' : '0')

      if (avatar.value && avatar.value.length > 0) {
        const file = avatar.value[0]

        formData.append('avatar', file)
      } else if (avatar.value && avatar.value instanceof File) {
        formData.append('avatar', avatar.value)
      }

      const { data, error } = await useApi(`/admins/${userId.value}/update`, {
        method: 'POST',
        body: formData,
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to update admin.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      if (loggedinUser.id == userId.value) {
        const admin = data.value?.data?.admin
        if (admin) {
          authStore.updateUserProfile(admin)
        }
      }

      toast.success(data.value?.message || 'Admin updated successfully.')

      router.push({ name: 'admins' })
    }
  })
}


definePage({
  meta: {
    action: ['user-admins-update'],
    subject: ['Admin'],
    navActiveLink: 'admins',
    title: 'Edit Admin',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Edit Admin
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard title="Admin Information">
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refUpdateForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="name" label="Name" placeholder="Enter Name" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator]" :error-messages="errors.name" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="email" label="Email" placeholder="Enter Email" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator, emailValidator]" :error-messages="errors.email" />
              </VCol>
              <VCol cols="12" md="6" class="d-flex gap-2 pb-1">
                <VFileInput v-model="avatar" label="User Photo" class="mb-3" accept=".jpeg,.png,.jpg,.gif,.svg,.webp"
                  :error-messages="errors.avatar" @update:model-value="loadImage" />

                <VAvatar size="34" :variant="!existingAvatar ? 'tonal' : undefined">
                  <VImg v-if="existingAvatar" :src="existingAvatar" />
                  <span v-else>{{ avatarText(name) }}</span>
                </VAvatar>
              </VCol>
              <VCol cols="12" md="4">
                <VCheckbox v-model="status" label="Active" :error-messages="errors.status" />
              </VCol>

              <VCol cols="12" class="d-flex gap-4">
                <VBtn type="submit">
                  Submit
                </VBtn>
                <VBtn type="button" variant="tonal" color="error" :to="{ name: 'admins' }">
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.v-field__input {
  overflow: hidden;
}
</style>
