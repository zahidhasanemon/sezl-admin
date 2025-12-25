<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: Boolean,
  maxWidth: {
    type: String,
    default: 'lg'
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const closeOnEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    close();
  }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

const maxWidthClass = {
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
}[props.maxWidth];
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0"
        @click="close"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50"></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-lg shadow-xl mx-auto my-8 p-6"
          :class="maxWidthClass"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="close"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
              <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
            </svg>
          </button>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
