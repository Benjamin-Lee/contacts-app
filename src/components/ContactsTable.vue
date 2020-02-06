<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="my-3">
      <b-col class="d-flex">
        <b-input-group prepend="Search" size="lg" class="justify-content-start">
          <b-form-input v-model="searchTerm" trim></b-form-input>
        </b-input-group>
        <b-button
          variant="outline-success"
          size="lg"
          class="justify-content-end ml-3"
          >+</b-button
        >
      </b-col>
    </b-row>

    <b-list-group>
      <b-list-group-item
        href="#"
        v-for="(contact, index) in filteredContacts"
        :key="index"
        @click="show(contact.first_name)"
      >
        <h5 class="mb-1">{{ contact.first_name }} {{ contact.last_name }}</h5>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Fuse from "fuse.js";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },
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
    show: function(index) {
      this.$bvModal.msgBoxOk(index);
    },
  },
};
</script>
