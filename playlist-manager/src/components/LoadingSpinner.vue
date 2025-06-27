<template>
  <div class="loading-spinner" :class="{ overlay: overlay }">
    <div class="spinner-container">
      <div class="spinner"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    message: {
      type: String,
      default: "Loading...",
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

.loading-spinner.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-message {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin: 0;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Dark theme adjustments */
[data-theme="dark"] .loading-spinner.overlay {
  background: rgba(0, 0, 0, 0.7);
}
</style>
