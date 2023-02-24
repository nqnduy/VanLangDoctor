import Vue from "vue";
import App from "./App.vue";
import router from "./routes/router";
import store from "./store";
import "bootstrap";
import { ValidationProvider, localize } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import vi from "./vi.json";
import VueSweetalert2 from "vue-sweetalert2";
import pageRoute from "../src/constants/pages";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
localize({
   vi: {
      fields: {
         phone: {
            regex: "Số điện thoại không hợp lệ",
         },
         "Mật khẩu xác nhận": {
            confirmed: "Mật khẩu xác nhận không đúng",
         },
      },
   },
});
localize("vi", vi);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.config.productionTip = false;

// // Meta Handling
router.beforeEach((to, from, next) => {
   if (to.matched.some((record) => record.meta.customer)) {
      if (localStorage.getItem("role") == "Customer") {
         if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
            next({
               path: pageRoute.USER_LOGIN,
               params: { nextUrl: to.fullPath },
            });
         } else {
            store.dispatch('queryFilterReset')
            next();
         }
      } else {
         next({
            path: pageRoute.USER_LOGIN,
            params: { nextUrl: to.fullPath },
         });
      }
   } else if (to.matched.some((record) => record.meta.doctor)) {
      if (localStorage.getItem("role") == "Doctor" || localStorage.getItem("role") == "Pharmacist") {
         if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
            next({
               path: pageRoute.DOCTOR_PHARMACIST_LOGIN,
               params: { nextUrl: to.fullPath },
            });
         } else {
            store.dispatch('queryFilterReset')
            next();
         }
      } else {
         next({
            path: pageRoute.HOME,
            params: { nextUrl: to.fullPath },
         });
      }
   } else if (to.matched.some((record) => record.meta.admin)) {
      if (localStorage.getItem("role") == "Admin") {
         if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
            next({
               path: pageRoute.ADMIN_MANAGER_LOGIN,
               params: { nextUrl: to.fullPath },
            });
         } else {
            next();
         }
      } else {
         next({
            path: pageRoute.HOME,
            params: { nextUrl: to.fullPath },
         });
      }
   } else if (to.matched.some((record) => record.meta.manager)) {
      if (localStorage.getItem("role") == "Manager") {
         if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
            next({
               path: pageRoute.ADMIN_MANAGER_LOGIN,
               params: { nextUrl: to.fullPath },
            });
         } else {
            next();
         }
      } else {
         next({
            path: pageRoute.HOME,
            params: { nextUrl: to.fullPath },
         });
      }
   } else if (localStorage.getItem("token") != null && to.matched.some((record) => record.meta.disallowAuthed)) {
      const account = store.getters.customer;
      const role = account.role;
      if (role == "Doctor" || role == "Pharmacist") {
         next({
            path: pageRoute.DOCTOR_LOGIN_SUCCESS,
            params: { nextUrl: to.fullPath },
         });
      } else {
         next({
            path: pageRoute.HOME,
            params: { nextUrl: to.fullPath },
         });
      }
   } else {
      next();
   }
});

new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount("#app");
