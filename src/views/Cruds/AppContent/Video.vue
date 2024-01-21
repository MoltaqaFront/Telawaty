<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.introductory_video") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <UploadVideo :videoUrl="data.videoUrl" @file-selected="onFileSelected" />

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
import UploadVideo from '../../../components/formInputs/UploadVideo.vue';


export default {
  name: "TermsAndConditions",
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data
      // Start:: Data Collection To Send
      data: {
        videoUrl: null,
      },
      // End:: Data Collection To Send
    };
  },
  methods: {

    onFileSelected(videoUrl) {
      this.data.videoUrl = videoUrl;
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `getVideo`,
        });
        // Start:: Set Data
        this.data.videoUrl = res.data.data.video;
        // End:: Set Data
      }
      catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit
    // Start:: validate Form Inputs
    validateFormInputs() {
      // this.submitForm();
      this.isWaitingRequest = true;
      if (!this.data.videoUrl) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.upload_introductory_video"));
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
      REQUEST_DATA.append("key", "video");

      // Check if a new video file is selected
      if (this.data.videoUrl instanceof File) {
        REQUEST_DATA.append("video", this.data.videoUrl);
      }
      // REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `settings-file`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      }
      catch (error) {
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
  components: { UploadVideo }
};
</script>
