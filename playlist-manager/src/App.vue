<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-normal),
    color var(--transition-normal);
}

/* Ensure smooth transitions for theme changes */
* {
  transition: background-color var(--transition-normal),
    color var(--transition-normal), border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}
</style>
