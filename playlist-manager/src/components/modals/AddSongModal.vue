<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Add Song to Playlist</h2>
        <button class="modal-close" @click="close" aria-label="Close modal">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label class="form-label">
            Title
            <input
              v-model="form.title"
              required
              class="form-input"
              placeholder="Enter song title"
            />
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">
            Artist
            <input
              v-model="form.artist"
              required
              class="form-input"
              placeholder="Enter artist name"
            />
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">
            Album
            <input
              v-model="form.album"
              class="form-input"
              placeholder="Enter album name"
            />
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">
            Duration (mm:ss)
            <input
              v-model="form.duration"
              placeholder="3:45"
              required
              pattern="[0-9]+:[0-5][0-9]"
              class="form-input"
            />
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">
            Genre
            <input
              v-model="form.genre"
              class="form-input"
              placeholder="Enter genre"
            />
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="close" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Add Song</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSongModal",
  props: {
    playlistId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: "",
        artist: "",
        album: "",
        duration: "",
        genre: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        ...this.form,
        playlist: this.playlistId,
      };
      this.$emit("save", payload);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
  padding: var(--spacing-md);
}

.modal-content {
  background: var(--bg-modal);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--border-primary);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.modal-form {
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
}

.modal-actions .btn {
  min-width: 100px;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-overlay {
    padding: var(--spacing-sm);
  }

  .modal-content {
    max-width: none;
    margin: var(--spacing-sm);
  }

  .modal-header {
    padding: var(--spacing-md);
  }

  .modal-form {
    padding: var(--spacing-lg);
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .modal-actions .btn {
    width: 100%;
  }
}
</style>
