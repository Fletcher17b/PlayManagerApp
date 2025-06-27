<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Left: Brand -->
      <div class="navbar-brand">
        <h1 class="navbar-title">🎵 Playlist Manager</h1>
      </div>

      <!-- Center: Navigation Menu -->
      <div class="navbar-menu">
        <button
          class="nav-link"
          :class="{ active: $route.name === 'Home' }"
          @click="goHome"
        >
          <span class="nav-icon">🏠</span>
          <span class="nav-text">HOME</span>
        </button>

        <button
          class="nav-link"
          :class="{ active: $route.name === 'Dashboard' }"
          @click="goDashboard"
        >
          <span class="nav-icon">📊</span>
          <span class="nav-text">DASH</span>
        </button>
      </div>

      <!-- Right: Theme Toggle -->
      <div class="navbar-actions">
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span class="theme-icon">{{ isDark ? "☀️" : "🌙" }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isDarkTheme"]),
    isDark() {
      return this.isDarkTheme;
    },
  },
  methods: {
    ...mapActions(["toggleTheme"]),
    goHome() {
      this.$router.push("/");
    },
    goDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: var(--shadow-sm);
  z-index: var(--z-fixed);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] .navbar {
  background: rgba(30, 41, 59, 0.8);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.navbar-brand {
  flex: 0 0 auto;
}

.navbar-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  white-space: nowrap;
}

.navbar-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.nav-link.active {
  background: var(--gradient-primary);
  color: var(--text-inverse);
  box-shadow: var(--shadow-md);
}

.nav-icon {
  font-size: var(--font-size-lg);
}

.nav-text {
  display: none;
}

.navbar-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-secondary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.theme-icon {
  font-size: var(--font-size-lg);
}

.theme-text {
  display: none;
}

/* Desktop: Show text labels and adjust layout */
@media (min-width: 768px) {
  .nav-text {
    display: inline;
  }

  .navbar-container {
    padding: 0 var(--spacing-xl);
  }

  .navbar-menu {
    gap: var(--spacing-lg);
  }

  .nav-link {
    padding: var(--spacing-sm) var(--spacing-lg);
  }
}

/* Mobile: Compact layout */
@media (max-width: 767px) {
  .navbar-container {
    padding: 0 var(--spacing-md);
  }

  .navbar-title {
    font-size: var(--font-size-lg);
  }

  .nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .theme-toggle {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 var(--spacing-sm);
  }

  .navbar-title {
    font-size: var(--font-size-base);
  }

  .nav-link {
    padding: var(--spacing-xs);
  }

  .theme-toggle {
    width: 36px;
    height: 36px;
  }
}
</style>
