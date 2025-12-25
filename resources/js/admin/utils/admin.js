import { useAppStore, useAuthStore } from '@/stores'

const authStore = useAuthStore()
const appStore = useAppStore()
function showLoader() {
  appStore.updateLoader(true)
}

function hideLoader() {
  appStore.updateLoader(false)
}

export const apiRequest = async (url, options = {}) => {
  try {
    showLoader()

    const baseURL = import.meta.env.VITE_API_ADMIN_BASE_URL || '/api'

    const completeURL = `${baseURL}${url}`

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

    const response = await fetch(completeURL, options)

    if (!response.ok) {
      console.log(response)
      if (response.status === 401) {
        // await authStore.adminLogout()
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  } finally {
    hideLoader()
  }
}
