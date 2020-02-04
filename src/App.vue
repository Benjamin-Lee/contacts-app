<template>
  <div id="app">
    <Navbar />
    <ContactsTable />
    <ContactEntryModal id="henlo" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import ContactsTable from "./components/ContactsTable";
import ContactEntryModal from "./components/ContactEntryModal";

export default {
  name: "app",
  components: {
    Navbar,
    ContactsTable,
    ContactEntryModal,
  },
  mounted() {
    // When the app starts, fetch the contacts from Firestore
    this.$store.dispatch("bindContacts");
  },
};
</script>
