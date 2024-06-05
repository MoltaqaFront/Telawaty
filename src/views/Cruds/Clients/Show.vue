<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient", { name: data.name }) }}</h4>
    </div>
    <!-- End:: Title -->


    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Status Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.numberOfVisits }) }}
          </v-chip>
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>

        <v-chip :color="data.active ? 'green' : 'red'" text-color="white">
          {{ data.active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <!-- <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            :preSelectedImage="data.image" disabled class="disabled_input" /> -->
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled
            class="disabled_input" />
          <!-- End:: Ar Name Input -->

             <!-- Start:: Status Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.country_code')"
                v-model="data.iso" disabled/>
              <!-- End:: Status Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" readonly
            class="disabled_input" />
          <!-- End:: Phone Input -->

          <!-- Start:: Second Phone Input -->
          <!-- <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.secondPhone')" v-model.trim="data.secondPhone"
            readonly class="disabled_input" /> -->
          <!-- End:: Second Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" readonly
            class="disabled_input" />
          <!-- End:: Email Input -->

          <!-- Start:: Joining Date Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.joiningDate')" v-model.trim="data.joiningDate"
            readonly class="disabled_input" /> -->
          <!-- End:: Joining Date Input -->
        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->

    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleClient",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Table Data
      addressesTableHeaders: [
        { text: this.$t("TABLES.Addresses.serialNumber") },
        { text: this.$t("TABLES.Addresses.address") },
        { text: this.$t("TABLES.Addresses.longitude") },
        { text: this.$t("TABLES.Addresses.latitude") },
        { text: this.$t("TABLES.Addresses.type") },
        { text: this.$t("TABLES.Addresses.isDefault") },
      ],
      // End:: Table Data

      // Start:: Data
      data: {
        image: null,
        name: null,
        iso: null,
        phone: null,
        secondPhone: null,
        email: null,
        joiningDate: null,
        currentPackage: null,
        addresses: [],
        active: false,
        numberOfVisits: null,
        lastVisit: null
      },
      // End:: Data
    };
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `clients/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        // this.data.image = res.data.data.User.image;
        this.data.name = res.data.data.User.name;
        this.data.phone = res.data.data.User.mobile;
        this.data.email = res.data.data.User.email;
        // this.data.joiningDate = res.data.data.User.created_at;
        this.data.active = res.data.data.User.is_active;
          if (res.data.data.User.code && res.data.data.User.flag) {
            this.data.iso = `${res.data.data.User.code} (${res.data.data.User.flag})`;
          } else {
            this.data.iso = '';
          }
        // this.data.iso = `${res.data.data.User.code} (${res.data.data.User.flag})` ;
        this.data.numberOfVisits = res.data.data.User.num_times;
        this.data.lastVisit = res.data.data.User.last_enter;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    // End:: Fire Methods
  },
};
</script>
