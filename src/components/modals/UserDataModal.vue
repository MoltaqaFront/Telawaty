<template>
  <transition name="fadeInUp">
    <v-dialog width="fit-content" max-width="700" elevation="0" v-model="modalIsOpen" @click:outside="toggleModal">
      <div class="user_profile_modal">
        <v-card class="d-flex justify-center" color="transparent" elevation="0">
          <h4 class="modal_title"> {{ $t("TITLES.editProfile") }} </h4>

          <form @submit.prevent="validateFormInputs">
            <div class="row">
              <!-- Start:: Image Upload Input -->
              <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
                :placeholder="$t('PLACEHOLDERS.personalImage')" @selectImage="selectImage" required />
              <!-- End:: Image Upload Input -->

              <!-- Start:: Name Input -->
              <base-input type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
              <!-- End:: Name Input -->

              <!-- Start:: Email Input -->
              <base-input type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" required />
              <!-- End:: Email Input -->

              <!-- Start:: Status Input -->
              <base-select-input  :optionsList="AllIso" :placeholder="$t('PLACEHOLDERS.country_code')"
                v-model="data.iso" />
              <!-- End:: Status Input -->

              <!-- Start:: tel Input -->
              <base-input type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" required />
              <!-- End:: tel Input -->

              <!-- Start:: Activate Edit Password Switch Input -->
              <div class="input_wrapper switch_wrapper my-5">
                <v-switch color="green" :label="$t('PLACEHOLDERS.editPassword')" v-model="data.enableEditPassword"
                  hide-details></v-switch>
              </div>
              <!-- End:: Activate Edit Password Switch Input -->

              <Transition name="fadeInUp" mode="out-in">
                <div class="col-12" v-if="data.enableEditPassword">
                  <div class="row">
                    <!-- Start:: Password Input -->
                    <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')"
                      v-model.trim="data.password" required />
                    <!-- End:: Password Input -->

                    <!-- Start:: Confirm Password Input -->
                    <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
                      v-model.trim="data.passwordConfirmation" required />
                    <!-- End:: Confirm Password Input -->
                  </div>
                </div>
              </Transition>

              <!-- Start:: Submit Button Wrapper -->
              <div class="btn_wrapper d-flex justify-content-center gap-2">
                <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')"
                  :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />

                <base-button class="mt-2" type="button" styleType="cancel_btn" :btnText="$t('BUTTONS.cancel')"
                  @fireClick="toggleModal" />
              </div>
              <!-- End:: Submit Button Wrapper -->
            </div>
          </form>
        </v-card>
      </div>
    </v-dialog>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "UserDataModal",

  emits: ["toggleModal"],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        name: null,
        email: null,
        phone: null,
        iso: null,
        enableEditPassword: false,
        password: null,
        passwordConfirmation: null,
      },

       AllIso: []
      // End:: Data Collection To Send
    };
  },

  watch: {
    modalIsOpen(newVal) {
      if (newVal) {
        this.getDataToEdit();
      }
    }
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      authenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    })
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal');
    },
    // End:: Control Modal Apperance

    // Start:: Vuex Actions
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),
    // End:: Vuex Actions

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `auth/profile`,
        });
        // console.log( "DATA TO EDIT =>", res.data.data.region );

        // Start:: Set Data
        this.data.image.path = res.data.data.user.image;
        this.data.name = res.data.data.user.name;
        this.data.email = res.data.data.user.email;
        this.data.iso = { id: res.data.data.user.code, name: res.data.data.user.code };;
        this.data.phone = res.data.data.user.mobile;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // if (!this.data.image.path) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.image"));
      //   return;
      // } else 

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = emailRegex.test(this.data.email);

      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } if (!this.isValidEmail) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email_domain"));
        return;
      }
      // else if (this.data.email.indexOf('@') === -1) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.missingAtSymbol"));
      //   return;
      // }
      else if (this.data.enableEditPassword) {
        if (!this.data.password) {
          this.isWaitingRequest = false;
          this.$message.error(this.$t("VALIDATION.password"));
          return;
        } else if (this.data.password.length < 6) {
          this.isWaitingRequest = false;
          this.$message.error(this.$t("VALIDATION.passwordLength"));
          return;
        } else if (!this.data.passwordConfirmation) {
          this.isWaitingRequest = false;
          this.$message.error(this.$t("VALIDATION.password"));
          return;
        } else if (this.data.passwordConfirmation.length < 6) {
          this.isWaitingRequest = false;
          this.$message.error(this.$t("VALIDATION.passwordLength"));
          return;
        } else if (
          this.data.password !=
          this.data.passwordConfirmation
        ) {
          this.isWaitingRequest = false;
          this.$message.error(this.$t("VALIDATION.notEqualPasswords"));
          return;
        } else {
          this.submitForm();
        }
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.image.file) {
        REQUEST_DATA.append("avatar", this.data.image.file);
      }
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("mobile", this.data.phone);
      REQUEST_DATA.append("code", this.data.iso?.id);
      REQUEST_DATA.append("email", this.data.email);
      if (this.data.enableEditPassword) {
        REQUEST_DATA.append("password", this.data.password);
        REQUEST_DATA.append("password_confirmation", this.data.passwordConfirmation);
      }
      // REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        let res = await this.$axios({
          method: "POST",
          url: `auth/save-profile`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.setAuthenticatedUserData({
          name: res.data.data.user.name,
        });
        this.toggleModal();
        this.$router.push({ path: '/home' });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

     async getIso() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `countries`,
        });
        this.AllIso = res.data.data.map(item => ({ "id": item.dialling_code, "name": `${item.name} ${item.dialling_code}` }));
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },
   created() {
    this.getIso();
    // End:: Fire Methods
  },
};
</script>


<style lang="scss">
.user_profile_modal {
  padding-block: 15px;

  .modal_title {
    margin-bottom: 20px;
    text-align: center;
    color: var(--main_theme_clr);
  }
}
</style>