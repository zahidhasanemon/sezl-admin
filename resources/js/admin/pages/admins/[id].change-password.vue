<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const route = useRoute('users-id-change-password')
const router = useRouter()


const userId = ref(0)
const password = ref("")
const confirmPassword = ref("")
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const refChangePassForm = ref()

const errors = ref({
  password: undefined,
  password_confirmation: undefined,
})

userId.value = route.params.id


const onSubmit = () => {
  refChangePassForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const updatePassword = {
        id: userId.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
      }

      const { data, error } = await useApi(`/admins/${userId.value}/password`, {
        method: 'POST',
        body: JSON.stringify(updatePassword),
        headers: {
          'Content-Type': 'application/json',
        },
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to change password.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Password changed successfully.')

      router.push({ name: 'admins' })
    }
  })
}

const onReset = () => {
  refChangePassForm.value?.reset()
}


definePage({
  meta: {
    action: ['user-admins-update'],
    subject: ['Admin'],
    navActiveLink: 'admins',
    title: 'Change Password',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-0">
        Change Password
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refChangePassForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="password"
                  label="New Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  placeholder="Enter Password"
                  :rules="[requiredValidator]"
                  :error-messages="errors.password"
                  autocomplete="on"
                  class="mb-3"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="confirmPassword"
                  label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  placeholder="Confirm Password"
                  persistent-placeholder
                  :append-inner-icon="confirmPassword ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator, confirmedValidator(confirmPassword, password)]"
                  :error-messages="errors.password_confirmation"
                  autocomplete="on"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>

              <VCol
                cols="12"
                class="d-flex gap-4"
              >
                <VBtn type="submit">
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="onReset"
                >
                  Reset
                </VBtn>
                <VBtn
                  color="error"
                  variant="tonal"
                  :to="{ name: 'admins' }"
                >
                  Back to List
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
