<!--
  Reusable component for displaying individual playlist information.
  
  Props:
  - playlist: Object containing playlist data (id, name, description, etc.)
  
  Events:
  - edit: Emitted when edit button is clicked (passes playlist object)
  - delete: Emitted when delete button is clicked (passes playlist ID)

  Features:
  - edit and delete actions
  - Responsive design 
  - Displays playlist thumbnail (kinda), title, description, and metadata
  - Handles click navigation to playlist detail page

    TODO: pretty crude UI, needs more prettifying 

-->

<template>
  <div class="playlist-card" style="margin: 5vh">
    <div class="playlist-content" @click="goToPlaylist">
      <img
        :src="playlist.thumbnail"
        class="playlist-image"
        alt="Playlist cover"
      />
      <div class="playlist-info">
        <h2 class="playlist-title">{{ playlist.name }}</h2>
        <p class="playlist-description">{{ playlist.description }}</p>
        <p class="playlist-meta">
          {{ playlist.songCount }} song{{ playlist.songCount === 1 ? "" : "s" }}
          ·
          {{ formattedDate }}
        </p>
      </div>
    </div>

    <div class="playlist-actions">
      <button @click.stop="editPlaylist" class="action-btn edit-btn">
        ✏️ Edit
      </button>
      <button @click.stop="deletePlaylist" class="action-btn delete-btn">
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistCard",
  props: {
    playlist: Object,
  },
  computed: {
    formattedDate() {
      return new Date(this.playlist.created_at).toLocaleDateString();
    },
  },
  methods: {
    goToPlaylist() {
      this.$router.push(`/playlist/${this.playlist.id}`);
    },
    editPlaylist() {
      this.$emit("edit", this.playlist);
    },
    deletePlaylist() {
      if (confirm(`Are you sure you want to delete "${this.playlist.name}"?`)) {
        this.$emit("delete", this.playlist.id);
      }
    },
  },
};
</script>

<style scoped>
.playlist-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
  box-shadow: var(--shadow-sm);
}

.playlist-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--border-secondary);
}

.playlist-content {
  cursor: pointer;
  position: relative;
}

.playlist-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--gradient-card);
  position: relative;
}

.playlist-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  opacity: 0.1;
  transition: opacity var(--transition-fast);
}

.playlist-card:hover .playlist-image::before {
  opacity: 0.2;
}

.playlist-info {
  padding: var(--spacing-lg);
}

.playlist-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  line-height: 1.3;
}

.playlist-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.playlist-meta {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.playlist-meta::before {
  content: "🎵";
  font-size: var(--font-size-sm);
}

.playlist-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
  background: var(--bg-secondary);
}

.action-btn {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
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
@media (min-width: 768px) {
  .playlist-card {
    max-width: none;
  }

  .playlist-image {
    height: 180px;
  }
}

@media (max-width: 640px) {
  .playlist-info {
    padding: var(--spacing-md);
  }

  .playlist-actions {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .action-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
}
</style>
