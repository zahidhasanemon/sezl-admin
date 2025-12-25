import { c as createInertiaApp, r as resolvePageComponent, _ as _sfc_main } from "./assets/FrontendLayout-D9w5YXg3.js";
import { renderToString } from "@vue/server-renderer";
import { createPinia } from "pinia";
import { createSSRApp, h } from "vue";
import "vue/server-renderer";
import "@inertiajs/core";
import "lodash-es";
import "vue3-toastify";
function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page2 = await resolvePageComponent(
        `./Pages/${name}.vue`,
        /* @__PURE__ */ Object.assign({ "./Pages/About.vue": () => import("./assets/About-C3gYjHnN.js"), "./Pages/Cart.vue": () => import("./assets/Cart-CBO61KAd.js"), "./Pages/Checkout.vue": () => import("./assets/Checkout-BBpWrkmU.js"), "./Pages/Contact.vue": () => import("./assets/Contact-DZh18KNA.js"), "./Pages/EmailVerification.vue": () => import("./assets/EmailVerification-OBxrLwZ6.js"), "./Pages/Faq.vue": () => import("./assets/Faq-46TPNolx.js"), "./Pages/ForgetPassword.vue": () => import("./assets/ForgetPassword-BDWv5DIH.js"), "./Pages/Home.vue": () => import("./assets/Home-VANo6l4_.js"), "./Pages/Login.vue": () => import("./assets/Login-CvU0WBCn.js"), "./Pages/MyNotification.vue": () => import("./assets/MyNotification-BkMyc46d.js"), "./Pages/MyOrder.vue": () => import("./assets/MyOrder-m3Nbo4ne.js"), "./Pages/MyWishlist.vue": () => import("./assets/MyWishlist-DPcXIiz4.js"), "./Pages/PaymentCancel.vue": () => import("./assets/PaymentCancel-FBrMOij1.js"), "./Pages/PaymentError.vue": () => import("./assets/PaymentError-Dcd25-8r.js"), "./Pages/PaymentSuccess.vue": () => import("./assets/PaymentSuccess-Dv7Wj0b-.js"), "./Pages/Privacy.vue": () => import("./assets/Privacy-YZ6PnlXx.js"), "./Pages/Products/Category.vue": () => import("./assets/Category-BKD8YUy-.js"), "./Pages/Products/Index.vue": () => import("./assets/Index-leO08eEH.js"), "./Pages/Products/Show.vue": () => import("./assets/Show-BwVcRMFM.js"), "./Pages/Profile.vue": () => import("./assets/Profile-BOmd7iKD.js"), "./Pages/ResetPassword.vue": () => import("./assets/ResetPassword-cnkY3ETJ.js"), "./Pages/Signup.vue": () => import("./assets/Signup-83SBzyms.js"), "./Pages/Terms.vue": () => import("./assets/Terms-Cw4cs_Cq.js"), "./Pages/Testimonial.vue": () => import("./assets/Testimonial-DvEcm2yy.js"), "./Pages/TrackOrder.vue": () => import("./assets/TrackOrder-D5TEl4vM.js") })
      );
      page2.default.layout = page2.default.layout || _sfc_main;
      return page2;
    },
    setup({ App, props, plugin }) {
      const pinia = createPinia();
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(pinia);
    }
  });
}
export {
  render as default
};
