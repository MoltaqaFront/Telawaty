import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA",
    libraries: "places",
  },
});
