<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_book") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-baseline">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.book_name')" v-model.trim="data.name"
            @input="validateInput" required />
          <!-- End:: Name Input -->

          <!-- Start:: Upload File Input -->
          <div class="col-lg-6 upload_file">
            <label for="fileInput">{{ $t('PLACEHOLDERS.file') }}</label>
            <input ref="input_file" id="fileInput" type="file" @change="handleFileInputChange" accept=".pdf" />

            <div v-if="uploadedFile" class="file_wrapper">
              <!-- <pdf :src="pdfUrl" :page="1" :rotation="0" :scale="1.0"></pdf> -->
              <a :href="getFileUrl(uploadedFile)" target="_blank" rel="noopener noreferrer">
                <div class="book_content position-relative">
                  <i class="fas fa-book book"></i>
                  <i class="fas fa-times clear" @click="deleteUploadedFile"></i>
                </div>
                <span class="name_book">{{ uploadedFile.name }}</span>
              </a>
            </div>
          </div>
          <!-- End:: Upload File Input -->

          <!-- Start:: author_name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.author_name')" v-model.trim="data.author_name"
            required />
          <!-- End:: Name Input -->

          <!-- Start:: release_date Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.release_date')"
            v-model.trim="data.release_date" required />
          <!-- End:: release_date Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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
        release_date: null,
        author_name: null,
        active: null
      },
      uploadedFile: null,
      // End:: Data Collection To Send
    };
  },


  methods: {

    getFileUrl(file) {

      if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://'))) {
        // File is a URL (from API), use it directly
        return file;
      } else {
        return URL.createObjectURL(file);
      }

    },

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
      }
      else if (!/^\d{4}$/.test(this.data.release_date)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.issue_date_format_error"));
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

      if (this.uploadedFile instanceof File) {
        REQUEST_DATA.append("src", this.uploadedFile);
      }

      if (this.data.name) {
        REQUEST_DATA.append("name", this.data.name);
      }
      if (this.data.author_name) {
        REQUEST_DATA.append("author_name", this.data.author_name);
      }
      if (this.data.release_date) {
        REQUEST_DATA.append("release_date", this.data.release_date);
      }

      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `books/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/books/all" });
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
          url: `books/${this.$route.params.id}`,
        });
        this.uploadedFile = res.data.data.src;
        this.data.name = res.data.data.name;
        this.data.release_date = res.data.data.release_date;
        this.data.author_name = res.data.data.author_name;
        this.data.active = res.data.data.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data


  },

  created() {
    this.dataToEdit()
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