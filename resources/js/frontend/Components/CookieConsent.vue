<script setup>
import { onMounted, ref } from 'vue'

const consentSet = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  consentSet.value = consent !== null
})

const setConsent = value => {
  localStorage.setItem('cookie_consent', value)
  consentSet.value = true

  // if (value) {
  //   loadAnalytics()
  // }
}

const loadAnalytics = () => {
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_ID'
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', 'YOUR_ID')
}
</script>

<template>
  <div v-if="!consentSet" class="cookie-banner">
    <p class="cookie-text">
      By clicking "Accept All Cookies", you agree to the storing of cookies in your device to enhance site navigation,
      analyze site usage and assist in our marketing efforts.
    </p>
    <div class="cookie-actions">
      <button class="primary-button" @click="setConsent(true)">Accept All</button>
      <button class="ml-2 px-4 py-2 border rounded-lg transition-colors border-gray-500 hover:border-primary-black"
        @click="setConsent(false)">
        Deny
      </button>
    </div>
  </div>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #c9bcbc;
  color: #222;
  gap: 1rem;
  inline-size: 100%;
  inset-block-end: 0;
  inset-inline-start: 0;
}

.cookie-text {
  text-align: start;
}

.cookie-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .cookie-banner {
    flex-direction: row;
    align-items: center;
    text-align: start;
  }

  .cookie-text {
    flex: 1;
    margin: 0;
  }
}
</style>
