<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container> </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    Navbar,
  },
  mounted() {
    // When the app starts, fetch the contacts from Firestore
    this.$store.dispatch("bindContacts");
  },
};
</script>
