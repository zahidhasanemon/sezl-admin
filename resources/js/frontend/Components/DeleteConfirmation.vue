<script setup>
import { ref } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
});

const emit = defineEmits(["update:show", "delete"]);

const isSubmitting = ref(false);

const close = () => {
  emit("update:show", false);
};

const handleSubmit = () => {

  isSubmitting.value = true;

  emit("delete");

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
            <h2 class="text-xl font-bold text-primary-black">
              Are you sure you want to delete your account?
            </h2>
            <!-- <button @click="close" aria-label="Close modal"
              class="hover:bg-gray-100 rounded-full p-1 transition-colors">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700" stroke="currentColor"
                fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z">
                </path>
              </svg>
            </button> -->
          </div>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto flex-grow">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-2 mt-15">
                <button type="button" @click="close" class="primary-button-outline flex-1 !w-full text-center !px-2"
                  :disabled="isSubmitting">
                  Keep my account
                </button>
                <button type="submit" class="danger-button flex-1 !w-full font-medium !text-base !py-3">
                  {{ isSubmitting ? 'Processing...' : 'Confirm deletion' }}
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
