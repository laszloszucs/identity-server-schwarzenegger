import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
// import DBkeys from "@/models/DBkeys";
// import localStore from "@/helpers/local-store-manager";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

axios.interceptors.request.use(
  config => {
    const accessToken = store.getters.accessToken();
    // const accessToken = localStore.getData(DBkeys.ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
