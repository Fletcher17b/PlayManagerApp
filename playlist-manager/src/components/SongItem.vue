<template>
  <div class="song-card">
    <div class="song-header">
      <div class="drag-handle">⋮⋮</div>
      <div class="song-info">
        <p class="title">{{ song.title || "Unknown Artist" }}</p>
        <p class="meta">
          {{ song.artist || "Unknown Artist" }} —
          {{ song.album || "Unknown Album" }}
        </p>
        <p class="genre">{{ song.genre || "-" }}</p>
      </div>
      <div class="duration">{{ song.duration || "0:00" }}</div>
    </div>
    <div class="song-actions">
      <button
        @click="$emit('edit', song)"
        class="edit-btn"
        style="display: none"
      >
        ✏️ Edit
      </button>
      <button @click="$emit('delete', song.id)" class="delete-btn">
        🗑️ Remove
      </button>
    </div>
  </div>
</template>

<script>
/**
 * SongItem Component
 *
 * Displays individual song information in a card format with drag-and-drop support
 * and action buttons for editing and deleting songs.
 *
 * @component
 * @example
 * <SongItem
 *   :song="{ id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', genre: 'Rock' }"
 *   :index="0"
 *   @edit="handleEdit"
 *   @delete="handleDelete"
 * />
 */
export default {
  name: "SongItem",
  props: {
    /**
     * Song data object containing all song information
     * @type {Object}
     * @required
     * @property {number} id - Unique song identifier
     * @property {string} title - Song title
     * @property {string} artist - Song artist
     * @property {string} album - Album name
     * @property {string} duration - Song duration in mm:ss format
     * @property {string} genre - Song genre
     */
    song: {
      type: Object,
      required: true,
      validator: function (value) {
        return value && typeof value === "object" && "title" in value;
      },
    },
    /**
     * Position index of the song in the list (used for drag-and-drop ordering)
     * @type {Number}
     * @optional
     */
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  /**
   * Component events that can be emitted
   * @emits {edit} - Emitted when edit button is clicked, passes the song object
   * @emits {delete} - Emitted when delete button is clicked, passes the song ID
   */
  emits: ["edit", "delete"],
  /**
   * Component lifecycle hook - called when component is mounted
   */
  mounted() {
    // Component is ready for interaction
  },
};
</script>

<style scoped>
.song-card {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-md);
  display: flex;
  flex-direction: column;
  cursor: grab;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-primary);
}

.song-card:active {
  cursor: grabbing;
}

.song-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
  border-color: var(--border-secondary);
}

.song-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.drag-handle {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  cursor: grab;
  user-select: none;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
}

.drag-handle:hover {
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  transform: scale(1.05);
}

.song-info {
  flex: 1 1 auto;
  min-width: 0;
}

.title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  line-height: 1.3;
}

.meta {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.4;
}

.genre {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 500;
  background: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  display: inline-block;
  border: 1px solid var(--border-primary);
}

.duration {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
  background: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-primary);
  white-space: nowrap;
}

.song-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-primary);
}

.song-actions button {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.edit-btn {
  background: var(--bg-tertiary);
  color: var(--primary-color);
  border: 1px solid var(--border-primary);
}

.edit-btn:hover {
  background: var(--primary-color);
  color: var(--text-inverse);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.delete-btn {
  background: var(--bg-tertiary);
  color: var(--error-color);
  border: 1px solid var(--border-primary);
}

.delete-btn:hover {
  background: var(--error-color);
  color: var(--text-inverse);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* Responsive Design */
@media (max-width: 640px) {
  .song-card {
    padding: var(--spacing-md);
  }

  .song-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .duration {
    align-self: flex-start;
  }

  .song-actions {
    flex-direction: column;
  }

  .song-actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>
