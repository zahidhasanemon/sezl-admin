<script setup>
import { useApi } from "@/composables/useApi"
import { useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")
const avatar = ref()
const status = ref(true)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const refCreateForm = ref()

const errors = ref({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined,
  status: undefined,
})

const onSubmit = () => {
  refCreateForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const formData = new FormData()

      formData.append('name', name.value)
      formData.append('email', email.value)
      formData.append('password', password.value)
      formData.append('password_confirmation', passwordConfirmation.value)
      formData.append('status', status.value ? '1' : '0')

      if (avatar.value && avatar.value.length > 0) {
        const file = avatar.value[0]

        formData.append('avatar', file)
      } else if (avatar.value && avatar.value instanceof File) {
        formData.append('avatar', avatar.value)
      }

      const { data, error } = await useApi('/admins', {
        method: 'POST',
        body: formData,
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to create admin.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Admin created successfully.')

      router.push({ name: 'admins' })
    }
  })
}

const onReset = () => {
  refCreateForm.value?.reset()
}


definePage({
  meta: {
    action: ['user-admins-create'],
    subject: ['Admin'],
    navActiveLink: 'admins',
    title: 'Admin Create',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Create Admin
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard title="Admin Information">
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refCreateForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="name" label="Name" placeholder="Enter Name" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator]" :error-messages="errors.name" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="email" label="Email" placeholder="Enter Email" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator, emailValidator]" :error-messages="errors.email" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="password" label="Password" :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" placeholder="Enter Password"
                  class="mb-3 required" :rules="[requiredValidator]" :error-messages="errors.password" autocomplete="on"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="passwordConfirmation" label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'" placeholder="Confirm Password"
                  persistent-placeholder class="mb-3 required"
                  :append-inner-icon="passwordConfirmation ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator, confirmedValidator(passwordConfirmation, password)]"
                  :error-messages="errors.passwordConfirmation" autocomplete="on"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
              </VCol>
              <VCol cols="12" md="6">
                <VFileInput class="overflow-hidden" v-model="avatar" label="User Photo"
                  accept=".jpeg,.png,.jpg,.gif,.svg,.webp" :error-messages="errors.avatar" />
              </VCol>
              <VCol cols="12" md="6">
                <VCheckbox v-model="status" label="Active" :error-messages="errors.status" />
              </VCol>

              <VCol cols="12" class="d-flex gap-4">
                <VBtn type="submit">
                  Submit
                </VBtn>
                <VBtn type="reset" variant="tonal" color="secondary" @click="onReset">
                  Reset
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
