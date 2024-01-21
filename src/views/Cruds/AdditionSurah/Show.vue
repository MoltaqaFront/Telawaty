<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.book_display_screen") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-baseline">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name"
            @input="validateInput" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Upload File Input -->
          <div class="col-lg-6 upload_file">
            <label for="fileInput">{{ $t('PLACEHOLDERS.file') }}</label>
            <input ref="input_file" id="fileInput" type="file" accept=".pdf" disabled />

            <div v-if="uploadedFile" class="file_wrapper">
              <!-- <pdf :src="pdfUrl" :page="1" :rotation="0" :scale="1.0"></pdf> -->
              <a :href="getFileUrl(uploadedFile)" target="_blank" rel="noopener noreferrer">
                <div class="book_content position-relative">
                  <i class="fas fa-book book"></i>
                </div>
                <span class="name_book">{{ uploadedFile.name }}</span>
              </a>
            </div>
          </div>
          <!-- End:: Upload File Input -->

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


  methods: {

    getFileUrl(file) {

      if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://'))) {
        // File is a URL (from API), use it directly
        return file;
      } else {
        return URL.createObjectURL(file);
      }

    },

    // start show data
    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `books/${this.$route.params.id}`,
        });
        this.uploadedFile = res.data.data.src;
        this.data.name = res.data.data.name;
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