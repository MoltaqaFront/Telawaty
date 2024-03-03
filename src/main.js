import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Start:: Importing Main Sass Styles File
import "./assets/sass/main.scss";
// End:: Importing Main Sass Styles File

// Start:: Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// End:: Importing Bootstrap

import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Start:: Importing Plugins
import i18n from "./plugins/i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import Antd from "./plugins/antDesign";
import "./plugins/googleMaps";
import "./plugins/formComponents";
import "./plugins/globalComponents";
import "./plugins/3rdPartyLibraries";

import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCbi0FUJDBPITd2Pxfk15PjrpZZsMfmeGg",
  authDomain: "tlawaty.firebaseapp.com",
  projectId: "tlawaty",
  storageBucket: "tlawaty.appspot.com",
  messagingSenderId: "590592866685",
  appId: "1:590592866685:web:001583c81dab7ec96b3414",
  measurementId: "G-1QQLBF621W",
};

firebase.initializeApp(firebaseConfig);
// End:: Importing Plugins

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "817cc0240adce0b30b2b",
  cluster: "eu",
  forceTLS: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  authEndpoint: "https://backend.Telawaty.com/broadcasting/auth", // Update with the correct auth endpoint
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "Telawaty_admin_dashboard_user_token"
      )}`, // Use getItem() to retrieve the value
    },
  },
});

// casl vue permissions

import ability from "./plugins/ability";
import { abilitiesPlugin } from "@casl/vue";
Vue.use(abilitiesPlugin, ability);

// casl vue permissions

// Start:: Set App Lang  & Theme
store.dispatch("AppLangModule/handelAppDefaultLanguage");
store.dispatch("AppThemeModule/handelAppDefaultTheme");
// End:: Set App Lang  & Theme

Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
