import AppLangMutations from "./mutations";
import AppLangActions from "./actions.js";
import AppLangGetters from "./getters.js";

export default {
  namespaced: true,
  state: {
    // START:: LANGUAGE DATA
    Telawaty_admin_dashboard_language: localStorage.getItem(
      "Telawaty_admin_dashboard_language"
    ),
    // END:: LANGUAGE DATA
  },
  mutations: AppLangMutations,
  actions: AppLangActions,
  getters: AppLangGetters,
};
