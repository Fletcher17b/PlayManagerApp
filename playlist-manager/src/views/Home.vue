<template>
  <div>
    <Navbar></Navbar>
    <h1>Home</h1>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  data() {
    return {
      showModal: false,
      editing: null, // holds the playlist being edited or null
    };
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
