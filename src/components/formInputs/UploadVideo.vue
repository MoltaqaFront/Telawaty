<template>
  <div class="upload_file">
    <label for="video_input">{{ $t('PLACEHOLDERS.file') }}</label>
    <input type="file" id="video_input" @change="handleFileUpload" accept="video/*">

    <div class="row justify-content-center">
      <div class="col-lg-7 col-12">
        <div v-if="localVideoUrl" class="file_wrapper">
          <div class="content position-relative">
            <video v-if="localVideoUrl" :src="localVideoUrl" controls></video>
            <i class="fas fa-times clear" v-if="localVideoUrl" @click="deleteVideo"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: [String, File],
      default: null,
    },
  },
  data() {
    return {
      localVideoUrl: null,
    };
  },
  watch: {
    videoUrl(newVal) {
      if (newVal instanceof File) {
        this.localVideoUrl = URL.createObjectURL(newVal);
      } else if (typeof newVal === 'string') {
        // Assuming newVal is a video URL string
        this.localVideoUrl = newVal;
      } else {
        // Handle other cases or leave localVideoUrl as null
        this.localVideoUrl = null;
      }
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.$emit('file-selected', file);
      this.localVideoUrl = URL.createObjectURL(file);
    },
    deleteVideo() {
      // Emit null to clear the data
      this.$emit('file-selected', null);
      this.localVideoUrl = null;
      const fileInput = document.getElementById("video_input");
      if (fileInput) {
        fileInput.value = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.upload_file {

  .content {
    max-width: 500px;

    video {
      width: 100%;
      margin-top: 30px;
    }
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
</style>