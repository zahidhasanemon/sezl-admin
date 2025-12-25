<script setup>
import Address from '@/Components/Address.vue';
import CancelConfirmation from '@/Components/CancelConfirmation.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import defaultImage from '@images/avatars/default-avatar.png';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import moment from 'moment';
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
  seo: Object,
  user: Object,
  addresses: Array,
  orders: Array,
  countries: Array,
})

const profileTabs = [
  {
    label: 'Profile',
    slug: 'profile',
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z"></path></svg>`
  },
  {
    label: 'Address',
    slug: 'address',
    icon: `<svg class='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>`
  },
  {
    label: 'Orders',
    slug: 'orders',
    icon: `<svg class='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' /></svg>`
  },
  {
    label: 'Password Settings',
    slug: 'password_settings',
    icon: `<svg class='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' /></svg>`
  }
]

const activeTab = ref(profileTabs[0].slug);

const showAddressForm = ref(false)
const selectedAddress = ref({})
const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isEditingProfile = ref(false)
const showDeleteButton = ref(true)
const showDeleteModal = ref(false)
const isPasswordVisible = ref(false)
const toCancelOrderID = ref()
const showCancelModal = ref(false)

const openCreateAddressForm = () => {
  selectedAddress.value = {}
  showAddressForm.value = true
}

const editAddress = address => {
  selectedAddress.value = address
  showAddressForm.value = true
}

const removeAddress = address => {
  router.post('/address/delete',
    { id: address.id },
    {
      onSuccess: () => {
        toast.success('Address Deleted Successfully.')
      },
      onError: (errors) => {
        if (errors.error) {
          toast.error(errors.error)
        }
      },
    })
}

const showDeleteWarning = () => {
  showDeleteModal.value = true
}

const handleDeleteAccount = async () => {
  showDeleteModal.value = false
  // showDeleteButton.value = false
  try {
    const response = await fetch('/profile/delete/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
    })

    const data = await response.json()

    if (data.success) {
      showDeleteButton.value = false
    } else {
      toast.error(data.message)
    }
  } catch (err) {
    toast.error('An error occurred during verification. Please try again.')
  }
}

const deleteAccountForm = useForm({
  password: ''
});
const submitDeleteForm = () => {
  deleteAccountForm.post('/profile/delete', {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      showDeleteButton.value = true
      toast.success('Profile deleted successfully.');
    },
    onError: (errors) => {
      if (errors.error) {
        toast.error(errors.error)
      }
    },
  });
}

const imageForm = useForm({
  avatar: null,
});

const informationForm = useForm({
  first_name: props.user.first_name || '',
  last_name: props.user.last_name || '',
  phone: props.user.phone || '',
  dob: props.user.dob || '',
});

const resetProfileInformation = () => {
  informationForm.first_name = props.user.first_name || '';
  informationForm.last_name = props.user.last_name || '';
  informationForm.phone = props.user.phone || '';
  informationForm.dob = props.user.dob || '';
};

const submitProfileUpdate = () => {
  informationForm.post('/profile/update', {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      isEditingProfile.value = false
      toast.success('Profile information updated successfully.');
    },
    onError: (errors) => {
      if (errors.error) {
        toast.error(errors.error)
      }
    },
  });
};

const avatarUrl = ref(null);
if (props.user.avatar) {
  avatarUrl.value = props.user.avatar;
} else {
  avatarUrl.value = defaultImage;
}

const fileInput = ref(null);

const openFileInput = () => {
  fileInput.value.click();
};

const setImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageForm.avatar = file;
    avatarUrl.value = URL.createObjectURL(file);
  }
};

const resetImage = () => {
  imageForm.avatar = null;
  avatarUrl.value = props.user.avatar ? props.user.avatar : defaultImage;
};

