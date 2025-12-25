<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
  orderId: { type: [Number, String], default: null },
});

const emit = defineEmits(["update:show", "cancel"]);

const selectedReason = ref("");
const additionalDetails = ref("");
const isSubmitting = ref(false);

const reasons = [
  { value: "Ordered by mistake", label: "Ordered by mistake" },
  { value: "Found a better price", label: "Found a better price" },
  { value: "Delivery time too long", label: "Delivery time too long" },
  { value: "Payment issue", label: "Payment issue" },
  { value: "Other", label: "Other" },
];

watch(
  () => props.show,
  (val) => {
    if (!val) {
      // Reset form when modal closes
      selectedReason.value = "";
      additionalDetails.value = "";
    }
  }
);

const close = () => {
  emit("update:show", false);
};

const handleSubmit = () => {
  if (!selectedReason.value) {
    return;
  }

  isSubmitting.value = true;

  emit("cancel", {
    orderId: props.orderId,
    reason: selectedReason.value,
    details: additionalDetails.value,
  });

  // Reset submitting state after emit
  // The parent component should handle the actual cancellation and close the modal
  setTimeout(() => {
    isSubmitting.value = false;
  }, 500);
};
</script>

<template>
  <Teleport to="body">
    <transition name="fade-scale">
      <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"
        @click.self="close">
        <div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[90vh] w-full max-w-lg flex flex-col overflow-hidden"
          @click.stop>
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-primary-black">
              Cancel Order
            </h2>
            <button @click="close" aria-label="Close modal"
              class="hover:bg-gray-100 rounded-full p-1 transition-colors">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700" stroke="currentColor"
                fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z">
                </path>
              </svg>
            </button>
          </div>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto flex-grow">
            <!-- Cancellation Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Reason Selection -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-3">
                  Reason for cancellation
                </label>
                <div class="space-y-3">
                  <label v-for="reason in reasons" :key="reason.value"
                    class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input type="radio" :value="reason.value" v-model="selectedReason"
                      class="w-4 h-4 text-primary-black border-gray-300 focus:ring-primary-black" />
                    <span class="ml-3 text-sm text-primary-black">
                      {{ reason.label }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Additional Details -->
              <div>
                <label for="details" class="block text-sm font-medium text-primary-black mb-2">
                  Additional details (optional)
                </label>
                <textarea id="details" v-model="additionalDetails" rows="3"
                  placeholder="Tell us more about your reason for cancellation..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-black focus:border-transparent resize-none"></textarea>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" @click="close" class="primary-button-outline flex-1 !w-full text-center !px-2"
                  :disabled="isSubmitting">
                  Keep my order
                </button>
                <button type="submit" class="danger-button flex-1 !w-full font-medium !text-base !py-3"
                  :disabled="!selectedReason || isSubmitting" :class="{
                    'opacity-50 cursor-not-allowed': !selectedReason || isSubmitting
                  }">
                  {{ isSubmitting ? 'Processing...' : 'Confirm cancellation' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
