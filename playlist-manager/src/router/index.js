/*
 * router/index.js
 * Configures Vue Router for the Playlist Manager app.
 * Defines routes for Home, Dashboard, and Playlist Detail views.
 */

import { createRouter, createWebHistory } from "vue-router";

// Route-level code splitting for better performance
const Home = () => import("../views/Home.vue");
const Dashboard = () => import("@/views/Dashboard.vue");
const Playlist = () => import("../views/Playlist.vue");

// Define the application's routes, Auth not implemented
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
      title: "Home Page",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false,
      title: "User Dashboard",
    },
  },
  {
    path: "/playlist/:id",
    name: "Playlist",
    component: Playlist,
    props: true,
    meta: {
      requiresAuth: false,
      title: "Playlist Details",
    },
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route
    redirect: "/", // Temporary redirect to home
    // TODO: Implement dedicated 404 page
  },
];

/**
 * Router instance with configured routes
 * @type {Router}
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes,

  // Return to saved position or scroll to top
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // Update document title from route meta
  document.title = to.meta.title || "Default App Title";
  next();
});

export default router;
