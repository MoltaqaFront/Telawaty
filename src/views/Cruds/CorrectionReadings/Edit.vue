<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_content") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-select-input col="6" v-if="all_surahsData" :optionsList="all_surahsData"
            :placeholder="$t('PLACEHOLDERS.surah_name')" v-model.trim="data.select_surahs"
            @input="getVerseNumbers, words = [], data.verse_number = null" />

          <base-select-input col="6" v-if="all_surahsData && data.select_surahs" :label="'aya_no'"
            :optionsList="data.verseNumbers" :placeholder="$t('PLACEHOLDERS.verse_number')"
            v-model.trim="data.verse_number" @input="getWords, words = []" />

          <div v-if="all_surahsData && data.select_surahs && data.verseNumbers && data.verse_number">

            <!-- <div class="btn_wrapper d-flex justify-content-center">
              <button type="button" @click="addWord">{{ $t('PLACEHOLDERS.add_word') }}</button>
            </div> -->

            <div v-for="(word, wordIndex) in words" :key="wordIndex">
              <div class="row align-items-center">

                <div class="btn_wrapper d-flex justify-content-center">
                  <button type="button" @click="addWord(wordIndex)">{{ $t('PLACEHOLDERS.add_word') }}</button>
                </div>

                <!-- @input="getLetters(wordIndex)" -->
                <base-select-input class="col-lg-4 col-12" :optionsList="data.ayah_words"
                  :placeholder="$t('PLACEHOLDERS.word')" v-model.trim="words[wordIndex].word" />

                <div class="col-lg-4 col-12">
                  <div class="upload_file position-relative">
                    <label :for="'fileInput_' + wordIndex">{{ $t('PLACEHOLDERS.file') }}</label>
                    <input type="file" :id="'fileInput_' + wordIndex" @change="onVoiceFileChange(wordIndex)" />
                    <span v-if="word.voice">
                      <a :href="word.voice" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-file"></i>
                      </a>
                      <button class="clear" @click="removeVoice(wordIndex)">&#10006;</button>
                    </span>
                  </div>
                </div>

                <base-select-input class="col-lg-4 col-12" :optionsList="coloring"
                  :placeholder="$t('PLACEHOLDERS.coloring')" v-model.trim="word.word_color" />

              </div>

              <div v-for="(letter, letterIndex) in word.letters_array" :key="letterIndex">
                <div class="row">
                  <!-- Letter ID: -->
                  <!-- {{ letter.letters }} -->
                  <base-select-input class="col-lg-6 col-12" :optionsList="letter.letters"
                    :placeholder="$t('PLACEHOLDERS.character')" v-model.trim="letter.letter_id" />
                  <!-- Letter Color: -->
                  <base-select-input class="col-lg-6 col-12" :optionsList="coloring"
                    :placeholder="$t('PLACEHOLDERS.coloring')" v-model.trim="letter.letter_color" />

                  <div class="delete d-flex justify-content-center">
                    <button type="button" @click="removeLetter(wordIndex, letterIndex)">{{
                      $t('PLACEHOLDERS.delete_letter') }}</button>
                  </div>
                </div>
              </div>

              <div class="btn_wrapper d-flex justify-content-start">
                <button type="button" @click="addLetter(wordIndex)">{{
                  $t('PLACEHOLDERS.add_letter') }}</button>
              </div>

              <div class="delete  d-flex justify-content-end">
                <button type="button" @click="removeWord(wordIndex)">{{
                  $t('PLACEHOLDERS.delete_word') }}</button>
              </div>
            </div>
          </div>

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
        all_surahsData: [],
        select_surahs: null,
        verseNumbers: [],
        verse_number: null,
        ayah_words: [],
        letters: [],
        word: null,
        name: null,
        active: null
      },

      words: [
        {
          word: '',
          voice: '',
          word_color: '',
          letters_array: [
            {
              letter_id: '',
              letter_color: ''
            }
          ]
        }
      ]
      // End:: Data Collection To Send
    };
  },

  computed: {

    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      all_surahsData: "ApiGetsModule/all_surahsData",
    }),

    coloring() {
      return [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.red_color'),
          value: 'red'
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.green_color'),
          value: 'green'
        }
      ]
    },

  },

  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      getSurahs: "ApiGetsModule/getSurahs",
    }),
    // End:: Vuex Actions

    addWord(wordIndex) {
      // Check if the last added word is empty
      // const lastWord = this.words[this.words.length - 1];

      // if (lastWord && (lastWord.word_id == '')) {
      //   // If the last added word is empty, don't add a new one
      //   this.$message.error(this.$t("VALIDATION.fill_last_word"));
      //   return;
      // }

      // Extract all word IDs from the existing words
      const existingWordIds = this.words.map(word => word.word.id);

      // Remove the selected word from the optionsList
      this.data.ayah_words = this.data.ayah_words.filter(word => !existingWordIds.includes(word.id));

      this.words.push({
        word_id: ``,
        voice: '',
        word_color: '',
        letters_array: []
      });
    },

    removeWord(index) {
      this.words.splice(index, 1);
    },

    async addLetter(wordIndex) {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `words-ayats/${this.data.select_surahs.id}/${this.data.verse_number?.id ? this.data.verse_number?.id : this.data.verse_number?.aya_no}/${this.words[wordIndex].word.id}`,
        });

        // Get the selected letter IDs for the current word
        const selectedLetterIds = this.words[wordIndex].letters_array.map(letter => letter.letter_id.id);

        // Filter out the new letters that have not been selected before
        const newLetters = res.data.filter(letter => !selectedLetterIds.includes(letter.id));

        // Add the new letters to the letters_array
        this.words[wordIndex].letters_array.push({
          letters: newLetters,
          letter_id: '', // Assuming you set the letter_id elsewhere
          letter_color: '' // Assuming you set the letter_color elsewhere
        });
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    removeLetter(wordIndex, letterIndex) {
      this.words[wordIndex].letters_array.splice(letterIndex, 1);
    },

    onVoiceFileChange(wordIndex) {
      const file = event.target.files[0];
      this.words[wordIndex].voice = file;
    },

    removeVoice(wordIndex) {
      this.words[wordIndex].voice = null;

      // Clear the file input value
      const fileInput = document.getElementById(`fileInput_${wordIndex}`);
      if (fileInput) {
        fileInput.value = '';
      }
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
      // Append Uploaded File
      REQUEST_DATA.append("surah_id", this.data.select_surahs?.id);
      REQUEST_DATA.append("aya_id", this.data.verse_number?.id ? this.data.verse_number?.id : this.data.verse_number?.aya_no);

      let letterIndex = 0; // Track overall letter index

      this.words.forEach((word, wordIndex) => {
        // start:: word data
        if (this.words[wordIndex].word.id !== null) {
          REQUEST_DATA.append(`words[${wordIndex}][id]`, this.words[wordIndex].word.id);
        }
        if (word.voice) {
          REQUEST_DATA.append(`words[${wordIndex}][voice]`, word.voice);
        }
        if (word.word_color?.value) {
          REQUEST_DATA.append(`words[${wordIndex}][color]`, word.word_color.value);
        }
        // end:: word data

        // start:: letter data
        if (word.letters_array) {
          word.letters_array.forEach((letter, letterIndexWithinWord) => {
            REQUEST_DATA.append(`letters[${letterIndex}][word_id]`, this.words[wordIndex].word.id);
            REQUEST_DATA.append(`letters[${letterIndex}][letter_id]`, +letter.letter_id?.id);
            if (letter.letter_color?.value) {
              REQUEST_DATA.append(`letters[${letterIndex}][color]`, letter.letter_color.value);
            }
            letterIndex++; // Increment overall letter index
          });
        }
        // end:: letter data
      });

      REQUEST_DATA.append("_method", "PUT");

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `correction-reading/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/correction-reading/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getVerseNumbers() {
      try {
        // this.data.verseNumbers = [];
        // this.data.verse_number = null;
        let res = await this.$axios({
          method: "GET",
          url: `words-ayats/${this.data.select_surahs.id}`,
        });
        this.data.verseNumbers = res.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getWords() {

      try {
        let res = await this.$axios({
          method: "GET",
          url: `words-ayats/${this.data.select_surahs.id}/${this.data.verse_number.id}`,
        });
        this.data.ayah_words = res.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },


    // start show data
    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `correction-reading/${this.$route.params.id}`,
        });
        this.data.select_surahs = { id: res.data.data.CorrectionReading.surah_id, name: res.data.data.CorrectionReading.surah };
        this.data.verse_number = { id: res.data.data.CorrectionReading.aya_id, aya_no: res.data.data.CorrectionReading.aya_id };

        // Transform the API response
        const transformedData = res.data.data.CorrectionReading.words.map(word => ({
          ...word,

          word_color: word.word_color ? {
            id: 0,
            name: this.$t(`PLACEHOLDERS.${word.word_color}_color`),
            value: word.word_color
          } : null,

          letters_array: word.letters.map(letter => ({
            ...letter,
            letter_color: letter.color ? {
              id: 0,
              name: this.$t(`PLACEHOLDERS.${letter.color}_color`),
              value: letter.color
            } : null
          }))
        }));

        // Set the transformed data

        this.words = transformedData;
        console.log(transformedData)
        // Set the transformed data

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data

  },

  async created() {
    this.getSurahs();
    await this.dataToEdit();
    await this.getVerseNumbers();
    await this.getWords();

  },
};
</script>


<style lang="scss" scoped>
.delete {
  button {
    min-width: 200px;
    height: 48px;
    color: #FFF;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a85353;
  }
}

.upload_file {

  .book_content {
    max-width: 50px;
  }

  .book {
    font-size: 40px;
  }

  .clear {
    position: absolute;
    bottom: -2px;
    left: 0;
    background: #a85353;
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

  i {
    font-size: 25px;
    margin-top: 10px;
  }
}

.file_wrapper {
  margin-top: 30px;

  .name_book {
    font-weight: 600;
  }
}
</style>