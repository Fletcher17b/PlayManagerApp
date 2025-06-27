import axios from "axios";
// Due to working on local we make the calls to the designated port
/**
 * API Configuration
 * Base Axios instance configured for the Django REST API
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Global request interceptor for logging and error handling
 */
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Global response interceptor for error handling
 */
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Playlist API Service
 * Handles all playlist-related API operations
 */
export const playlistAPI = {
  /**
   * Fetch all playlists from the API
   * @async
   * @returns {Promise<Object>} Promise that resolves to playlists data
   * @throws {Error} When API request fails
   * @example
   * try {
   *   const response = await playlistAPI.getPlaylists();
   *   console.log(response.data); // Array of playlist objects
   * } catch (error) {
   *   console.error('Failed to fetch playlists:', error);
   * }
   */
  getPlaylists() {
    return api.get("playlists/");
  },

  /**
   * Fetch a specific playlist by ID with its songs
   * @async
   * @param {number} id - The playlist ID
   * @returns {Promise<Object>} Promise that resolves to playlist data with songs
   * @throws {Error} When API request fails or playlist not found
   * @example
   * try {
   *   const response = await playlistAPI.getPlaylist(1);
   *   console.log(response.data); // Playlist object with songs array
   * } catch (error) {
   *   console.error('Failed to fetch playlist:', error);
   * }
   */
  getPlaylist(id) {
    if (!id || typeof id !== "number") {
      throw new Error("Valid playlist ID is required");
    }
    return api.get(`playlists/${id}/`);
  },

  /**
   * Create a new playlist
   * @async
   * @param {Object} playlistData - The playlist data to create
   * @param {string} playlistData.name - Playlist name (required)
   * @param {string} [playlistData.description] - Playlist description
   * @param {string} [playlistData.thumbnail] - Playlist thumbnail URL
   * @returns {Promise<Object>} Promise that resolves to created playlist data
   * @throws {Error} When API request fails or validation errors
   * @example
   * try {
   *   const newPlaylist = await playlistAPI.createPlaylist({
   *     name: 'My New Playlist',
   *     description: 'A collection of my favorite songs',
   *     thumbnail: 'https://example.com/thumbnail.jpg'
   *   });
   *   console.log(newPlaylist.data); // Created playlist object
   * } catch (error) {
   *   console.error('Failed to create playlist:', error);
   * }
   */
  createPlaylist(playlistData) {
    if (!playlistData || !playlistData.name) {
      throw new Error("Playlist name is required");
    }
    return api.post("playlists/", playlistData);
  },

  /**
   * Update an existing playlist
   * @async
   * @param {number} id - The playlist ID to update
   * @param {Object} playlistData - The updated playlist data
   * @param {string} [playlistData.name] - Updated playlist name
   * @param {string} [playlistData.description] - Updated playlist description
   * @param {string} [playlistData.thumbnail] - Updated playlist thumbnail URL
   * @returns {Promise<Object>} Promise that resolves to updated playlist data
   * @throws {Error} When API request fails or playlist not found
   * @example
   * try {
   *   const updatedPlaylist = await playlistAPI.updatePlaylist(1, {
   *     name: 'Updated Playlist Name',
   *     description: 'Updated description'
   *   });
   *   console.log(updatedPlaylist.data); // Updated playlist object
   * } catch (error) {
   *   console.error('Failed to update playlist:', error);
   * }
   */
  updatePlaylist(id, playlistData) {
    if (!id || typeof id !== "number") {
      throw new Error("Valid playlist ID is required");
    }
    if (!playlistData || typeof playlistData !== "object") {
      throw new Error("Playlist data object is required");
    }
    return api.put(`playlists/${id}/`, playlistData);
  },

  /**
   * Delete a playlist and all its songs
   * @async
   * @param {number} id - The playlist ID to delete
   * @returns {Promise<Object>} Promise that resolves when playlist is deleted
   * @throws {Error} When API request fails or playlist not found
   * @example
   * try {
   *   await playlistAPI.deletePlaylist(1);
   *   console.log('Playlist deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete playlist:', error);
   * }
   */
  deletePlaylist(id) {
    if (!id || typeof id !== "number") {
      throw new Error("Valid playlist ID is required");
    }
    return api.delete(`playlists/${id}/`);
  },
};

