import AuthenticationMutations from "./mutations.js";
import AuthenticationActions from "./actions.js";
import AuthenticationGetters from "./getters.js";

export default {
  namespaced: true,

  state: {
    // START:: AUTHENTICATED USER DATA
    userId: localStorage.getItem("Telawaty_admin_dashboard_user_id"),
    userToken: localStorage.getItem("Telawaty_admin_dashboard_user_token"),
    userType: localStorage.getItem("Telawaty_admin_dashboard_user_type"),
    userName: localStorage.getItem("Telawaty_admin_dashboard_userName"),
    email: localStorage.getItem("Telawaty_admin_dashboard_email"),
    userAvatar: localStorage.getItem("Telawaty_admin_dashboard_user_avatar"),
    ability: localStorage.getItem("Telawaty_admin_dashboard_user_ability"),
    // END:: AUTHENTICATED USER DATA
  },

  mutations: AuthenticationMutations,
  actions: AuthenticationActions,
  getters: AuthenticationGetters,
};
