// bootstrap imports
import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";

import Vue from "vue";

// My app and Vuex store
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount("#app");
