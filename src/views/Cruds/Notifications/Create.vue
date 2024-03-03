<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.add_notification") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-center">

          <!-- Start:: Receiver Type Input -->
          <base-select-input col="6" :optionsList="receiverTypes" :placeholder="$t('TABLES.Notifications.receiverType')"
            v-model="data.receiverType" required @input="getMethods" />
          <!-- End:: Receiver Type Input -->

          <div class="col-6">

            <div class="row">
              <base-select-input v-if="(data.receiverType && data.receiverType.value === 'clients' && clients.length)"
                class="col-12" :optionsList="clients" :placeholder="$t('PLACEHOLDERS.users_management')"
                v-model="data.clients" required multiple :focus="false" />

            </div>

          </div>

          <div class="col-12">
            <div class="row">
              <!-- Start:: Title Ar Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.titleAr"
                required />
              <!-- End:: Title Ar Input -->

              <!-- Start:: Title En Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.titleEn"
                required />
              <!-- End:: Title En Input -->

              <!-- Start:: Title En Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.address_in_urdu')"
                v-model.trim="data.titleAd" required />
              <!-- End:: Title En Input -->

              <div class="row">
                <!-- Start:: Content Ar Input -->
                <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentAr')"
                  v-model.trim="data.contentAr" required />
                <!-- End:: Content Ar Input -->

                <!-- Start:: Content En Input -->
                <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentEn')"
                  v-model.trim="data.contentEn" required />
                <!-- End:: Content En Input -->

                <!-- Start:: Content En Input -->
                <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.content_in_urdu')"
                  v-model.trim="data.contentAd" required />
                <!-- End:: Content En Input -->
              </div>


            </div>
          </div>

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateNotification",

  computed: {

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.users_management"),
          value: "clients",
        },
        {
          id: 5,
          name: this.$t("STATUS.all"),
          value: "all",
        },
      ];
    },
  },

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        receiverType: null,
        clients: null,
        providers: null,
        titleAr: null,
        titleEn: null,
        titleAd: null,
        contentAd: null,
        contentAr: null,
        contentEn: null,
      },
      clients: [],
      providers: [],
      stores: [],
      // End:: Data Collection To Send

    };
  },

  methods: {

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      const arabicRegex = /^[\u0600-\u06FF\s]+$/;
      const englishRegex = /^[a-zA-Z\s]+$/;
      if (!this.data.titleAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.titleEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.contentAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      } else if (!this.data.contentEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      } else if (!arabicRegex.test(this.data.titleAr)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.arabic_words_required"));
        return;
      } else if (!englishRegex.test(this.data.titleEn)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.english_words_required"));
        return;
      }
      else if (!arabicRegex.test(this.data.contentAr)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.arabic_content_required"));
        return;
      } else if (!englishRegex.test(this.data.contentEn)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.english_content_required"));
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

      if (this.data.receiverType.value == "all") {
        REQUEST_DATA.append(`to_all`, "1");
        // REQUEST_DATA.append(`receiver_type`, "client");
      }
      else if (this.data.receiverType.value == "clients") {
        this.data.clients.forEach((element, index) => {
          // REQUEST_DATA.append(`receiver_type`, "client");
          REQUEST_DATA.append(`ids[${index}]`, element.id);
        });
      }
      REQUEST_DATA.append("title_ar", this.data.titleAr);
      REQUEST_DATA.append("title_en", this.data.titleEn);
      REQUEST_DATA.append("title_ad", this.data.titleAd);
      REQUEST_DATA.append("body_ad", this.data.contentAd);
      REQUEST_DATA.append("body_ar", this.data.contentAr);
      REQUEST_DATA.append("body_en", this.data.contentEn);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `notifications/store`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        this.$router.push({ path: "/all-notifications/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getClients() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "clients"
        });
        this.loading = false;
        this.clients = res.data.data;
        console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    getMethods() {

      this.data.clients = null;

      if (this.data.receiverType.value === "clients") {
        // this.data.users = [];
        this.getClients();
      }

    },

    // End:: Set Table Rows
  },

  created() {
    this.getClients();
  },
};
</script>
