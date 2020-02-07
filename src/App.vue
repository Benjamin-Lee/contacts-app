<template>
  <div id="app">
    <b-container>
      <h2 class="text-center my-3">
        {{ this.$route.name }}
      </h2>
      <router-view></router-view>
    </b-container>
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

<style scoped>
h2 {
  text-transform: capitalize;
}
</style>
