<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_attachments") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-select-input col="12" v-if="all_surahsData" :optionsList="all_surahsData"
            :placeholder="$t('PLACEHOLDERS.surah_name')" v-model.trim="data.select_surahs" disabled />

          <!-- Start:: language_profile_arabic Input -->
          <base-image-upload-input col="4" identifier="language_profile_arabic"
            :preSelectedImage="data.language_profile_arabic.path"
            :placeholder="$t('PLACEHOLDERS.language_profile_arabic')" @selectImage="selectImage" disabled />
          <!-- End:: language_profile_arabic Input -->

          <!-- Start:: language_profile_english Input -->
          <base-image-upload-input col="4" identifier="language_profile_english"
            :placeholder="$t('PLACEHOLDERS.language_profile_english')" @selectImage="selectImage"
            :preSelectedImage="data.language_profile_english.path" disabled />
          <!-- End:: language_profile_english Input -->

          <!-- Start:: language_profile_urdu Profile Image Input -->
          <base-image-upload-input col="4" identifier="language_profile_urdu"
            :placeholder="$t('PLACEHOLDERS.language_profile_urdu')" @selectImage="selectImage"
            :preSelectedImage="data.language_profile_urdu.path" disabled />
          <!-- End:: language_profile_urdu Profile Image Input -->

          <!-- Start:: mind_map_arabic Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_arabic" :placeholder="$t('PLACEHOLDERS.mind_map_arabic')"
            @selectImage="selectImage" :preSelectedImage="data.mind_map_arabic.path" disabled />
          <!-- End:: mind_map_arabic Image Input -->

          <!-- Start:: mind_map_english Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_english"
            :placeholder="$t('PLACEHOLDERS.mind_map_english')" @selectImage="selectImage"
            :preSelectedImage="data.mind_map_english.path" disabled />
          <!-- End:: mind_map_english Image Input -->

          <!-- Start:: mind_map_urdu Image Input -->
          <base-image-upload-input col="4" identifier="mind_map_urdu" :placeholder="$t('PLACEHOLDERS.mind_map_urdu')"
            @selectImage="selectImage" :preSelectedImage="data.mind_map_urdu.path" disabled />
          <!-- End:: mind_map_urdu Image Input -->


          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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

    // start show data
    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `addition_surahs/${this.$route.params.id}`,
        });
        this.data.select_surahs = { id: res.data.data.id, name: res.data.data.name };

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