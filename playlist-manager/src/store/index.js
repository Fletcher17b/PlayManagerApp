import { createStore } from "vuex";
import playlists from "./playlists";
import songs from "./songs";
import ui from "./ui";

const THEME_KEY = "app-theme";

export default createStore({
  state: {
    theme: localStorage.getItem(THEME_KEY) || "light",
  },
  getters: {
    isDarkTheme: (state) => state.theme === "dark",
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem(THEME_KEY, theme);

      // Set data attribute on html element for CSS custom properties
      document.documentElement.setAttribute("data-theme", theme);

      //backward compatibility for old implementation
      document.body.classList.toggle("dark-mode", theme === "dark");
    },
  },
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === "light" ? "dark" : "light";
      commit("setTheme", newTheme);
    },
    initializeTheme({ commit, state }) {
      // Set initial theme
      commit("setTheme", state.theme);
    },
  },
  modules: {
    playlists,
    songs,
    ui,
  },
});
