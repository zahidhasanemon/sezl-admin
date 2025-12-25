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
  password: '',
  password_confirmation: '',
})

const countdown = ref(60)
const timer = ref(null)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const step = ref(1)
const isVerifying = ref(false)

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

const resendOTP = () => {
  router.post('/forget/password',
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
    })
}

const verifyOTP = async () => {
  if (form.otp === '') {
    toast.error('Please enter the OTP code.')
    return
  }

  isVerifying.value = true

  try {
    const response = await fetch('/password/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({
        email: email,
        otp: form.otp
      })
    })

    const data = await response.json()

    if (response.ok) {
      toast.success('OTP verified successfully! Please set your new password.')
      step.value = 2
      clearInterval(timer.value)
    } else {
      toast.error(data.message || 'Invalid OTP. Please try again.')
      form.errors.otp = data.message || 'Invalid OTP'
    }
  } catch (err) {
    toast.error('An error occurred during verification. Please try again.')
  } finally {
    isVerifying.value = false
  }
}

const submitPasswordReset = async () => {
  if (form.password === '' || form.password_confirmation === '') {
    toast.error('Please fill in all password fields.')
    return
  }

  if (form.password !== form.password_confirmation) {
    toast.error('Passwords do not match.')
    return
  }

  try {
    form.post('/password/reset', {
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
        } else if (errors.password) {
          toast.error(errors.password)
        }
      },
    })
  } catch (err) {
    toast.error('An error occurred while resetting password.')
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
    </Head>

    <section class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-[480px]">
        <!-- Step 1: Verify OTP -->
        <div v-if="step === 1" class="login-card">
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

          <form @submit.prevent="verifyOTP">
            <!-- Code Field -->
            <div class="mb-6">
              <label for="code" class="block text-sm font-medium text-primary-black mb-2">Code</label>
              <input type="text" id="code" placeholder="632682" v-model="form.otp"
                class="form-control text-center tracking-widest font-mono"
                :class="{ 'border-red-500': form.errors.otp }" maxlength="6" required />
              <span v-if="form.errors.otp" class="text-red-500 text-sm">
                {{ form.errors.otp }}
              </span>
              <div class="text-xs text-primary-black mt-1 text-end"><span id="countdown">{{ formattedTime }}</span> s
              </div>
            </div>

            <!-- Verify OTP Button -->
            <button type="submit" class="primary-button w-full" :disabled="isVerifying">
              {{ isVerifying ? 'Verifying...' : 'Verify OTP' }}
            </button>

            <!-- Resend Button -->
            <button type="button" :disabled="countdown > 0" @click="resendOTP"
              class="primary-button-outline w-full mt-4 flex items-center justify-center gap-2">
              Resend Verification OTP
            </button>
          </form>
        </div>

        <!-- Step 2: Set New Password -->
        <div v-else class="login-card">
          <!-- Lock Icon -->
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <h2 class="text-xl font-semibold text-primary-black mb-2 text-center">Set New Password</h2>
          <p class="text-primary-gray text-sm mb-6 text-center">
            Please enter your new password for <span class="font-medium text-primary-black">{{ email }}</span>
          </p>

          <form @submit.prevent="submitPasswordReset">
            <!-- New Password Field -->
            <div class="mb-4">
              <label for="newPassword" class="block text-sm font-medium text-primary-black mb-2">New Password</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 7H12V5C12 2.79 10.21 1 8 1C5.79 1 4 2.79 4 5V7H3.5C2.67 7 2 7.67 2 8.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V8.5C14 7.67 13.33 7 12.5 7ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM10.1 7H5.9V5C5.9 3.84 6.84 2.9 8 2.9C9.16 2.9 10.1 3.84 10.1 5V7Z"
                      fill="currentColor" />
                  </svg>
                </span>
                <input :type="isPasswordVisible ? 'text' : 'password'" v-model="form.password" id="newPassword"
                  placeholder="Enter new password" class="form-control !pl-12 pr-12"
                  :class="{ 'border-red-500': form.errors.password }" required />
                <button type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                  @click="isPasswordVisible = !isPasswordVisible">
                  <svg v-if="isPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path
                      d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                    <path d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
              <span v-if="form.errors.password" class="text-red-500 text-sm">
                {{ form.errors.password }}
              </span>
            </div>

            <!-- Confirm Password Field -->
            <div class="mb-4">
              <label for="confirmPassword" class="block text-sm font-medium text-primary-black mb-2">Confirm
                Password</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 7H12V5C12 2.79 10.21 1 8 1C5.79 1 4 2.79 4 5V7H3.5C2.67 7 2 7.67 2 8.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V8.5C14 7.67 13.33 7 12.5 7ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM10.1 7H5.9V5C5.9 3.84 6.84 2.9 8 2.9C9.16 2.9 10.1 3.84 10.1 5V7Z"
                      fill="currentColor" />
                  </svg>
                </span>
                <input :type="isConfirmPasswordVisible ? 'text' : 'password'" v-model="form.password_confirmation"
                  id="confirmPassword" placeholder="Confirm new password" class="form-control !pl-12 pr-12"
                  :class="{ 'border-red-500': form.errors.password_confirmation }" required />
                <button type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                  @click="isConfirmPasswordVisible = !isConfirmPasswordVisible">
                  <svg v-if="isConfirmPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path
                      d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                    <path d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
              <span v-if="form.errors.password_confirmation" class="text-red-500 text-sm">
                {{ form.errors.password_confirmation }}
              </span>
            </div>

            <!-- Password Requirements -->
            <div class="mb-6">
              <p class="text-xs text-primary-gray mb-2">Password must contain:</p>
              <ul class="text-xs text-primary-gray space-y-1">
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-primary-gray rounded-full"></span>
                  At least 8 characters
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-primary-gray rounded-full"></span>
                  At least one number
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-primary-gray rounded-full"></span>
                  At least one special character
                </li>
              </ul>
            </div>

            <!-- Reset Password Button -->
            <button type="submit" class="primary-button w-full" :disabled="form.processing">
              {{ form.processing ? 'Resetting...' : 'Reset Password' }}
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
