import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
  }),
  actions: {
    updateLoader(value) {
      this.loading = value
    },
  },
})
