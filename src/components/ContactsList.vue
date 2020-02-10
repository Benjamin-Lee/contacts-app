<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="my-3">
      <b-col class="d-flex">
        <b-input-group prepend="Search" size="lg" class="justify-content-start">
          <b-form-input v-model="searchTerm" trim type="search" />
        </b-input-group>
        <b-button
          variant="outline-success"
          size="lg"
          class="justify-content-end ml-3"
          to="new"
        >
          +
        </b-button>
      </b-col>
    </b-row>

    <b-list-group>
      <b-list-group-item
        href="#"
        v-for="(contact, index) in filteredContacts"
        :key="index"
        @click="
          selectedContact = contact;
          showSelectedContact = true;
        "
      >
        <h5 class="mb-1">{{ contact.first_name }} {{ contact.last_name }}</h5>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      v-model="showSelectedContact"
      :title="selectedContact.first_name + ' ' + selectedContact.last_name"
      scrollable
      centered
    >
      <ContactDisplayModal :selectedContact="selectedContact" />
      <template v-slot:modal-footer="{ cancel }">
        <b-button
          variant="outline-secondary"
          :to="{
            name: 'edit',
            params: { contact: selectedContact, id: selectedContact.id },
          }"
        >
          Edit
        </b-button>
        <!-- Button with custom close trigger value -->
        <b-button variant="outline-primary" @click="cancel()">
          Close
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Fuse from "fuse.js";
import ContactDisplayModal from "./ContactDisplayModal";

export default {
  data() {
    return {
      searchTerm: "",
      selectedContact: {},
      showSelectedContact: false,
    };
  },
  components: { ContactDisplayModal },
  computed: {
    fuse: function() {
      return new Fuse(this.contacts, {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "address.city",
          "address.state",
          "address.line1",
          "address.line2",
          "address.zip",
        ],
      });
    },

    filteredContacts: function() {
      if (this.searchTerm.length) {
        return this.fuse.search(this.searchTerm);
      }
      return this.contacts;
    },
    ...mapState(["contacts"]),
  },
  methods: {
    show: function(contact) {
      this.$bvModal.msgBoxOk(contact);
    },
  },
};
</script>
