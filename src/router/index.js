import Vue from "vue";
import VueRouter from "vue-router";

// Start:: Importing Middleware
import auth from "../middleware/auth.js";
// End:: Importing Middleware

// Start:: Importing Router Components
import Authentication from "../pages/Authentication.vue";
import LoginForm from "../views/Auth/LoginForm.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
import AppContentWrapper from "../pages/AppContentWrapper.vue";

// ============== Start:: Home Page Route
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Clients Routes
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
import ShowClient from "../views/Cruds/Clients/Show.vue";
// ============== End:: Clients Routes

// ============== Start:: Contact Messages Routes
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
import Guides from "../views/Cruds/AppContent/Guides.vue";
import Video from "../views/Cruds/AppContent/Video.vue";
// ============== End:: App Content Routes

// ============== Start:: App Settings Routes
import AppSettingsHome from "../views/Cruds/AppSettings/Home.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
// ============== End:: App Settings Routes

// ============== Start:: Roles Routes
import RolesHome from "../views/Cruds/Roles/Home.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
// ============== End:: Roles Routes

// ============== Start:: Admins Routes
import AdminsHome from "../views/Cruds/Admins/Home.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
// ============== End:: Admins Routes

// ============== Start:: AdditionSurah Routes
import AdditionSurahHome from "../views/Cruds/AdditionSurah/Home.vue";
import AllAdditionSurah from "../views/Cruds/AdditionSurah/ShowAll.vue";
import CreateAdditionSurah from "../views/Cruds/AdditionSurah/Create.vue";
import EditAdditionSurah from "../views/Cruds/AdditionSurah/Edit.vue";
import ShowAdditionSurah from "../views/Cruds/AdditionSurah/Show.vue";
// ============== End:: AdditionSurah Routes

// ============== Start:: Books Routes
import BooksHome from "../views/Cruds/Books/Home.vue";
import AllBooks from "../views/Cruds/Books/ShowAll.vue";
import CreateBooks from "../views/Cruds/Books/Create.vue";
import EditBooks from "../views/Cruds/Books/Edit.vue";
import ShowBooks from "../views/Cruds/Books/Show.vue";
// ============== End:: Books Routes

// ============== Start:: Readers Routes
import ReadersHome from "../views/Cruds/Readers/Home.vue";
import AllReaders from "../views/Cruds/Readers/ShowAll.vue";
// ============== End:: Readers Routes

// ============== Start:: Reports Routes
import ReportsHome from "../views/Cruds/Reports/Home.vue";
import AllReports from "../views/Cruds/Reports/ShowAll.vue";
// ============== End:: Reports Routes

// ============== Start:: All Notifications Routes
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
// ============== End:: All Notifications Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route
// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Clients Routes Config
      {
        path: "/clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients index",
                subject: "clients",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowClient",
            component: ShowClient,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients show",
                subject: "clients",
              },
            },
          },
        ],
      },
      // End:: Clients Routes Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contactUs index",
                subject: "contactUs",
              },
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: Books Routes Config
      {
        path: "/books",
        name: "BooksHome",
        component: BooksHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllBooks",
            component: AllBooks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "books index",
                subject: "books",
              },
            },
          },
          {
            path: "create",
            name: "CreateBooks",
            component: CreateBooks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "books create",
                subject: "books",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditBooks",
            component: EditBooks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "books edit",
                subject: "books",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowBooks",
            component: ShowBooks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "books show",
                subject: "books",
              },
            },
          },
        ],
      },
      // End:: Books Routes Config

      // Start:: AdditionSurah Routes Config
      {
        path: "/addition-surah",
        name: "AdditionSurahHome",
        component: AdditionSurahHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdditionSurah",
            component: AllAdditionSurah,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "surahs index",
                subject: "surahs",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdditionSurah",
            component: CreateAdditionSurah,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "surahs create",
                subject: "surahs",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdditionSurah",
            component: EditAdditionSurah,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "surahs edit",
                subject: "surahs",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdditionSurah",
            component: ShowAdditionSurah,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "surahs show",
                subject: "surahs",
              },
            },
          },
        ],
      },
      // End:: AdditionSurah Routes Config

      // Start:: readers Routes Config
      {
        path: "/readers",
        name: "ReadersHome",
        component: ReadersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllReaders",
            component: AllReaders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "readers index",
                subject: "readers",
              },
            },
          },
        ],
      },
      // End:: readers Routes Config

      // Start:: Reports Routes Config
      {
        path: "/reports",
        name: "ReportsHome",
        component: ReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllReports",
            component: AllReports,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "reports index",
                subject: "reports",
              },
            },
          },
        ],
      },
      // End:: Reports Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings index",
                subject: "settings",
              },
            },
          },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings index",
                subject: "settings",
              },
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings index",
                subject: "settings",
              },
            },
          },
          {
            path: "guides",
            name: "Guides",
            component: Guides,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings index",
                subject: "settings",
              },
            },
          },
          {
            path: "video",
            name: "Video",
            component: Video,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings index",
                subject: "settings",
              },
            },
          },
        ],
      },
      // End:: App Content Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/settings",
        component: AppSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings index",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/contact_settings",
        component: GeneralSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings index",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles create",
                subject: "roles",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles edit",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users create",
                subject: "users",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users edit",
                subject: "users",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users show",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllNotifications,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: All Notifications Route Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// permissions

router.beforeEach((to, from, next) => {
  // console.log(to);
  // Check if the route requires permission
  if (to.meta && to.meta.requiresPermission) {
    const { action, subject } = to.meta.requiresPermission;

    // Retrieve permissions from localStorage
    const storedPermissions = JSON.parse(
      localStorage.getItem("Telawaty_admin_roles")
    )?.permissions;

    // Check if the user has the required permission
    if (
      storedPermissions.some(
        (permission) =>
          permission.action === action && permission.subject === subject
      )
    ) {
      next(); // User has permission, allow access to the route
    } else {
      // User doesn't have permission, redirect to a fallback route or show an error message
      next("/forbidden"); // Replace '/fallback' with the route path or name of your fallback route
    }
  } else {
    next(); // Route doesn't require permission, allow access to the route
  }
});

// authentication
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (localStorage.getItem("Telawaty_admin_dashboard_user_token")) {
    if (
      to.name == "LoginForm" ||
      to.name == "ResetPasswordEmailForm" ||
      to.name == "PhoneVerification" ||
      to.name == "ChangePhoneNumberForm" ||
      to.name == "ResetPasswordForm"
    ) {
      return next("/home");
    } else {
      return next();
    }
  }
  return next();
});
// End:: Middleware And Router Guards

export default router;
