<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <h3>{{ $t("PLACEHOLDERS.contact_admins") }}</h3>

          <div class="row justify-content-center">

            <div class="col-l2">
              <div class="add_another" @click="addRow()">
                <i class="fas fa-plus"></i>
              </div>
            </div>

            <div class="col-lg-6 col-12" v-for="(item, index) in phones" :key="'l' + index">

              <div class="item d-flex align-items-center">
                <base-input class="w-100" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="item.phone" />

                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.WhatsApp_contact')"
            v-model.trim="data.WhatsApp_contact" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.facebook_link')"
            v-model.trim="data.facebook_link" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.insta_link')" v-model.trim="data.insta_link" />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: snap_link Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.snap_link')" v-model.trim="data.snap_link" />
          <!-- End:: snap_link Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.x_link')" v-model.trim="data.twitter_link" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.tiktok_link')" v-model.trim="data.tiktok_link" />
          <!-- End:: Driver's Daily Orders Amount Input -->

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
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        WhatsApp_contact: null,
        facebook_link: null,
        snap_link: null,
        insta_link: null,
        twitter_link: null,
        tiktok_link: null,

      },
      // End:: Data Collection To Send

      phones: [
        {
          phone: ''
        }
      ]
    };
  },

  methods: {

    addRow() {
      this.phones.push({ phone: "" })
    },

    removeRow(index) {
      this.phones.splice(index, 1)
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=dashboard-contact-with-management`,
        });
        // Start:: Set Data

        // Transform the API response

        this.phones = res.data.data[0].value_pure.phones.map(phone => ({ phone: phone }));

        this.data.WhatsApp_contact = res.data.data[0].value_pure.whatsup[0];
        this.data.facebook_link = res.data.data[0].value_pure.face_book;
        this.data.snap_link = res.data.data[0].value_pure.snapchat;
        this.data.insta_link = res.data.data[0].value_pure.instagram;
        this.data.twitter_link = res.data.data[0].value_pure.twitter;
        this.data.tiktok_link = res.data.data[0].value_pure.tiktok;

        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "dashboard-contact-with-management");

      this.phones.forEach((element, index) => {
        REQUEST_DATA.append(`value[phones][${index}]`, element.phone);
      });
      if (this.data.WhatsApp_contact) {
        REQUEST_DATA.append("value[whatsup][0]", this.data.WhatsApp_contact);
      }
      if (this.data.facebook_link) {
        REQUEST_DATA.append("value[face_book]", this.data.facebook_link);
      }
      if (this.data.snap_link) {
        REQUEST_DATA.append("value[snapchat]", this.data.snap_link);
      }
      if (this.data.insta_link) {
        REQUEST_DATA.append("value[instagram]", this.data.insta_link);
      }
      if (this.data.twitter_link) {
        REQUEST_DATA.append("value[twitter]", this.data.twitter_link);
      }
      if (this.data.tiktok_link) {
        REQUEST_DATA.append("value[tiktok]", this.data.tiktok_link);
      }

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
      if (!this.phones.every(item => /^05\d{8}$/.test(item.phone))) {  // Phone number validation
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phone_num"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>


<style lang="scss" scoped>
.item {
  gap: 10px
}

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


value:{
  phones:[
    "0567837943",
    "0567837943",
    "0567837943",
  ]
}