<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_new_book") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Upload File Input -->
          <div class="col-12 upload_file">
            <label for="fileInput">{{ $t('PLACEHOLDERS.file') }}</label>
            <input ref="input_file" id="fileInput" type="file" @change="handleFileInputChange" accept=".pdf" />

            <div v-if="uploadedFile" class="file_wrapper">
              <!-- <pdf :src="pdfUrl" :page="1" :rotation="0" :scale="1.0"></pdf> -->
              <div class="book_content position-relative">
                <i class="fas fa-book book"></i>
                <i class="fas fa-times clear" @click="deleteUploadedFile"></i>
              </div>
              <span class="name_book">{{ uploadedFile.name }}</span>
            </div>
          </div>
          <!-- End:: Upload File Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name"
            @input="validateInput" required />
          <!-- End:: Name Input -->

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
import pdf from 'vue-pdf'
export default {
  name: "CreateState",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        active: null
      },
      uploadedFile: null,
      // End:: Data Collection To Send
    };
  },

  components: {
    pdf,
  },

  computed: {
    pdfUrl() {
      return URL.createObjectURL(this.uploadedFile);
    },
  },

  methods: {

    handleFileInputChange(event) {
      const file = event.target.files[0];
      this.uploadedFile = file;
    },
    deleteUploadedFile() {
      this.uploadedFile = null;
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.name = this.data.name.replace(/[^\u0600-\u06FF\s]/g, "");
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
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
      // Append Uploaded File
      if (this.uploadedFile) {
        REQUEST_DATA.append("src", this.uploadedFile);
      }
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("is_active", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `books`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/books/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form


  },

  created() {
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