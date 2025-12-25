<script setup>
import { useAuthStore } from '@/stores/auth'
import { useAbility } from '@casl/vue'
import logoSrc from "@images/sa-logo-black.svg?url"
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue3-toastify"
import { VForm } from "vuetify/components/VForm"

definePage({
  meta: {
    layout: "blank",
    unauthenticatedOnly: true,
  },
})

const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const ability = useAbility()
const authStore = useAuthStore()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()

const credentials = ref({
  email: "",
  password: "",
  remember: false,
})

const login = async () => {
  try {
    const res = await $api("/login", {
      method: "POST",
      body: {
        email: credentials.value.email,
        password: credentials.value.password,
        remember: credentials.value.remember,
      },
      onResponseError({ response }) {
        // console.log(response)
        toast.error(
          response._data.message || "Login failed. Please check your credentials.",
        )

        errors.value = response._data.messages || { email: "Invalid credentials" }
      },
    })

    if (res.success === false) {
      return
    }

    const data = res?.data || {}

    const { accessToken, admin, adminAbilityRules } = data

    // Use auth store to handle login
    authStore.adminLogin(admin, accessToken, adminAbilityRules)

    // Update ability rules
    ability.update(adminAbilityRules)

    // Redirect to `to` query if exist or redirect to dashboard route
    toast.success(res.message || "Login successfully.")

    // ❗ nextTick is required to wait for DOM updates and later redirect
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : "/dashboard")
    })
  } catch (err) {
    // console.error(err)
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login()
  })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth Card -->
      <VCard class="auth-card" max-width="460" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
        <VCardItem class="justify-center">
          <VImg :src="logoSrc" height="60" class="relative-logo img" />
        </VCardItem>

        <VCardText class="text-center">
          <h4 class="text-h4 mb-1">
            Admin Login
          </h4>
          <p class="mb-0">
            Access your dashboard using your credentials
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" class="mb-2" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="credentials.email" label="Email" placeholder="johndoe@email.com" type="email"
                  autofocus :rules="[requiredValidator, emailValidator]" :error-messages="errors.email" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField v-model="credentials.password" label="Password" placeholder="············"
                  :rules="[requiredValidator]" :type="isPasswordVisible ? 'text' : 'password'" autocomplete="password"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap my-2">
                  <VCheckbox v-model="credentials.remember" label="Remember me" />
                </div>

                <!-- login button -->
                <VBtn block type="submit">
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VForm>

          <RouterLink class="text-primary" :to="{ name: 'forgot-password' }">
            Forgot Password?
          </RouterLink>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth";

.relative-logo img {
  position: relative !important;
}
</style>