const changeAvatar = () => {
  if (!imageForm.avatar) {
    return;
  }

  imageForm.post('/profile/update/avatar', {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      imageForm.reset();
      toast.success('Profile photo updated successfully.');
    },
    onError: (errors) => {
      if (errors.error) {
        toast.error(errors.error)
      }
    },
  });
};

const passwordForm = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const submitPasswordUpdateForm = () => {
  passwordForm.post('/profile/update/password', {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      passwordForm.reset();
      toast.success('Password updated successfully.');
    },
    onError: (errors) => {
      if (errors.error) {
        toast.error(errors.error)
      }
    },
  });
}

watch(showAddressForm, (val) => {
  if (val) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

watch(showDeleteModal, (val) => {
  if (val) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

watch(showCancelModal, (val) => {
  if (val) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

const formatDate = (date, format = 'DD MMM, YYYY') => {
  return moment(date).format(format)
}

const statusMap = {
  pending: { label: 'Pending', color: 'text-yellow-500', icon: '⏳' },
  confirmed: { label: 'Confirmed', color: 'text-blue-500', icon: '✔️' },
  processing: { label: 'Processing', color: 'text-indigo-500', icon: '🔄' },
  in_transit: { label: 'In Transit', color: 'text-purple-500', icon: '🚚' },
  delivered: { label: 'Delivered', color: 'text-green-600', icon: '✅' },
  cancelled: { label: 'Cancelled', color: 'text-red-500', icon: '❌' },
}

const formatStatus = status => statusMap[status]?.label || ''
const statusColor = status => statusMap[status]?.color || 'text-gray-500'
const statusIcon = status => statusMap[status]?.icon || ''

const paymentStatusMap = {
  unpaid: { label: 'Unpaid', color: 'text-red-500' },
  paid: { label: 'Paid', color: 'text-green-500' },
  refunded: { label: 'Refunded', color: 'text-indigo-500' },
  refund_pending: { label: 'Refund Pending', color: 'text-purple-500' },
  refund_failed: { label: 'Delivered', color: 'text-yellow-600' },
}

const formatPaymentStatus = status => paymentStatusMap[status]?.label || ''
const paymentStatusColor = status => paymentStatusMap[status]?.color || 'text-gray-500'

const cancelOrderConfirmation = order => {
  toCancelOrderID.value = order.id
  showCancelModal.value = true
}

const handleCancelOrder = (data) => {
  router.post(`/orders/${data.orderId}/cancel`, {
    reason: data.reason,
    details: data.details,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      showCancelModal.value = false
      toast.success('Order cancelled successfully')
    },
    onError: (errors) => {
      if (errors.error) {
        toast.error(errors.error)
      } else {
        toast.error(errors.message || 'Failed to cancel order')
      }
    },
  })
}

const isDownloading = ref(false)
const downloadInvoice = async order => {
  isDownloading.value = true

  try {
    const response = await fetch(`/order/download/invoice/${order.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    })

    if (!response.ok) {
      throw new Error('Download failed')
    }

    // Get the blob from response
    const blob = await response.blob()

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `invoice_${order.id}.pdf`
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    toast.success('Invoice downloaded successfully')
  } catch (error) {
    toast.error('Failed to download invoice')
    console.error('Download error:', error)
  } finally {
    isDownloading.value = false
  }
}

const initiateRepayment = order => {
  router.get(`/orders/${order.id}/pay/initiate`)
}
</script>

<template>
  <div>

    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description">
    </Head>

    <section class="section-padding mx-auto">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="text-sm mb-3 lg:mb-4" aria-label="Breadcrumb">
          <ol class="list-reset flex text-primary-gray flex-wrap">
            <li>
              <Link href="/" class="hover:underline">Home</Link>
              <span class="mx-2">></span>
            </li>
            <li class="text-gray-800 font-semibold">Profile</li>
          </ol>
        </nav>

        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <div class="flex flex-col gap-4">
              <button v-for="tab in profileTabs" :key="tab.slug" :class="[
                'w-full text-start !px-4 !py-2 flex items-center duration-300',
                activeTab === tab.slug ? 'primary-button' : 'primary-button-outline'
              ]" @click="activeTab = tab.slug" v-html="tab.icon + tab.label"></button>
            </div>
          </div>
          <div class="md:col-span-9">
            <div class="space-y-3 lg:space-y-4">
              <!-- User Profile -->
              <template v-if="activeTab === 'profile'">
                <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                  <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4">
                    My profile
                  </h1>

                  <!-- Basic Info Section -->
                  <div class="mb-0">
                    <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Basic info
                    </h2>

                    <!-- Profile Photo -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                      <div class="relative flex-shrink-0">
                        <img :src="avatarUrl" alt="Profile photo"
                          class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200" />
                      </div>
                      <div
                        class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button @click="openFileInput"
                          class="flex items-center gap-2 !px-3 text-sm !py-2 primary-button w-full sm:w-auto justify-center sm:justify-start">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          Change photo
                        </button>
                        <input type="file" class="hidden" ref="fileInput" @input="setImage"
                          accept="image/png, image/jpeg" />
                        <button v-if="imageForm.avatar" @click="changeAvatar"
                          class="primary-button flex items-center gap-2 !py-2 text-sm w-full sm:w-auto justify-center sm:justify-start">
                          Update
                        </button>
                        <button v-if="imageForm.avatar" @click="resetImage"
                          class="danger-button-outline flex items-center gap-2 !py-2 leading-[17px] text-sm w-full sm:w-auto justify-center sm:justify-start">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                          </svg>
                          Reset
                        </button>
                      </div>
                    </div>
                    <span v-if="imageForm.errors.avatar" class="text-red-500 text-sm">
                      {{ imageForm.errors.avatar }}
                    </span>
                    <!-- <p class="text-indigo-500 text-sm">
                      Accepted formats: .jpeg, .jpg, .png
                    </p> -->

                    <!-- Profile Form -->
                    <form @submit.prevent="submitProfileUpdate" class="space-y-3 lg:space-y-4">
                      <div class="grid grid-cols-1">
                        <!-- Email Field -->
                        <div>
                          <label for="email" class="block text-sm font-medium text-primary-black mb-2">Email</label>
                          <input type="email" id="email" placeholder="john.carter@example.com" :value="user.email"
                            class="form-control" disabled />
                        </div>
                      </div>
                      <!-- Full Name and Email Row -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                        <!-- Full Name Field -->
                        <div>
                          <label for="firstName" class="block text-sm font-medium text-primary-black mb-2">First
                            name</label>
                          <input type="text" id="firstName" placeholder="John" class="form-control"
                            v-model="informationForm.first_name" required :disabled="!isEditingProfile" />
                          <span v-if="informationForm.errors.first_name" class="text-red-500 text-sm">
                            {{ informationForm.errors.first_name }}
                          </span>
                        </div>

                        <div>
                          <label for="lastName" class="block text-sm font-medium text-primary-black mb-2">Last
                            name</label>
                          <input type="text" id="lastName" placeholder="Carter" class="form-control"
                            v-model="informationForm.last_name" :disabled="!isEditingProfile" />
                          <span v-if="informationForm.errors.last_name" class="text-red-500 text-sm">
                            {{ informationForm.errors.last_name }}
                          </span>
                        </div>
                      </div>

                      <!-- Phone and Birthday Row -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                        <!-- Phone Field -->
                        <div>
                          <label for="phone" class="block text-sm font-medium text-primary-black mb-2">Phone</label>
                          <input type="tel" id="phone" placeholder="+1 (415) 555-0199" v-model="informationForm.phone"
                            class="form-control" :disabled="!isEditingProfile" />
                          <span v-if="informationForm.errors.phone" class="text-red-500 text-sm">
                            {{ informationForm.errors.phone }}
                          </span>
                        </div>

                        <!-- Birthday Field -->
                        <div>
                          <label for="birthday"
                            class="block text-sm font-medium text-primary-black mb-2">Birthday</label>
                          <input type="date" id="birthday" class="form-control" v-model="informationForm.dob"
                            :disabled="!isEditingProfile" />
                          <span v-if="informationForm.errors.dob" class="text-red-500 text-sm">
                            {{ informationForm.errors.dob }}
                          </span>
                        </div>
                      </div>

                      <!-- Action Buttons -->
                      <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2" v-if="isEditingProfile">
                        <button type="submit" :disabled="informationForm.processing"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4">
                            </path>
                          </svg>
                          Save changes
                        </button>
                        <!-- <button type="button" @click="resetProfileInformation"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button-outline">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                          </svg>
                          Reset
                        </button> -->
                        <button type="button" @click="isEditingProfile = false"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button-outline">
                          <!-- <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                          </svg> -->
                          Cancel
                        </button>
                      </div>
                      <div v-else class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <button type="button" @click="isEditingProfile = true"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                          Edit
                        </button>
                      </div>
                    </form>

                    <div v-if="showDeleteButton" class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 mt-4">
                      <button type="button" @click="showDeleteWarning"
                        class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 danger-button w-full sm:w-auto">
                        Delete Account
                      </button>
                    </div>

                    <form v-if="!showDeleteButton" @submit.prevent="submitDeleteForm" class="space-y-3 lg:space-y-4">
                      <div>
                        <label for="newPassword" class="block text-sm font-medium text-primary-black mt-4 mb-2">Your
                          Password</label>
                        <div class="relative">
                          <input :type="isPasswordVisible ? 'text' : 'password'" id="newPassword" placeholder="••••••••"
                            class="form-control pr-10" :class="{ 'border-red-500': deleteAccountForm.errors.password }"
                            v-model="deleteAccountForm.password" required />
                          <button type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                            @click="isPasswordVisible = !isPasswordVisible">
                            <svg v-if="isPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            <!-- Eye closed -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                              <path
                                d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                              <path d="M3 3l18 18" />
                            </svg>
                          </button>
                        </div>
                        <span v-if="deleteAccountForm.errors.password" class="text-red-500 text-sm">
                          {{ deleteAccountForm.errors.password }}
                        </span>
                      </div>

                      <!-- Action Buttons -->
                      <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <button type="submit" :disabled="deleteAccountForm.processing"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 danger-button">
                          Delete Account
                        </button>
                        <button type="button" @click="showDeleteButton = true"
                          class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button-outline">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </template>

              <!-- Addresses Section -->
              <template v-if="activeTab === 'address'">
                <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 space-y-3">
                  <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Addresses
                  </h2>

                  <!-- Address Item -->
                  <div v-for="address in addresses" :key="address.id"
                    class="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-primary-gray flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                        </path>
                      </svg>
                      <div>
                        <p class="font-medium text-primary-black text-sm lg:text-base">{{ address.name }} ({{
                          address.phone
                        }})
                        </p>
                        <p class="font-medium text-primary-black text-sm lg:text-base">
                          {{ address.address }}, {{ address.city.name }}, {{ address.state.name }}, {{
                            address.country.name }}
                          {{ address.zip }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button @click="editAddress(address)"
                        class="!px-3 lg:!px-4 text-sm !py-1 !font-normal primary-button-outline flex-1 sm:flex-none">
                        Edit
                      </button>
                      <button v-if="addresses.length > 1" @click="removeAddress(address)"
                        class="danger-button !py-1.5 flex-1 sm:flex-none">Remove</button>
                    </div>
                  </div>

                  <button v-if="!addresses.length" @click="openCreateAddressForm"
                    class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 my-4 primary-button w-full sm:w-auto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Address
                  </button>
                </div>
              </template>

              <template v-if="activeTab === 'orders'">
                <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                  <!-- <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Orders</h2> -->

                  <!-- Orders Table Header -->
                  <div
                    class="hidden lg:grid grid-cols-7 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-primary-gray">
                    <div>Order</div>
                    <div>Status</div>
                    <div>Payment Status</div>
                    <div>Total</div>
                    <div>Date & Time</div>
                    <div class="text-center col-span-2">Action</div>
                  </div>

                  <!-- Orders List -->
                  <div class="space-y-3 sm:space-y-4 mt-4">
                    <!-- Order 1 - Delivered -->
                    <div v-if="orders.length"
                      class="bg-white border border-gray-200 rounded-lg p-4 lg:p-0 lg:border-0 lg:rounded-none lg:grid lg:grid-cols-7 lg:gap-4 lg:py-4 hover:bg-gray-50 transition-colors">
                      <!-- Mobile Layout -->
                      <div v-for="order in orders" :key="'m' + order.id" class="lg:hidden">
                        <div class="flex items-start gap-3 sm:gap-4 mb-4">
                          <img
                            v-if="order.items && order.items.length && order.items[0].product && order.items[0].product.default_image"
                            :src="order.items[0].product.default_image" alt="Product"
                            class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0" />
                          <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between mb-2">
                              <h3 class="font-semibold text-primary-black text-sm sm:text-base">#{{ order.id }}</h3>
                              <span :class="['flex items-center gap-1 text-sm', statusColor(order.status)]">
                                <span>{{ statusIcon(order.status) }}</span>
                                {{ formatStatus(order.status) }}
                              </span>
                              <div style="inline-size: 40%;">
                                <span
                                  :class="['flex items-center gap-1 text-sm', paymentStatusColor(order.payment_status)]">
                                  {{ formatPaymentStatus(order.payment_status) }}
                                </span>
                                <p v-if="order.status == 'cancelled' && order.payment_status == 'paid'"
                                  class="text-sm text-primary-gray">Refund is in Progress</p>
                                <p v-if="order.payment_status == 'refund_pending' || order.payment_status == 'refunded'"
                                  class="text-sm text-primary-gray">Refund may take 3 to 5 business days to process</p>
                              </div>
                            </div>
                            <p class="text-xs sm:text-sm text-primary-gray mb-1">{{ order.items.length == 1 ? '1 Item' :
                              `${order.items.length} Items` }}</p>
                            <div class="flex items-center justify-between">
                              <div>
                                <p class="text-base sm:text-lg font-semibold text-primary-black">${{ order.total_amount
                                }}</p>
                                <p v-if="order.transactions && order.transactions.length"
                                  class="text-xs sm:text-sm text-primary-gray">••••{{ order.transactions[0].card_number
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                          <div>
                            <p class="text-primary-gray text-xs sm:text-sm">
                              {{ formatDate(order.created_at, 'DD MMM, YYYY') }}
                            </p>
                            <p class="text-primary-gray text-xs sm:text-sm">Order placed {{ formatDate(order.created_at,
                              'hh:mm a') }}</p>
                          </div>
                          <div class="flex flex-wrap items-center gap-2 mb-2">
                            <button @click="downloadInvoice(order)"
                              class="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-primary-black rounded-lg hover:bg-gray-50 transition-colors">
                              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                              </svg>
                              Invoice
                            </button>
                            <button v-if="order.status != 'pending'" :href="`/orders/${order.id}/track`"
                              class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-primary-black text-white rounded-lg hover:bg-primary-black/90 transition-colors">
                              Track order
                            </button>
                            <button v-if="order.status != 'cancelled' && order.payment_status != 'paid'"
                              @click="initiateRepayment(order)"
                              class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-primary-black text-white rounded-lg hover:bg-primary-black/90 transition-colors">
                              Repayment
                            </button>
                            <button v-if="['pending', 'confirmed'].includes(order.status)"
                              @click="cancelOrderConfirmation(order)"
                              class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-primary-black rounded-lg hover:bg-gray-50 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Desktop Layout -->
                      <template v-for="order in orders" :key="'d' + order.id">
                        <div class="hidden lg:flex lg:items-center lg:gap-4">
                          <img
                            v-if="order.items && order.items.length && order.items[0].product && order.items[0].product.default_image"
                            :src="order.items[0].product.default_image" alt="Product"
                            class="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          <div>
                            <h3 class="font-semibold text-primary-black">#{{ order.id }}</h3>
                            <p class="text-sm text-primary-gray">{{ order.items.length == 1 ? '1 Item' :
                              `${order.items.length} Items` }}</p>
                          </div>
                        </div>

                        <!-- <div class="hidden lg:flex lg:items-center">
                          <span class="flex items-center gap-1 text-sm text-success">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                            </svg>
                            {{ formatStatus(order.status) }}
                          </span>
                        </div> -->
                        <div class="hidden lg:flex lg:items-center">
                          <span :class="['flex items-center gap-1 text-sm', statusColor(order.status)]">
                            <span>{{ statusIcon(order.status) }}</span>
                            {{ formatStatus(order.status) }}
                          </span>
                        </div>

                        <div class="hidden lg:flex lg:items-center">
                          <div>
                            <span
                              :class="['flex items-center gap-1 text-sm', paymentStatusColor(order.payment_status)]">
                              {{ formatPaymentStatus(order.payment_status) }}
                            </span>
                            <p v-if="order.status == 'cancelled' && order.payment_status == 'paid'"
                              class="text-sm text-primary-gray">Refund is in Progress</p>
                            <p v-if="order.payment_status == 'refund_pending' || order.payment_status == 'refunded'"
                              class="text-sm text-primary-gray">Refund may take 3 to 5 business days to process</p>
                          </div>
                        </div>

                        <div class="hidden lg:flex flex-col justify-center">
                          <p class="text-sm font-semibold text-primary-black">${{ order.total_amount }}</p>
                          <template v-if="order.transactions && order.transactions.length">
                            <p class="text-sm text-primary-gray">{{ order.transactions[0].payment_method }}
                              <span v-if="order.transactions[0].card_type"> ({{ order.transactions[0].card_type
                              }})</span>
                              <span v-if="order.transactions[0].wallet_type"> ({{ order.transactions[0].wallet_type
                              }})</span>
                              <span v-if="order.transactions[0].card_number"> (••••{{ order.transactions[0].card_number
                                }})</span>
                            </p>
                          </template>
                        </div>

                        <div class="hidden lg:flex flex-col justify-center">
                          <p class="text-sm text-primary-black">{{ formatDate(order.created_at, 'DD MMM, YYYY') }}</p>
                          <p class="text-sm text-primary-gray">Order placed {{ formatDate(order.created_at, 'hh:mm a')
                          }}</p>
                        </div>

                        <div class="hidden lg:flex lg:items-center lg:justify-center lg:gap-2 lg:flex-wrap col-span-2">
                          <button @click="downloadInvoice(order)"
                            class="basis-1/2 flex items-center gap-1 !px-3 !py-1 primary-button-outline !font-normal !text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                              </path>
                            </svg>
                            Invoice
                          </button>
                          <Link v-if="order.status != 'pending'" :href="`/orders/${order.id}/track`"
                            class="basis-1/2 flex items-center gap-1 !px-3 !py-1 primary-button !font-normal !text-sm">
                            Track order
                          </Link>
                          <button v-if="order.status != 'cancelled' && order.payment_status != 'paid'"
                            @click="initiateRepayment(order)"
                            class="basis-1/2 flex items-center gap-1 !px-3 !py-1 primary-button !font-normal !text-sm">
                            Repayment
                          </button>
                          <button v-if="['pending', 'confirmed'].includes(order.status)"
                            @click="cancelOrderConfirmation(order)"
                            class="basis-1/2 flex items-center gap-1 !px-3 !py-1 primary-button-outline !font-normal !text-sm">
                            Cancel
                          </button>
                        </div>
                      </template>
                      <!-- <div class="hidden lg:block"></div> -->
                    </div>
                  </div>
                  <Link href="/my-orders"
                    class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 my-4 primary-button w-full sm:w-auto">
                    View All Orders
                  </Link>
                </div>
              </template>

              <!-- Payments Section -->
              <!-- <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Payments</h2>
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg mb-3 gap-3 sm:gap-0">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-6 flex-shrink-0" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="24" rx="4" fill="#1434CB" />
                      <path
                        d="M11.5 8.5L9.5 15.5H7.5L6.5 10.5C6.4 10.1 6.2 9.8 5.8 9.6C5.1 9.2 4.3 8.9 3.5 8.7V8.5H6.8C7.3 8.5 7.7 8.8 7.8 9.3L8.5 13L10.2 8.5H11.5ZM13 15.5H11.6L12.8 8.5H14.2L13 15.5ZM17.5 8.4C17.9 8.4 18.4 8.5 18.8 8.7L19.1 8.8L19.4 9.9L19 9.7C18.7 9.6 18.3 9.5 17.9 9.5C17.6 9.5 17.4 9.6 17.4 9.8C17.4 10 17.6 10.1 18 10.3L18.8 10.6C19.6 11 20 11.4 20 12C20 12.9 19.2 13.4 18.1 13.4C17.6 13.4 17.1 13.3 16.7 13.1L16.4 13L16.1 11.9L16.6 12.1C17 12.2 17.3 12.3 17.6 12.3C17.9 12.3 18.1 12.2 18.1 12C18.1 11.8 17.9 11.7 17.5 11.5L16.9 11.3C16.2 11 15.8 10.5 15.8 9.9C15.8 9 16.6 8.4 17.5 8.4ZM25.5 8.5L24.5 15.5H23.3L22.1 10.2L21.5 13.1C21.4 13.5 21.1 13.6 20.8 13.6H20.4L19.7 8.5H21L21.4 12.8L22.5 8.5H23.7L24.3 12.8L25.1 8.5H25.5Z"
                        fill="white" />
                    </svg>
                    <div>
                      <p class="font-medium text-primary-black text-sm lg:text-base">Visa •••• 1122</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs lg:text-sm text-primary-gray bg-gray-100 px-2 py-1 rounded">Default</span>
                    <button class="!px-3 lg:!px-4 text-sm !py-1 !font-normal primary-button-outline flex-1 sm:flex-none">
                      Edit
                    </button>
                    <button class="danger-button !py-1.5 flex-1 sm:flex-none">Remove</button>
                  </div>
                </div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg mb-3 lg:mb-4 gap-3 sm:gap-0">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-6 flex-shrink-0" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="24" rx="4" fill="#EB001B" />
                      <circle cx="12" cy="12" r="6" fill="#EB001B" />
                      <circle cx="20" cy="12" r="6" fill="#FF5F00" />
                      <path
                        d="M16 8.4C17.2 9.4 18 10.6 18 12C18 13.4 17.2 14.6 16 15.6C14.8 14.6 14 13.4 14 12C14 10.6 14.8 9.4 16 8.4Z"
                        fill="#FF5F00" />
                    </svg>
                    <div>
                      <p class="font-medium text-primary-black text-sm lg:text-base">Mastercard •••• 5874</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      class="px-2 lg:px-3 py-1.5 text-xs lg:text-sm bg-success text-white rounded-lg hover:bg-success/80 cursor-pointer transition-colors flex-1 sm:flex-none">
                      Set default
                    </button>
                    <button class="!px-3 lg:!px-4 text-sm !py-1 !font-normal primary-button-outline flex-1 sm:flex-none">
                      Edit
                    </button>
                  </div>
                </div>
                <button class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button w-full sm:w-auto">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add payment method
                </button>
              </div> -->

              <!-- Password Settings Section -->
              <template v-if="activeTab === 'password_settings'">
                <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6">
                  <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">
                    Password Settings
                  </h2>

                  <form @submit.prevent="submitPasswordUpdateForm" class="space-y-3 lg:space-y-4">
                    <!-- Current Password and New Password Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-4">
                      <!-- Current Password Field -->
                      <div v-if="user.has_password">
                        <label for="currentPassword" class="block text-sm font-medium text-primary-black mb-2">Current
                          Password</label>
                        <div class="relative">
                          <input :type="isCurrentPasswordVisible ? 'text' : 'password'" id="currentPassword"
                            placeholder="••••••••" class="form-control pr-10"
                            :class="{ 'border-red-500': passwordForm.errors.current_password }"
                            v-model="passwordForm.current_password" required />
                          <button type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                            @click="isCurrentPasswordVisible = !isCurrentPasswordVisible">
                            <svg v-if="isCurrentPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            <!-- Eye closed -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                              <path
                                d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                              <path d="M3 3l18 18" />
                            </svg>
                          </button>
                        </div>
                        <span v-if="passwordForm.errors.current_password" class="text-red-500 text-sm">
                          {{ passwordForm.errors.current_password }}
                        </span>
                      </div>

                      <!-- New Password Field -->
                      <div>
                        <label for="newPassword" class="block text-sm font-medium text-primary-black mb-2">New
                          Password</label>
                        <div class="relative">
                          <input :type="isNewPasswordVisible ? 'text' : 'password'" id="newPassword"
                            placeholder="••••••••" class="form-control pr-10"
                            :class="{ 'border-red-500': passwordForm.errors.password }" v-model="passwordForm.password"
                            required />
                          <button type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                            @click="isNewPasswordVisible = !isNewPasswordVisible">
                            <svg v-if="isNewPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            <!-- Eye closed -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                              <path
                                d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                              <path d="M3 3l18 18" />
                            </svg>
                          </button>
                        </div>
                        <span v-if="passwordForm.errors.password" class="text-red-500 text-sm">
                          {{ passwordForm.errors.password }}
                        </span>
                      </div>

                      <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-primary-black mb-2">Confirm
                          New
                          Password</label>
                        <div class="relative">
                          <input :type="isConfirmPasswordVisible ? 'text' : 'password'" id="confirmPassword"
                            placeholder="••••••••" class="form-control pr-10"
                            :class="{ 'border-red-500': passwordForm.errors.password_confirmation }"
                            v-model="passwordForm.password_confirmation" required />
                          <button type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black"
                            @click="isConfirmPasswordVisible = !isConfirmPasswordVisible">
                            <svg v-if="isConfirmPasswordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            <!-- Eye closed -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                              <path
                                d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                              <path d="M3 3l18 18" />
                            </svg>
                          </button>
                        </div>
                        <span v-if="passwordForm.errors.password_confirmation" class="text-red-500 text-sm">
                          {{ passwordForm.errors.password_confirmation }}
                        </span>
                      </div>
                    </div>

                    <!-- Save Button -->
                    <div class="flex justify-center sm:justify-end pt-2 lg:pt-4">
                      <button type="submit"
                        class="flex items-center justify-center gap-2 !px-6 lg:!px-8 text-sm !py-2 primary-button w-full sm:w-auto">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </template>
            </div>
          </div>
        </div>

      </div>
    </section>

    <Address :show="showAddressForm" @update:show="showAddressForm = $event" :countries="countries"
      :address="selectedAddress" />

    <CancelConfirmation v-model:show="showCancelModal" :order-id="toCancelOrderID" @cancel="handleCancelOrder" />

    <DeleteConfirmation v-model:show="showDeleteModal" @delete="handleDeleteAccount" />
  </div>
</template>
