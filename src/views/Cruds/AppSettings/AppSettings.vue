<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.trial_version_duration_days')"
            v-model.trim="data.duration" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <!-- <base-select-input col="6" v-if="all_surahsData" :optionsList="all_surahsData"
            :placeholder="$t('PLACEHOLDERS.available_chapters_for_trial_users')" multiple
            v-model.trim="data.select_surahs" /> -->
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.trial_version_repetition_count')"
            v-model.trim="data.repeat_app" />
          <!-- End:: Name Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->

        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data
      data: {
        duration: null,
        select_surahs: null,
        repeat_app: null
      },

      all_surahs: []
      // End:: Data

    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
      all_surahsData: "ApiGetsModule/all_surahsData",
    }),
    // End:: Vuex Getters
  },


  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      getSurahs: "ApiGetsModule/getSurahs",
    }),
    // End:: Vuex Actions

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings/get-surahs`,
        });
        // console.log("DATA =>", res.data.data);
        // this.data.select_surahs = res.data.data.select_surahs;
        this.data.duration = res.data.data.duration;
        this.data.repeat_app = res.data.data.repeat_app;

      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      // this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      REQUEST_DATA.append("key", "dashboard-admin-setting");

      if (this.data.duration) {
        REQUEST_DATA.append("value[duration]", this.data.duration);
      }

      if (this.data.repeat_app) {
        REQUEST_DATA.append("value[repeat_app]", this.data.repeat_app);
      }

      // if (this.data.select_surahs) {
      //   this.data.select_surahs.forEach((element, index) => {
      //     REQUEST_DATA.append(`value[surah_ids][${index}]`, element.id);
      //   });
      // }

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.duration) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.trial_duration_not_empty"));
        return;
      }
      else if (!this.data.repeat_app) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.trial_repetition_not_empty"));
        return;
      }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.getSurahs()
    // End:: Fire Methods
  },
};
</script>


<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}
</style>