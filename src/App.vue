<template>
  <div id="app">
    <h2 class="text-center my-3">Contacts</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    // When the app starts, fetch the contacts from Firestore
    this.$store.dispatch("bindContacts");
  },
};
</script>
