<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">

              <base-select-input col="6" v-if="all_surahsData" :optionsList="all_surahsData"
                :placeholder="$t('PLACEHOLDERS.surah_name')" v-model.trim="filterOptions.select_surahs" />

              <!-- Start:: Status Input -->
              <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.is_active" />
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.recitation_correction_reports") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper">
          <base-button class="mt-0 pdf_btn" styleType="solid_btn" :btnText="$t('BUTTONS.downloadPdf')"
            @fireClick="downloadPdf" :disabled="pdfDownloadBtnIsLoading">
            <template v-slot:btn_icon>
              <i class="fal fa-file-pdf"></i>
            </template>
          </base-button>
        </div>

      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table class="thumb" :loading="loading" :loading-text="$t('TABLES.loadingData')" :search="searchValue"
        :headers="tableHeaders" :items="tableRows" item-class="ltr" :items-per-page="paginations.items_per_page"
        hide-default-footer>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <!-- Start:: Item Image -->
        <template v-slot:[`item.id`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.id"> {{ $t("TABLES.noData") }} </h6>
            <p v-else>{{ (paginations.current_page - 1) * paginations.items_per_page + index + 1 }}</p>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Title -->
        <template v-slot:[`item.name`]="{ item }">
          <p class="text-danger" v-if="!item.name"> {{ $t("TABLES.noData") }} </p>
          <p v-else>{{ item.name }}</p>
        </template>
        <!-- End:: Title -->

        <!-- Start:: Title -->
        <template v-slot:[`item.created_at`]="{ item }">
          <p class="text-danger" v-if="!item.created_at || item.created_at == 'null'"> - </p>
          <p v-else>{{ item.created_at }}</p>
        </template>
        <!-- End:: Title -->

        <!-- Start:: Activation -->
        <template v-slot:[`item.is_active`]="{ item }">
          <div class="activation" dir="ltr" style="z-index: 1" v-if="$can('books activate', 'books')">
            <v-switch class="mt-2" color="success" v-model="item.is_active" hide-details
              @change="changeActivationStatus(item)"></v-switch>
          </div>

          <template v-else>
            <span class="text-success text-h5" v-if="item.is_active">
              <i class="far fa-check"></i>
            </span>
            <span class="text-danger text-h5" v-else>
              <i class="far fa-times"></i>
            </span>
          </template>
        </template>
        <!-- End:: Activation -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
    " />
      </div>
    </template>
    <!-- End:: Pagination -->

    <!-- Start:: Generate PDF Template Content -->
    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
      :filename="$t('PLACEHOLDERS.recitation_correction_reports')" :pdf-quality="2" pdf-format="a4"
      :manual-pagination="false" :paginate-elements-by-height="1400" pdf-content-width="100%"
      @progress="bdfDownloadBtnIsLoading = true" @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))"
      ref="html2Pdf">
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <h1 class="file_title"> {{ $t('PLACEHOLDERS.recitation_correction_reports') }} </h1>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header.value">
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableRows" :key="row.id">
                  <td>{{ row.id ? row.id : '-' }}</td>
                  <td>{{ row.name ? row.name : '-' }}</td>
                  <td>{{ row.ayah_count ? row.ayah_count : '-' }}</td>
                  <!-- <td>{{ row.created_at ? row.created_at : '-' }}</td> -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters, mapActions } from "vuex";

export default {

  components: {
    VueHtml2pdf
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      all_surahsData: "ApiGetsModule/all_surahsData",
    }),

    activeStatuses() {
      return [
        {
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.most_recited_surahs"),
          value: "ASC",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.least_recited_surahs"),
          value: "DESC",
        },
      ];
    },
  },

  data() {
    return {

      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      pdfDownloadBtnIsLoading: false,
      excelDownloadBtnIsLoading: false,
      // End:: Loading Data

      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        title: null,
        select_surahs: '',
        is_active: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.StoresTypes.serialNumber"),
          value: "id",
          align: "center",
          // width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.surah_name"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.recitation_count"),
          value: "views",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("TABLES.Products.created_at"),
        //   value: "created_at",
        //   sortable: false,
        //   align: "center",
        // },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDescription: false,
      selectedDescriptionTextToShow: "",
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data 
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      allCities: []

    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      getSurahs: "ApiGetsModule/getSurahs",
    }),
    // End:: Vuex Actions
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/reports/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.select_surahs = null;
      this.filterOptions.is_active = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/reports/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "reports",
          params: {
            page: this.paginations.current_page,
            surah_id: this.filterOptions.select_surahs?.id,
            orderBy: this.filterOptions.is_active?.value,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Handling Download Files
    async downloadPdf() {
      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;
    },
    // End:: Handling Download Files

  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    this.getSurahs();
    // End:: Fire Methods
  },
};
</script>
