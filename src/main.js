// bootstrap imports
import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";

import Vue from "vue";

import ContactsList from "./components/ContactsList";
import ContactEntry from "./components/ContactEntry";

import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: "/", component: ContactsList },
    { path: "/edit", component: ContactEntry, name: "edit" },
  ],
  mode: "history",
});

// My app and Vuex store
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount("#app");
