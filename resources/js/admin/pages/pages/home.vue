<script setup>
import { useApi } from "@/composables/useApi"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const route = useRoute('pages-home')
const router = useRouter()

const heroTitle = ref("")
const heroDescription = ref("")
const heroMediaType = ref("image")
const heroMedia = ref()
const aboutUsTitle = ref("")
const aboutUsDescription = ref("")
const aboutImage1 = ref()
const aboutImage2 = ref()
const aboutImage3 = ref()
const coreTitle = ref("")
const coreDescription = ref("")
const middleBannerTitle = ref("")
const middleBannerImage = ref()
const aboutBdTag = ref("")
const aboutBdTitle = ref("")
const aboutBdDescription = ref("")
const aboutBdVideoUrl = ref("")
const existingHeroImage = ref()
const refCreateForm = ref()

const errors = ref({
  heroTitle: undefined,
  heroDescription: undefined,
  heroMediaType: undefined,
  heroMedia: undefined,
  aboutUsTitle: undefined,
  aboutUsDescription: undefined,
  aboutImage1: undefined,
  aboutImage2: undefined,
  aboutImage3: undefined,
  coreTitle: undefined,
  coreDescription: undefined,
  middleBannerTitle: undefined,
  middleBannerImage: undefined,
  aboutBdTag: undefined,
  aboutBdTitle: undefined,
  aboutBdDescription: undefined,
  aboutBdVideoUrl: undefined,
})

const { data } = await useApi('/home-page-content')
const content = data._value.data.content

if (content) {
  heroMediaType.value = content.hero_media_type || "image"
  heroTitle.value = content.hero_title || ""
  heroDescription.value = content.hero_description || ""
  existingHeroImage.value = content.hero_media || null
}

const clearHeroInput = () => {
  console.log('ok')
  heroMedia.value = null
  existingHeroImage.value = null
}

const loadHeroImage = () => {
  const file = heroMedia.value
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      existingHeroImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const onSubmit = () => {
  refCreateForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value = {}

      const formData = new FormData()

      formData.append('heroMediaType', heroMediaType.value)
      formData.append('heroTitle', heroTitle.value)
      formData.append('heroDescription', heroDescription.value)

      if (heroMedia.value && heroMedia.value.length > 0) {
        const file = heroMedia.value[0]

        formData.append('heroMedia', file)
      } else if (heroMedia.value && heroMedia.value instanceof File) {
        formData.append('heroMedia', heroMedia.value)
      }

      const { data, error } = await useApi('/home-page-content', {
        method: 'POST',
        body: formData,
      }).json()

      if (error.value) {
        const errorData = error.value.response?._data || {}

        errors.value = errorData.messages || {}
        if (errorData.status_code && errorData.status_code !== 422) {
          toast.error(errorData.message || 'Failed to update data.')
        }

        return
      }

      if (data.value?.success === false) {
        return
      }

      toast.success(data.value?.message || 'Data Updated successfully.')

      router.push({ name: 'dashboard' })
    }
  })
}

const onReset = () => {
  refCreateForm.value?.reset()
}


definePage({
  meta: {
    action: ['home-page'],
    subject: ['HomePage'],
    navActiveLink: 'pages-home',
    title: 'Home Page Content',
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4">
        Edit Page Content: Home
      </h4>
    </VCol>
    <VCol cols="12">
      <!-- 👉 Form -->
      <VForm ref="refCreateForm" @submit.prevent="onSubmit">
        <VCard title="Hero Section">
          <VCardText>
            <VRow>
              <V-Col cols="12">
                <VRadioGroup v-model="heroMediaType" inline label="Hero Media Type"
                  :error-messages="errors.heroMediaType" @update:model-value="clearHeroInput">
                  <VRadio label="Image" value="image" />
                  <VRadio label="Video" value="video" />
                </VRadioGroup>
              </V-Col>
              <VCol v-if="heroMediaType == 'image'" cols="12" md="12">
                <VRow>
                  <VCol cols="12" md="8">
                    <VFileInput v-model="heroMedia" label="Hero Media" accept=".jpeg,.png,.jpg,.gif,.svg,.webp"
                      :error-messages="errors.heroMedia" @update:model-value="loadHeroImage" />
                    <span class="ms-8 text-info">Accept: jpeg, png, jpg, gif, svg, webp & max: 2MB</span>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VImg v-if="existingHeroImage" :src="existingHeroImage" height="120" width="175" />
                  </VCol>
                </VRow>
              </VCol>
              <VCol v-if="heroMediaType == 'video'" cols="12" md="12">
                <VRow>
                  <VCol cols="12" md="8">
                    <VFileInput v-model="heroMedia" label="Hero Media" accept=".mp4,.mov,.avi,.wmv,.flv,.mkv"
                      :error-messages="errors.heroMedia" @update:model-value="loadHeroImage" />
                    <span class="ms-8 text-info">Accept: mp4, mov, avi, wmv, flv, mkv & max: 50MB</span>
                  </VCol>
                  <VCol cols="12" md="4">
                    <video v-if="existingHeroImage" :src="existingHeroImage" height="100" width="175" autoplay
                      loop></video>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12" md="12">
                <AppTextField v-model="heroTitle" label="Hero Section Title" placeholder="Enter Title"
                  class="mb-3 required" persistent-placeholder :rules="[requiredValidator]"
                  :error-messages="errors.heroTitle" />
              </VCol>
              <VCol cols="12" md="12">
                <AppTextarea v-model="heroDescription" label="Hero Section Description" placeholder="Enter Description"
                  class="mb-3" persistent-placeholder :error-messages="errors.heroDescription" />
              </VCol>
              <!-- <VCol cols="12" md="6">
                <VFileInput class="overflow-hidden" v-model="avatar" label="User Photo"
                  accept=".jpeg,.png,.jpg,.gif,.svg,.webp" :error-messages="errors.avatar" />
              </VCol>
              <VCol cols="12" md="6">
                <VCheckbox v-model="status" label="Active" :error-messages="errors.status" />
              </VCol> -->

              <VCol cols="12" class="d-flex gap-4">
                <VBtn type="submit">
                  Submit
                </VBtn>
                <VBtn type="reset" variant="tonal" color="secondary" @click="onReset">
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VForm>
    </VCol>
  </VRow>
</template>

<style>
.v-field__input {
  overflow: hidden;
}
</style>
