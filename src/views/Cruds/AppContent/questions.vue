<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.terms") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.nameAr"
            required />

          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.nameEn"
            required />

          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.address_in_urdu')" v-model.trim="data.nameEd"
            required />

          <!-- Start:: Name Input -->
          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentAr')" v-model.trim="data.contentAr"
            required />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: En Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentEn')" v-model.trim="data.contentEn"
            required />

          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.content_in_urdu')" v-model.trim="data.contentEd"
            required />
          <!-- Start:: En Content Text Editor -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        contentAr: null,
        contentEn: null,
        contentEd: null,
        nameAr: null,
        nameEn: null,
        nameEd: null
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=terms_and_conditions`,
        });
        // Start:: Set Data
        this.data.contentAr = res.data.data[0].value_ar;
        this.data.contentEn = res.data.data[0].value_en;
        this.data.contentEd = res.data.data[0].value_ad;
        this.data.nameAr = res.data.data[0].title_ar;
        this.data.nameEn = res.data.data[0].title_en;
        this.data.nameEd = res.data.data[0].title_ad;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.contentAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.contentEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      }
      else if (!this.data.contentEd) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.content_in_urdu_required"));
        return;
      }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "terms_and_conditions");
      REQUEST_DATA.append("title[en]", this.data.nameEn);
      REQUEST_DATA.append("title[ar]", this.data.nameAr);
      REQUEST_DATA.append("title[ad]", this.data.nameEd);
      REQUEST_DATA.append("value[ar]", this.data.contentAr);
      REQUEST_DATA.append("value[en]", this.data.contentEn);
      REQUEST_DATA.append("value[ad]", this.data.contentEd);
      // REQUEST_DATA.append("_method", "PUT");

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
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
