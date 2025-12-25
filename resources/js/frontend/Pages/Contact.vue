<script setup>
import { useApi } from '@/useApi';
import { Head, usePage } from '@inertiajs/vue3';
import { reactive } from 'vue';
import { toast } from 'vue3-toastify';

defineProps({
  seo: Object
});

const page = usePage();
const user = page.props.auth?.user

const form = reactive({
  firstName: user?.first_name || '',
  lastName: user?.last_name || '',
  email: user?.email || '',
  phone: user?.phone || '',
  subject: '',
  message: ''
})

const { loading, request } = useApi()

const submitForm = async (url, data) => {
  try {
    const res = await request(url, {
      method: 'POST',
      body: data,
      credentials: 'include'
    })

    toast.success(res.message || 'Message sent successfully!')
    Object.keys(form).forEach(key => form[key] = '')
  } catch (err) {
    if (err?.response?.status === 422) {
      const errors = Object.values(err.response._data.errors || {})
      errors.forEach(arr => arr.forEach(msg => toast.error(msg)))
    } else {
      toast.error(err?.response?._data?.message || 'An error occurred.')
    }
  }
}

const submit = () => {
  if (form.firstName === '' || form.email === '' || form.phone === '' || form.subject === '' || form.message === '') {
    return
  }
  submitForm('/contact/store', { ...form })
}
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>

    <section class="section-padding mx-auto max-w-4xl">
      <div class="container">
        <div class="space-y-4 lg:space-y-6">
          <div class="text-center mb-4 lg:mb-6">
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4">
              Contact Us
            </h1>
            <p class="text-primary-gray text-sm sm:text-sm lg:text-base max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 max-w-2xl mx-auto">
            <form @submit.prevent="submit" class="space-y-3 lg:space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label for="firstName"
                    class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                    First Name <span class="text-red-500">*</span>
                  </label>
                  <input type="text" id="firstName" v-model="form.firstName" placeholder="Enter your first name"
                    class="form-control" required />
                </div>

                <div>
                  <label for="lastName"
                    class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                    Last Name
                  </label>
                  <input type="text" id="lastName" v-model="form.lastName" placeholder="Enter your last name"
                    class="form-control" />
                </div>
              </div>

              <div>
                <label for="email"
                  class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                  Your Email <span class="text-red-500">*</span>
                </label>
                <input type="email" id="email" v-model="form.email" placeholder="Enter your email address"
                  class="form-control" required />
              </div>

              <div>
                <label for="phone"
                  class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                  Your Phone <span class="text-red-500">*</span>
                </label>
                <input type="tel" id="phone" v-model="form.phone" placeholder="Enter your phone number"
                  class="form-control" required />
              </div>

              <div>
                <label for="subject"
                  class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                  Subject <span class="text-red-500">*</span>
                </label>
                <input type="text" id="subject" v-model="form.subject" placeholder="Enter subject" class="form-control"
                  required />
              </div>

              <div>
                <label for="message"
                  class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2">
                  Your Message <span class="text-red-500">*</span>
                </label>
                <textarea id="message" v-model="form.message" rows="5" placeholder="Tell us how we can help you..."
                  class="form-control" required></textarea>
              </div>

              <div class="pt-1 lg:pt-2">
                <button type="submit" class="w-full primary-button" :disabled="loading">
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
