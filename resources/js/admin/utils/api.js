import { useAppStore, useAuthStore } from '@/stores'
import { ofetch } from 'ofetch'

const authStore = useAuthStore()
const appStore = useAppStore()
function showLoader() {
  appStore.updateLoader(true)
}

function hideLoader() {
  appStore.updateLoader(false)
}

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_ADMIN_BASE_URL || '/',
  async onRequest({ options }) {
    showLoader()

    const accessToken = useCookie('adminAccessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    } else {
      options.headers = {
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
  },
  async onResponse({ response }) {
    hideLoader()

    return response
  },
  async onResponseError({ response }) {
    hideLoader()

    if (response.status === 401) {
      // await authStore.logout()
    }

    throw new Error(`HTTP error! status: ${response.status}`)
  },
})
