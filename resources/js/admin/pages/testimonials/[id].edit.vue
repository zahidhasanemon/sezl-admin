<script setup>
import { useApi } from "@/composables/useApi"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const route = useRoute('testimonials-id-edit')
const router = useRouter()

const testimonialId = ref(0)
const name = ref("")
const address = ref("")
const testimonial = ref("")
const avatar = ref(null)
const status = ref(true)
const refUpdateForm = ref()
const existingAvatar = ref()

const errors = ref({
  name: undefined,
  address: undefined,
  testimonial: undefined,
  avatar: undefined,
  status: undefined,
})

testimonialId.value = route.params.id

// Fetch Testimonial data
const { data } = await useApi(`/testimonials/${route.params.id}`)

const fetchTestimonial = data._value.data.testimonial

name.value = fetchTestimonial.name || ""
address.value = fetchTestimonial.address || ""
testimonial.value = fetchTestimonial.testimonial || ""
status.value = fetchTestimonial.status == 1 ? true : false
existingAvatar.value = fetchTestimonial.avatar || null

const loadImage = () => {
  const file = avatar.value
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      existingAvatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    existingAvatar.value = fetchTestimonial.avatar || null
  }
}

const onSubmit = () => {
  refUpdateForm.value?.validate().then(async ({ valid: isValid }) => {
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

      const { data, error } = await useApi(`/testimonials/${testimonialId.value}/update`, {
        method: 'POST',
        body: formData,
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to update testimonial.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Testimonial updated successfully.')

      router.push({ name: 'testimonials' })
    }
  })
}

definePage({
  meta: {
    action: ['user-testimonials-update'],
    subject: ['Testimonial'],
    navActiveLink: 'testimonials',
    title: 'Edit Testimonial',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Edit Testimonial
      </h4>
    </VCol>
    <VCol cols="12">
      <VCard title="Testimonial Information">
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refUpdateForm" @submit.prevent="onSubmit">
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
                  <VCol cols="12" md="8" class="d-flex gap-2 pb-1">
                    <VFileInput v-model="avatar" label="Avatar" accept=".jpeg,.png,.jpg,.gif,.svg,.webp" :error-messages="errors.avatar"
                      @update:model-value="loadImage" />
                    <VAvatar size="42" :variant="!existingAvatar ? 'tonal' : undefined">
                      <VImg v-if="existingAvatar" :src="existingAvatar" />
                      <span v-else>{{ avatarText(name) }}</span>
                    </VAvatar>
                  </VCol>
                  <VCol class="py-0" cols="12">
                    <span cols="12" class="ms-8 text-info">Accept: jpeg, png, jpg, gif, svg, webp & max: 2MB</span>
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
                <VBtn type="button" variant="tonal" color="error" :to="{ name: 'testimonials' }">
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