/**
 * Song API Service
 * Handles all song-related API operations
 */
export const songAPI = {
  /**
   * Fetch all songs from the API
   * @async
   * @returns {Promise<Object>} Promise that resolves to songs data
   * @throws {Error} When API request fails
   * @example
   * try {
   *   const response = await songAPI.getSongs();
   *   console.log(response.data); // Array of song objects
   * } catch (error) {
   *   console.error('Failed to fetch songs:', error);
   * }
   */
  getSongs() {
    return api.get("songs/");
  },

  /**
   * Fetch songs filtered by playlist ID
   * @async
   * @param {number} playlistId - The playlist ID to filter songs by
   * @returns {Promise<Object>} Promise that resolves to filtered songs data
   * @throws {Error} When API request fails or invalid playlist ID
   * @example
   * try {
   *   const response = await songAPI.getSongsByPlaylist(1);
   *   console.log(response.data); // Array of songs in playlist
   * } catch (error) {
   *   console.error('Failed to fetch songs by playlist:', error);
   * }
   */
  getSongsByPlaylist(playlistId) {
    if (!playlistId || typeof playlistId !== "number") {
      throw new Error("Valid playlist ID is required");
    }
    return api.get(`songs/?playlist=${playlistId}`);
  },

  /**
   * Create a new song
   * @async
   * @param {Object} songData - The song data to create
   * @param {number} songData.playlist - Playlist ID (required)
   * @param {string} songData.title - Song title (required)
   * @param {string} songData.artist - Song artist (required)
   * @param {string} [songData.album] - Album name
   * @param {string} songData.duration - Song duration in mm:ss format (required)
   * @param {string} songData.genre - Song genre (required)
   * @returns {Promise<Object>} Promise that resolves to created song data
   * @throws {Error} When API request fails or validation errors
   * @example
   * try {
   *   const newSong = await songAPI.createSong({
   *     playlist: 1,
   *     title: 'Bohemian Rhapsody',
   *     artist: 'Queen',
   *     album: 'A Night at the Opera',
   *     duration: '5:55',
   *     genre: 'Rock'
   *   });
   *   console.log(newSong.data); // Created song object
   * } catch (error) {
   *   console.error('Failed to create song:', error);
   * }
   */
  createSong(songData) {
    if (
      !songData ||
      !songData.playlist ||
      !songData.title ||
      !songData.artist
    ) {
      throw new Error("Playlist ID, title, and artist are required");
    }
    return api.post("songs/", songData);
  },

  /**
   * Update an existing song
   * @async
   * @param {number} id - The song ID to update
   * @param {Object} songData - The updated song data
   * @param {number} [songData.playlist] - Updated playlist ID
   * @param {string} [songData.title] - Updated song title
   * @param {string} [songData.artist] - Updated song artist
   * @param {string} [songData.album] - Updated album name
   * @param {string} [songData.duration] - Updated song duration
   * @param {string} [songData.genre] - Updated song genre
   * @returns {Promise<Object>} Promise that resolves to updated song data
   * @throws {Error} When API request fails or song not found
   * @example
   * try {
   *   const updatedSong = await songAPI.updateSong(1, {
   *     title: 'Updated Song Title',
   *     artist: 'Updated Artist'
   *   });
   *   console.log(updatedSong.data); // Updated song object
   * } catch (error) {
   *   console.error('Failed to update song:', error);
   * }
   */
  updateSong(id, songData) {
    if (!id || typeof id !== "number") {
      throw new Error("Valid song ID is required");
    }
    if (!songData || typeof songData !== "object") {
      throw new Error("Song data object is required");
    }
    return api.put(`songs/${id}/`, songData);
  },

  /**
   * Delete a song
   * @async
   * @param {number} id - The song ID to delete
   * @returns {Promise<Object>} Promise that resolves when song is deleted
   * @throws {Error} When API request fails or song not found
   * @example
   * try {
   *   await songAPI.deleteSong(1);
   *   console.log('Song deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete song:', error);
   * }
   */
  deleteSong(id) {
    if (!id || typeof id !== "number") {
      throw new Error("Valid song ID is required");
    }
    return api.delete(`songs/${id}/`);
  },
};

/**
 * Default export of the configured API instance
 * Can be used for custom API calls or configuration
 */
export default api;
