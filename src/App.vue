<template>
  <div id="app">
    <!-- <Navbar /> -->
    <h2 class="text-center my-3">Contacts</h2>
    <ContactsList />
    <ContactEntryModal id="henlo" />
  </div>
</template>

<script>
import ContactsList from "./components/ContactsList";
import ContactEntryModal from "./components/ContactEntryModal";

export default {
  name: "app",
  components: {
    ContactsList,
    ContactEntryModal,
  },
  mounted() {
    // When the app starts, fetch the contacts from Firestore
    this.$store.dispatch("bindContacts");
  },
};
</script>
