<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper">
      <router-link class="logo" to="/home">
        <img src="@/assets/media/logo/logo.png" alt="Logo" width="170" height="125" />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/home.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: notifications Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('notifications show', 'notifications')">
        <router-link to="/all-notifications/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/notifications.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.notifications.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: notifications Route -->

      <!-- Start:: clients Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('clients index', 'clients')">
        <router-link to="/clients/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/clients.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.app_users_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: clients Route -->

      <!-- Start:: AdditionSurah Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('surahs index', 'surahs')">
        <router-link to="/addition-surah/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/book.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_surah_attachments") }}
          </span>
        </router-link>
      </div>
      <!-- End:: AdditionSurah Route -->

      <!-- Start:: Correction_readings Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('correctionReading index', 'correctionReading')">
        <router-link to="/correction-reading/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/like.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_recitation_correction") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Correction_readings Route -->

      <!-- Start:: books Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('books index', 'books')">
        <router-link to="/books/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/books.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.library_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: books Route -->

      <!-- Start:: readers Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('readers index', 'readers')">
        <router-link to="/readers/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/open-book.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.reader_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: readers Route -->

      <!-- Start:: recitation_correction_reports Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('reports index', 'reports')">
        <router-link to="/reports/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/bill.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.recitation_correction_reports") }}
          </span>
        </router-link>
      </div>
      <!-- End:: recitation_correction_reports Route -->

      <!-- Start:: contactuses Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('contactUs index', 'contactUs')">
        <router-link to="/contact-messages/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/messages.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ContactMessages.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: contactuses Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="vertical" :open-keys="openKeys" @openChange="onOpenChange">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList" :key="item.key" :data-type="!item.children ? 'single_route' : ''">
            <template v-if="item.children">
              <!-- ========= Start:: Main Tab -->
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <!-- v-if="childItem.hasPermission" -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.hey">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

          </a-sub-menu>
          <!-- End:: Side Nav Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: questions Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('settings index', 'settings')">
        <router-link to="/questions/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/question.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.questions.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: questions Route -->

      <!-- Start:: settings Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('settings index', 'settings')">
        <router-link to="/settings">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/settings.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.settings.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: settings Route -->

      <!-- Start:: users Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('users index', 'users')">
        <router-link to="/admins/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/admins.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Admins.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Users Route -->

      <!-- Start:: roles Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('roles index', 'roles')">
        <router-link to="/roles/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/roles.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Roles.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: roles Route -->

      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline">
          <!-- Start:: Logout Tab -->
          <a-sub-menu key="logout" @titleClick="logoutConfirmationModalIsOpen = true">
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img src="../../assets/media/icons/ui_icons/logout.svg" alt="icon" width="35" height="35" />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="logoutConfirmationModalIsOpen = false">{{ $t("BUTTONS.cancel")
              }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
    <!-- End:: Side Nav Links -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData"
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys

  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        {
          key: "appContent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          children: [
            {
              key: "aboutUs",
              title: this.$t("SIDENAV.AppContent.aboutUs"),
              route: "/app-content/about-us",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "Guides",
              title: this.$t("PLACEHOLDERS.guidelines"),
              route: "/app-content/guides",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "trip",
              title: this.$t("PLACEHOLDERS.project_description"),
              route: "/app-content/trip",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "about_app",
              title: this.$t("PLACEHOLDERS.project_name"),
              route: "/app-content/about_app",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "video",
              title: this.$t("PLACEHOLDERS.introductory_video"),
              route: "/app-content/video",
              hasPermission: this.$can('settings index', 'settings'),
            },
            {
              key: "contact",
              title: this.$t("PLACEHOLDERS.contact_admins"),
              route: "/contact_settings",
              hasPermission: this.$can('settings index', 'settings'),
            },
          ],
        },

      ],
      // End:: Side Navbar List

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout"
    }),
    // End:: Vuex Auth Actions

    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {
  },
};
</script>
