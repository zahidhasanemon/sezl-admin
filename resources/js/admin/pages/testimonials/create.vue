<script setup>
import { useApi } from "@/composables/useApi"
import { useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const router = useRouter()

const name = ref("")
const address = ref("")
const testimonial = ref("")
const avatar = ref()
const status = ref(true)
const refCreateForm = ref()

const errors = ref({
  name: undefined,
  address: undefined,
  testimonial: undefined,
  avatar: undefined,
  status: undefined,
})

const onSubmit = () => {
  refCreateForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const formData = new FormData()

      formData.append('name', name.value)
      formData.append('address', address.value)
      formData.append('testimonial', testimonial.value)
      formData.append('status', status.value ? '1' : '0')

      if (avatar.value && avatar.value.length > 0) {
        const file = avatar.value[0]

        formData.append('avatar', file)
      } else if (avatar.value && avatar.value instanceof File) {
        formData.append('avatar', avatar.value)
      }

      const { data, error } = await useApi('/testimonials', {
        method: 'POST',
        body: formData,
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to create testimonial.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Testimonial created successfully.')

      router.push({ name: 'testimonials' })
    }
  })
}

const onReset = () => {
  refCreateForm.value?.reset()
}


definePage({
  meta: {
    action: ['user-testimonials-create'],
    subject: ['Testimonial'],
    navActiveLink: 'testimonials',
    title: 'Testimonial Create',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Create Testimonial
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard title="Testimonial Information">
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refCreateForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="name" label="Name" placeholder="Enter Name" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator]" :error-messages="errors.name" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="address" label="Address" placeholder="Enter Address" class="mb-3 required"
                  persistent-placeholder :rules="[requiredValidator]" :error-messages="errors.address" />
              </VCol>
              <VCol cols="12" md="12">
                <AppTextarea v-model="testimonial" label="Testimonial" placeholder="Write testimonial here..."
                  class="mb-3" :rules="[requiredValidator]" :error-messages="errors.testimonial" />
              </VCol>
              <VCol cols="12" md="6">
                <VRow>
                  <VCol cols="12" md="8">
                    <VFileInput v-model="avatar" label="Avatar" accept=".jpeg,.png,.jpg,.gif,.svg,.webp" :error-messages="errors.avatar" />
                    <span class="ms-8 text-info">Accept: jpeg, png, jpg, gif, svg, webp & max: 2MB</span>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VCheckbox v-model="status" label="Active" :error-messages="errors.status" />
                  </VCol>
                </VRow>
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
