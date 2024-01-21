export default {
  // Start:: Roles Getter
  allRoles(state) {
    return state.roles;
  },
  // End:: Roles Getter

  // Start:: Stores Getter
  allStoresData(state) {
    return state.stores;
  },
  // End:: Stores Getter

  // Start:: Stores Categories Getter
  allStoreCategoriesData(state) {
    return state.storeCategories;
  },
  // End:: Stores Categories Getter

  // Start:: Order Types Getter
  allOrderTypesData(state) {
    return state.orderTypes;
  },
  // End:: Order Types Getter

  // Start:: Area Getter
  allAreasData(state) {
    return state.areas;
  },
  // End:: Area Getter

  // Start:: all_surahsData Getter
  all_surahsData(state) {
    return state.all_surahs;
  },
  // End:: all_surahsData Getter

  // Start:: Cities Getter
  allCitiesData(state) {
    return state.cities;
  },
  allCitiesByAreaIdData(state) {
    return state.citiesByAreaId;
  },
  // End:: Cities Getter

  // Start:: Services Types Getter
  allServicesTypesData(state) {
    return state.servicesTypes;
  },
  // End:: Services Types Getter
};
