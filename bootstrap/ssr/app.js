import "@inertiajs/core";
import { InertiaProgress } from "@inertiajs/progress";
import "lodash-es";
import { createPinia } from "pinia";
import { createApp, h } from "vue";
import "vue/server-renderer";
import Vue3Toastify from "vue3-toastify";
import {
  _ as _sfc_main,
  c as createInertiaApp,
  r as resolvePageComponent,
} from "./assets/FrontendLayout-D9w5YXg3.js";
InertiaProgress.init({
  color: "#4f46e5",
  showSpinner: true,
});
createInertiaApp({
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({
        "./Pages/About.vue": () => import("./assets/About-C3gYjHnN.js"),
        "./Pages/Cart.vue": () => import("./assets/Cart-CBO61KAd.js"),
        "./Pages/Checkout.vue": () => import("./assets/Checkout-BBpWrkmU.js"),
        "./Pages/Contact.vue": () => import("./assets/Contact-DZh18KNA.js"),
        "./Pages/EmailVerification.vue": () =>
          import("./assets/EmailVerification-OBxrLwZ6.js"),
        "./Pages/Faq.vue": () => import("./assets/Faq-46TPNolx.js"),
        "./Pages/ForgetPassword.vue": () =>
          import("./assets/ForgetPassword-BDWv5DIH.js"),
        "./Pages/Home.vue": () => import("./assets/Home-VANo6l4_.js"),
        "./Pages/Login.vue": () => import("./assets/Login-CvU0WBCn.js"),
        "./Pages/MyNotification.vue": () =>
          import("./assets/MyNotification-BkMyc46d.js"),
        "./Pages/MyOrder.vue": () => import("./assets/MyOrder-m3Nbo4ne.js"),
        "./Pages/MyWishlist.vue": () =>
          import("./assets/MyWishlist-DPcXIiz4.js"),
        "./Pages/PaymentCancel.vue": () =>
          import("./assets/PaymentCancel-FBrMOij1.js"),
        "./Pages/PaymentError.vue": () =>
          import("./assets/PaymentError-Dcd25-8r.js"),
        "./Pages/PaymentSuccess.vue": () =>
          import("./assets/PaymentSuccess-Dv7Wj0b-.js"),
        "./Pages/Privacy.vue": () => import("./assets/Privacy-YZ6PnlXx.js"),
        "./Pages/Products/Category.vue": () =>
          import("./assets/Category-BKD8YUy-.js"),
        "./Pages/Products/Index.vue": () =>
          import("./assets/Index-leO08eEH.js"),
        "./Pages/Products/Show.vue": () => import("./assets/Show-BwVcRMFM.js"),
        "./Pages/Profile.vue": () => import("./assets/Profile-BOmd7iKD.js"),
        "./Pages/ResetPassword.vue": () =>
          import("./assets/ResetPassword-cnkY3ETJ.js"),
        "./Pages/Signup.vue": () => import("./assets/Signup-83SBzyms.js"),
        "./Pages/Terms.vue": () => import("./assets/Terms-Cw4cs_Cq.js"),
        "./Pages/Testimonial.vue": () =>
          import("./assets/Testimonial-DvEcm2yy.js"),
        "./Pages/TrackOrder.vue": () =>
          import("./assets/TrackOrder-D5TEl4vM.js"),
      })
    );
    page.default.layout = page.default.layout || _sfc_main;
    return page;
  },
  setup({ el, App, props, plugin }) {
    const pinia = createPinia();
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(pinia)
      .use(Vue3Toastify, {
        autoClose: 3e3,
        position: "top-right",
        theme: "colored",
      })
      .mount(el);
  },
  title: (title) => (title ? `${title} - VuexyAdmin` : "VuexyAdmin"),
});
