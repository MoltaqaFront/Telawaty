<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.questions.edit") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('SIDENAV.questions.bodyAr')" v-model.trim="data.nameAr"
            @input="validateInput" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('SIDENAV.questions.bodyEn')" v-model.trim="data.nameEn"
            @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />

          <base-input col="4" type="text" :placeholder="$t('SIDENAV.questions.bodyEd')" v-model.trim="data.nameEd"
            @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />

          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('SIDENAV.questions.answerAr')" v-model.trim="data.answerAr"
            required />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('SIDENAV.questions.answerEn')" v-model.trim="data.answerEn"
            required />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('SIDENAV.questions.answerEd')" v-model.trim="data.answerEd"
            required />
          <!-- End:: Ar Content Text Editor -->

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
  name: "CreateAdditionalFields",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {

        nameAr: null,
        nameEn: null,
        nameEd: null,
        answerEn: null,
        answerEd: null,
        answerAr: null,
        is_active: null
      },
      // End:: Data Collection To Send

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },
    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
      this.data.answerAr = this.data.answerAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
      this.data.answerEn = this.data.answerEn.replace(this.EnRegex, "");

    },

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `questions/${this.$route.params.id}`,
        });
        // Start:: Set Data
        this.data.answerAr = res.data.data.Question.answer_ar;
        this.data.answerEn = res.data.data.Question.answer_en;
        this.data.answerEd = res.data.data.Question.answer_ad;
        this.data.nameAr = res.data.data.Question.question_ar;
        this.data.nameEn = res.data.data.Question.question_en;
        this.data.nameEd = res.data.data.Question.question_ad;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.question_required_arabic"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.question_required_english"));
        return;
      } else if (!this.data.nameEd) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.question_required_urdu"));
        return;
      } else if (!this.data.answerAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.answer_required_arabic"));
        return;
      } else if (!this.data.answerEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.answer_required_english"));
        return;
      } else if (!this.data.answerEd) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("PLACEHOLDERS.answer_required_urdu"));
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
      REQUEST_DATA.append("question[ar]", this.data.nameAr);
      REQUEST_DATA.append("question[en]", this.data.nameEn);
      REQUEST_DATA.append("question[ad]", this.data.nameEd);
      REQUEST_DATA.append("answer[ar]", this.data.answerAr);
      REQUEST_DATA.append("answer[en]", this.data.answerEn);
      REQUEST_DATA.append("answer[ad]", this.data.answerEd);
      REQUEST_DATA.append("_method", "PUT");

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `questions/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/questions/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit()
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

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}
</style>