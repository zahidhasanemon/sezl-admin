<script>
import BlankLayout from '@/Layouts/BlankLayout.vue';
export default {
  layout: BlankLayout,
};
</script>

<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { toast } from 'vue3-toastify';

defineProps({
  seo: Object
});

const page = usePage();

const form = useForm({
  email: '',
})

const submit = async () => {
  if (form.email.value === '') {
    return
  }

  try {
    form.post('/forget/password', {
      onSuccess: () => {
        if (page.props.flash?.success) {
          toast.success(page.props.flash.success)
        }
      },
      onError: (errors) => {
        if (errors.error) {
          toast.error(errors.error)
        }
      },
    })
  } catch (err) {
    toast.error('An error occurred during verification.')
  }
}
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>

    <section class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-[480px]">
        <!-- Verify Email Card -->
        <div class="login-card">
          <h2 class="text-xl font-semibold text-primary-black mb-2">Reset your password</h2>
          <p class="text-primary-gray text-sm mb-6">Enter your email to receive a password reset OTP.</p>

          <form @submit.prevent="submit">
            <!-- Code Field -->
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-primary-black mb-2">Email</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18"
                    width="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z">
                    </path>
                  </svg>
                </span>
                <input type="email" id="email" placeholder="you@example.com" class="form-control !pl-12"
                  :class="{ 'border-red-500': form.errors.email }" v-model="form.email" required />
              </div>
              <span v-if="form.errors.email" class="text-red-500 text-sm">
                {{ form.errors.email }}
              </span>
              <p class="text-xs text-primary-gray mt-1">
                We'll send an OTP if this email is associated with an account.
              </p>
            </div>

            <!-- Reset Password Button -->
            <button type="submit" class="primary-button w-full" :disabled="form.processing">Reset Password</button>
          </form>
        </div>

        <!-- Navigation Links -->
        <div class="flex justify-between items-center mt-6 text-sm">
          <Link href="/login" class="text-primary-black font-medium hover:underline flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to sign in
          </Link>
          <Link href="/signup" class="text-primary-black font-medium hover:underline">Create account</Link>
        </div>
      </div>
    </section>
  </div>
</template>
