<script setup>
import { useApi } from "@/composables/useApi"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

const content = ref('')
const refCreateForm = ref()
const errors = ref({})

// Fetch settings
const {
    data: settingsData,
    execute: fetchSettings,
} = await useApi('/page-settings/terms')

// Watch for settings data and update content
watchEffect(() => {
    if (settingsData.value?.data?.content) {
        content.value = settingsData.value.data.content
    }
})

const onSubmit = () => {
    refCreateForm.value?.validate().then(async ({ valid: isValid }) => {
        if (isValid) {
            errors.value = {}

            const { data, error } = await useApi('/page-settings/terms', {
                method: 'POST',
                body: {
                    content: content.value
                },
            }).json()

            if (error.value) {
                const errorData = error.value.response?._data || {}
                errors.value = errorData.messages || {}
                if (errorData.status_code && errorData.status_code !== 422) {
                    toast.error(errorData.message || 'Failed to update content.')
                }
                return
            }

            if (data.value?.success === false) {
                return
            }

            toast.success(data.value?.message || 'Content updated successfully.')
            await fetchSettings()
        }
    })
}

// Quill toolbar options
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
    ['link', 'image', 'video'],
]

definePage({
    meta: {
        action: ['user-settings-manage'],
        subject: ['Settings'],
        navActiveLink: 'pages-terms',
        title: 'Page Settings',
    },
})
</script>

<template>
    <VRow>
        <VCol cols="12">
            <h4 class="text-h4">
                Manage Term and Condition
            </h4>
        </VCol>
        <VCol cols="12">
            <VCard title="Term and Condition Content">
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm ref="refCreateForm" @submit.prevent="onSubmit">
                        <VRow>
                            <VCol cols="12">
                                <QuillEditor v-model:content="content" content-type="html" :toolbar="toolbarOptions"
                                    theme="snow" placeholder="Write something here..." />
                            </VCol>

                            <VCol cols="12" class="mt-6">
                                <VBtn type="submit">
                                    Update
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
.ql-editor {
  min-block-size: 100px;
}
</style>
