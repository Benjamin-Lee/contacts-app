import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(Vuex);

// Get a Firestore instance
const db = firebase
  .initializeApp({ projectId: "service-fusion-contacts" })
  .firestore();

export default new Vuex.Store({
  state: { contacts: [] },
  mutations: vuexfireMutations,
  actions: {
    bindContacts: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("contacts", db.collection("contacts"));
    }),
    deleteContact: firestoreAction((context, contactID) => {
      db.collection("contacts")
        .doc(contactID)
        .delete();
    }),
  },
  modules: {},
});
