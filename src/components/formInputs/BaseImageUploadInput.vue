<template>
  <div class="my-5" :class="col ? `col-lg-${col}` : ''">
    <div class="single_image_input_wrapper">
      <span class="input_placeholder" v-if="placeholder">
        {{ placeholder }}
        <span class="text-danger" v-if="required"> * </span>
      </span>
      <div class="wrapper position-relative">
        <label :for="identifier"></label>
        <img :class="(preSelectedImage || image.file) ? 'image_uploaded' : 'image_placeholder'"
          :src="preSelectedImage ? preSelectedImage : image.path" alt="Image To Upload" width="100" height="100" />
        <span class="delete_icon" v-if="showDeleteIcon" @click="deleteImage">x</span>
        <input ref="fileInput" type="file" accept="image/png, image/jpg, image/jpeg" class="form-control" :id="identifier"
          @change="selectImageToUpload" :disabled="disabled" />
      </div>
    </div>
  </div>
</template>

<script>
import predictFileType from "@/utils/predictFileType.js";

export default {
  name: "BaseImageUploadInput",

  emits: ["selectImage"],

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    identifier: {
      required: true,
      type: String,
    },
    preSelectedImage: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    // ====== End:: General Inputs Props ====== //
  },

  data() {
    return {
      image: {
        path: require("@/assets/media/images/upload_image.svg"),
        file: null,
      },
      showDeleteIcon: false,
    };
  },

  methods: {
    // Start:: Select Image
    selectImageToUpload(e) {
      if (predictFileType(e.target.files[0].name) !== "image_file") {
        this.$message.error(this.$t("VALIDATION.selectedFileMustBeImage"));
        this.resetInput();
        return;
      } else {
        this.image.path = URL.createObjectURL(e.target.files[0]);
        this.image.file = e.target.files[0];
        this.showDeleteIcon = true;
        this.$emit("selectImage", {
          identifier: this.identifier,
          ...this.image,
        });
        // console.log("SELECTED =>", this.image);
      }
    },
    // End:: Select Image
    deleteImage() {
      this.image.path = require("@/assets/media/images/upload_image.svg");
      this.image.file = null;
      this.showDeleteIcon = false;
      this.resetInput();
      this.$emit("selectImage", {
        identifier: this.identifier,
        ...this.image,
      });
    },
    resetInput() {
      this.$refs.fileInput.value = ""; // Clear the input value
    },
  },
};
</script>


<style lang="scss" scoped>
.delete_icon {
  position: absolute;
  z-index: 99;
  width: 30px;
  height: 30px;
  background: #d94949;
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
