<template>
  <v-app>
    <transition name="fadeInUp" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {

  name: "App",
  data() {
    return {
      logoutTimer: null
    };
  },
  mounted() {
    this.startLogoutTimer();

    window.addEventListener("mousemove", this.resetLogoutTimer);
    window.addEventListener("keydown", this.resetLogoutTimer);
    window.addEventListener("click", this.resetLogoutTimer);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.resetLogoutTimer);
    window.removeEventListener("keydown", this.resetLogoutTimer);
    window.removeEventListener("click", this.resetLogoutTimer);
  },
  methods: {

    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout"
    }),
    // End:: Vuex Auth Actions

    startLogoutTimer() {
      this.logoutTimer = setTimeout(() => {
        this.logout();
      }, 3 * 60 * 60 * 1000);
    },
    resetLogoutTimer() {
      clearTimeout(this.logoutTimer);
      this.startLogoutTimer();
    },
  }
};
</script>
