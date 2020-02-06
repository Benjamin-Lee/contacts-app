<template>
  <div id="app">
    <Navbar />
    <ContactsList />
    <ContactEntryModal id="henlo" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import ContactsList from "./components/ContactsList";
import ContactEntryModal from "./components/ContactEntryModal";

export default {
  name: "app",
  components: {
    Navbar,
    ContactsList,
    ContactEntryModal,
  },
  mounted() {
    // When the app starts, fetch the contacts from Firestore
    this.$store.dispatch("bindContacts");
  },
};
</script>
