<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_data") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-select-input col="6" v-if="all_surahsData" :optionsList="all_surahsData"
            :placeholder="$t('PLACEHOLDERS.surah_name')" v-model.trim="data.select_surahs"
            @input="getVerseNumbers, words = [], data.verse_number = null" disabled />

          <base-select-input col="6" v-if="all_surahsData && data.select_surahs" :optionsList="data.verseNumbers"
            :placeholder="$t('PLACEHOLDERS.verse_number')" v-model.trim="data.verse_number"
            @input="getWords, words = []" disabled />

          <div v-if="all_surahsData && data.select_surahs && data.verseNumbers && data.verse_number">

            <!-- <div class="btn_wrapper d-flex justify-content-center">
              <button type="button" @click="addWord">{{ $t('PLACEHOLDERS.add_word') }}</button>
            </div> -->

            <div v-for="(word, wordIndex) in words" :key="wordIndex">
              <div class="row align-items-center">

                <!-- @input="getLetters(wordIndex)" -->
                <base-select-input class="col-lg-4 col-12" :optionsList="data.ayah_words"
                  :placeholder="$t('PLACEHOLDERS.word')" v-model.trim="words[wordIndex].word"
                  @input="getLetters(wordIndex)" disabled />

                <div class="col-lg-4 col-12">
                  <div class="upload_file position-relative">
                    <label :for="'fileInput_' + wordIndex">{{ $t('PLACEHOLDERS.file') }}</label>
                    <input type="file" :id="'fileInput_' + wordIndex" @change="onVoiceFileChange(wordIndex)" disabled />
                    <span v-if="word.voice">
                      <a :href="word.voice" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-file"></i>
                      </a>

                    </span>
                  </div>
                </div>

                <base-select-input class="col-lg-4 col-12" :optionsList="coloring"
                  :placeholder="$t('PLACEHOLDERS.coloring')" v-model.trim="word.word_color" disabled />

              </div>

              <div v-for="(letter, letterIndex) in word.letters_array" :key="letterIndex">
                <div class="row">
                  <!-- Letter ID: -->
                  <base-select-input class="col-lg-6 col-12" :optionsList="data.letters"
                    :placeholder="$t('PLACEHOLDERS.character')" v-model.trim="letter.letter_id" disabled />
                  <!-- Letter Color: -->
                  <base-select-input class="col-lg-6 col-12" :optionsList="coloring"
                    :placeholder="$t('PLACEHOLDERS.coloring')" v-model.trim="letter.letter_color" disabled />

                </div>
              </div>

            </div>
          </div>

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
          word_id: '',
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
    }
  },

  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      getSurahs: "ApiGetsModule/getSurahs",
    }),
    // End:: Vuex Actions

    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `correction-reading/${this.$route.params.id}`,
        });

        this.data.select_surahs = { id: res.data.data.CorrectionReading.surah_id, name: res.data.data.CorrectionReading.surah };
        this.data.verse_number = { id: res.data.data.CorrectionReading.aya_id, name: res.data.data.CorrectionReading.aya_id };

        // Transform the API response
        const transformedData = res.data.data.CorrectionReading.words.map(word => ({
          word: word.word ? { id: word.word.id, name: word.word.content } : null,

          voice: word.voice || '',

          word_color: word.color ? { id: word.color, name: this.$t(`PLACEHOLDERS.${word.color}_color`), value: word.color } : null,
          letters_array: word.letters.map(letter => ({
            letter_id: letter.id ? { id: letter.letter_id, name: letter.letter_content, value: letter.letter_id } : null,
            letter_color: letter.color ? { id: letter.color, name: this.$t(`PLACEHOLDERS.${letter.color}_color`), value: letter.color } : null
          }))
        }));

        // Set the transformed data
        this.words = transformedData;
        console.log(transformedData);
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
    background: red;
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