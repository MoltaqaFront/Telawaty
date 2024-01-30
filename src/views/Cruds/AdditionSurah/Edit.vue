<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_attachments") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-select-input col="12" v-if="all_surahsData" :optionsList="all_surahsData"
            :placeholder="$t('PLACEHOLDERS.surah_name')" v-model.trim="data.select_surahs" />

          <!-- Start:: language_profile_arabic Input -->
          <base-image-upload-input col="4" identifier="language_profile_arabic"
            :preSelectedImage="data.language_profile_arabic.path"
            :placeholder="$t('PLACEHOLDERS.language_profile_arabic')" @selectImage="selectImage" required />
          <!-- End:: language_profile_arabic Input -->

          <!-- Start:: language_profile_english Input -->
          <base-image-upload-input col="4" identifier="language_profile_english"
            :placeholder="$t('PLACEHOLDERS.language_profile_english')" @selectImage="selectImage"
            :preSelectedImage="data.language_profile_english.path" required />
          <!-- End:: language_profile_english Input -->

          <!-- Start:: language_profile_urdu Profile Image Input -->
          <base-image-upload-input col="4" identifier="language_profile_urdu"
            :placeholder="$t('PLACEHOLDERS.language_profile_urdu')" @selectImage="selectImage"
            :preSelectedImage="data.language_profile_urdu.path" required />
          <!-- End:: language_profile_urdu Profile Image Input -->

          <!-- Start:: mind_map_arabic Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_arabic" :placeholder="$t('PLACEHOLDERS.mind_map_arabic')"
            @selectImage="selectImage" :preSelectedImage="data.mind_map_arabic.path" required />
          <!-- End:: mind_map_arabic Image Input -->

          <!-- Start:: mind_map_english Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_english"
            :placeholder="$t('PLACEHOLDERS.mind_map_english')" @selectImage="selectImage"
            :preSelectedImage="data.mind_map_english.path" required />
          <!-- End:: mind_map_english Image Input -->

          <!-- Start:: mind_map_urdu Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_urdu" :placeholder="$t('PLACEHOLDERS.mind_map_urdu')"
            @selectImage="selectImage" :preSelectedImage="data.mind_map_urdu.path" required />
          <!-- End:: mind_map_urdu Image Input -->


          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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
  name: "CreateState",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        language_profile_arabic: {
          path: null,
          file: null,
        },
        language_profile_english: {
          path: null,
          file: null,
        },
        language_profile_urdu: {
          path: null,
          file: null,
        },
        mind_map_arabic: {
          path: null,
          file: null,
        },
        mind_map_english: {
          path: null,
          file: null,
        },
        mind_map_urdu: {
          path: null,
          file: null,
        },

        all_surahsData: [],
        select_surahs: null,
        select_surah_id: null,
        active: null
      },
      uploadedFile: null,
      // End:: Data Collection To Send
    };
  },

  computed: {

    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      all_surahsData: "ApiGetsModule/all_surahsData",
    }),
  },

  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      getSurahs: "ApiGetsModule/getSurahs",
    }),
    // End:: Vuex Actions

    selectImage(selectedImage) {
      if (selectedImage.identifier === "language_profile_arabic") {
        this.data.language_profile_arabic = selectedImage;
        console.log(this.data.language_profile_arabic)
      } else if (selectedImage.identifier === "language_profile_english") {
        this.data.language_profile_english = selectedImage;
      } else if (selectedImage.identifier === "language_profile_urdu") {
        this.data.language_profile_urdu = selectedImage;
      } else if (selectedImage.identifier === "mind_map_arabic") {
        this.data.mind_map_arabic = selectedImage;
      } else if (selectedImage.identifier === "mind_map_english") {
        this.data.mind_map_english = selectedImage;
      } else if (selectedImage.identifier === "mind_map_urdu") {
        this.data.mind_map_urdu = selectedImage;
      }
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.name = this.data.name.replace(/[^\u0600-\u06FF\s]/g, "");
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.select_surahs) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.select_surah_name"));
        return;
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

      if (this.data.language_profile_arabic.file) {
        REQUEST_DATA.append("card_id_image[ar]", this.data.language_profile_arabic.file);
      }
      if (this.data.language_profile_english.file) {
        REQUEST_DATA.append("card_id_image[en]", this.data.language_profile_english.file);
      }
      if (this.data.language_profile_urdu.file) {
        REQUEST_DATA.append("card_id_image[ad]", this.data.language_profile_urdu.file);
      }
      if (this.data.mind_map_arabic.file) {
        REQUEST_DATA.append("plane_image[ar]", this.data.mind_map_arabic.file);
      }
      if (this.data.mind_map_english.file) {
        REQUEST_DATA.append("plane_image[en]", this.data.mind_map_english.file);
      }
      if (this.data.mind_map_urdu.file) {
        REQUEST_DATA.append("plane_image[ad]", this.data.mind_map_urdu.file);
      }

      REQUEST_DATA.append("is_active", +this.data.active);

      REQUEST_DATA.append("_method", "PUT");

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `addition_surahs/${this.data.select_surah_id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/addition-surah/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // start show data
    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `addition_surahs/${this.$route.params.id}`,
        });
        this.data.select_surahs = { id: res.data.data.id, name: res.data.data.name };

        this.data.select_surah_id = res.data.data.id;
        this.data.language_profile_arabic.path = res.data.data.card_id_image_ar;
        this.data.language_profile_english.path = res.data.data.card_id_image_en;
        this.data.language_profile_urdu.path = res.data.data.card_id_image_ad;
        this.data.mind_map_arabic.path = res.data.data.plane_image_ar;
        this.data.mind_map_english.path = res.data.data.plane_image_en;
        this.data.mind_map_urdu.path = res.data.data.plane_image_ad;

        this.data.active = res.data.data.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
  },

  created() {
    this.dataToEdit();
    this.getSurahs();
  },

};
</script>


<style lang="scss" scoped>
.upload_file {

  .book_content {
    max-width: 50px;
  }

  .book {
    font-size: 40px;
  }

  .clear {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 15px;
    background: red;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    cursor: pointer;
  }

  input {
    display: none;
  }

  label {
    width: 100%;
    // height: 100%;
    padding: 20px;
    border: 1px solid #DDD;
    border-radius: 8px;
    cursor: pointer;
    background: #FFF;

  }
}

.file_wrapper {
  margin-top: 30px;

  .name_book {
    font-weight: 600;
  }
}
</style>