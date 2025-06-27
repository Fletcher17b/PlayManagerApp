<!--
  Dashboard.vue
  Main dashboard view for the Playlist Manager application.
  
  Features:
  - Displays all user playlists in a responsive grid
  - Allows creating new playlists via modal
  - Supports editing and deleting existing playlists
  - Integrates with Vuex store for state management
  
  Components used:
  - Navbar: Navigation component
  - PlaylistCard: Individual playlist display cards
  - AddPlaylistModal: Modal for creating/editing playlists
-->

<template>
  <!-- Navigation bar at the top -->
  <Navbar />

  <div class="dashboard">
    <!-- Header section with title and create button -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1 class="dashboard-title">Your Playlists</h1>
        <p class="dashboard-subtitle">
          Create and manage your music collections
        </p>
      </div>
      <button class="btn btn-primary add-btn" @click="openCreateModal">
        <span class="btn-icon">➕</span>
        <span class="btn-text">New Playlist</span>
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading your playlists...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="playlists.length === 0" class="empty-state">
      <div class="empty-icon">🎵</div>
      <h3>No playlists yet</h3>
      <p>Create your first playlist to get started!</p>
      <button class="btn btn-primary" @click="openCreateModal">
        Create Your First Playlist
      </button>
    </div>

    <!-- Playlist grid -->
    <div v-else class="playlist-grid">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>

    <!-- Modal for creating/editing playlists (conditionally rendered) -->
    <AddPlaylistModal
      v-if="showModal"
      :editingPlaylist="editing"
      @save="handleSave"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlaylistCard from "../components/PlaylistCard.vue";
import Navbar from "../components/Navbar.vue";
import AddPlaylistModal from "../components/modals/AddPlaylistModal.vue";

export default {
  name: "Dashboard",

  // Register child components
  components: {
    PlaylistCard,
    Navbar,
    AddPlaylistModal,
  },

  // Component's local data
  data() {
    return {
      showModal: false, // Controls modal visibility
      editing: null, // Holds the playlist being edited (null = creating new)
      loading: true, // Loading state
    };
  },

  // Computed properties (reactive data derived from store)
  computed: {
    // Map Vuex getters to component properties
    ...mapGetters("playlists", ["allPlaylists"]),

    // Alias for better readability
    playlists() {
      return this.allPlaylists;
    },
  },

  // Component methods
  methods: {
    // Map Vuex actions to component methods
    ...mapActions("playlists", [
      "fetchPlaylists",
      "createPlaylist",
      "updatePlaylist",
      "deletePlaylist",
    ]),

    /**
     * Opens the modal for creating a new playlist
     */
    openCreateModal() {
      this.editing = null; // No playlist being edited
      this.showModal = true;
    },

    /**
     * Opens the modal for editing an existing playlist
     * @param {Object} playlist - The playlist object to edit
     */
    openEditModal(playlist) {
      this.editing = playlist; // Set the playlist being edited
      this.showModal = true;
    },

    /**
     * Closes the modal and resets editing state
     */
    closeModal() {
      this.showModal = false;
      this.editing = null;
    },

    /**
     * Handles saving a playlist (create or update)
     * @param {Object} playlist - The playlist data to save
     */
    async handleSave(playlist) {
      try {
        if (this.editing) {
          // Update existing playlist
          await this.updatePlaylist({
            id: this.editing.id,
            playlistData: playlist,
          });
        } else {
          // Create new playlist
          await this.createPlaylist(playlist);
        }
        this.closeModal();
      } catch (error) {
        console.error("Error saving playlist:", error);
        // TODO: Add user-friendly error notification (toast)
      }
    },

    /**
     * Handles deleting a playlist
     * @param {number|string} playlistId - ID of the playlist to delete
     */
    async handleDelete(playlistId) {
      try {
        await this.deletePlaylist(playlistId);
      } catch (error) {
        console.error("Error deleting playlist:", error);
        // TODO: error notification
      }
    },
  },

  // Lifecycle hook: called when component is mounted
  async mounted() {
    try {
      // Fetch playlists from the API when component loads
      await this.fetchPlaylists();
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* Main dashboard container */
.dashboard {
  padding-top: 90px; /* Account for fixed navbar */
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 90px var(--spacing-lg) var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

/* Header section styling */
.dashboard-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl) 0;
}

.dashboard-header h1 {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 var(--spacing-sm) 0;
  text-align: center;
}

.dashboard-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
}

/* Create playlist button styling */
.add-btn {
  background: var(--gradient-primary);
  color: var(--text-inverse);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-base);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  align-self: center;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  font-size: var(--font-size-lg);
}

.btn-text {
  margin-left: var(--spacing-xs);
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  margin-bottom: var(--spacing-xl);
}

/* Responsive grid for playlist cards */
.playlist-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  animation: fadeIn 0.5s ease-out;
}

/* Tablet breakpoint */
@media (min-width: 768px) {
  .dashboard-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .dashboard-header h1 {
    text-align: left;
  }

  .playlist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop breakpoint */
@media (min-width: 1280px) {
  .playlist-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .dashboard {
    padding: 80px var(--spacing-md) var(--spacing-lg);
  }

  .dashboard-title {
    font-size: var(--font-size-3xl);
  }

  .dashboard-subtitle {
    font-size: var(--font-size-base);
  }

  .add-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
