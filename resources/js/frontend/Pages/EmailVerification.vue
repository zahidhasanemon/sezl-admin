<script>
import BlankLayout from '@/Layouts/BlankLayout.vue';
export default {
  layout: BlankLayout,
};
</script>

<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

defineProps({
  seo: Object
});

const page = usePage();

const params = new URLSearchParams(window.location.search)
const email = params.get('email') || ''

const form = useForm({
  email,
  otp: '',
})

const countdown = ref(60)
const timer = ref(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(countdown.value / 60)
  const seconds = countdown.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  clearInterval(timer.value)
  countdown.value = 60
  timer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}

const resendProcessing = ref(false)

const resendOTP = () => {
  resendProcessing.value = true
  router.post('/email/verify/resend',
    { email },
    {
      onSuccess: () => {
        startTimer()
        toast.success('A new verification OTP has been sent to your email.')
      },
      onError: (errors) => {
        if (errors.email) {
          toast.error(errors.email)
        } else {
          toast.error('Failed to resend verification OTP. Please try again later.')
        }
      },
      onFinish: () => {
        resendProcessing.value = false
      }
    })
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer.value)
})

const submit = async () => {
  if (form.otp === '') {
    return
  }

  try {
    form.post('/verify/email', {
      onSuccess: () => {
        if (page.props.flash?.success) {
          toast.success(page.props.flash.success)
        }
      },
      onError: (errors) => {
        if (errors.email) {
          toast.error(errors.email)
        } else if (errors.error) {
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
          <!-- Email Icon -->
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>

          <h2 class="text-xl font-semibold text-primary-black mb-2 text-center">Verify Your Email</h2>
          <p class="text-primary-gray text-sm mb-2 text-center">
            Please check your email and input code below.
          </p>
          <p class="text-primary-gray text-sm mb-6 text-center">
            We sent an email to <span class="font-medium text-primary-black">{{ email }}</span>
          </p>

          <form @submit.prevent="submit">
            <!-- Code Field -->
            <div class="mb-6">
              <label for="code" class="block text-sm font-medium text-primary-black mb-2">Code</label>
              <input type="text" id="code" placeholder="632682" v-model="form.otp"
                class="form-control text-center tracking-widest font-mono" maxlength="6" required />
              <span v-if="form.errors.otp" class="text-red-500 text-sm">
                {{ form.errors.otp }}
              </span>
              <div class="text-xs text-primary-black mt-1 text-end"><span id="countdown">{{ formattedTime }}</span> s
              </div>
            </div>

            <!-- Verify OTP Button -->
            <button type="submit" :disabled="form.processing" class="primary-button w-full">Verify OTP</button>

            <!-- Resend Button -->
            <button type="button" :disabled="countdown > 0 || resendProcessing" @click="resendOTP"
              class="primary-button-outline w-full mt-4 flex items-center justify-center gap-2">
              Resend Verification OTP
            </button>
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
