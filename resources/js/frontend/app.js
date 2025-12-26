import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createPinia } from "pinia";
import { createApp, h } from "vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Import Tailwind CSS for frontend only
import "../../css/frontend/app.css";

import BlankLayout from "./Layouts/BlankLayout.vue";

// Import progress indicator
import { InertiaProgress } from "@inertiajs/progress";

// Initialize progress indicator
InertiaProgress.init({
  color: "#4f46e5",
  showSpinner: true,
});

createInertiaApp({
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob("./Pages/**/*.vue")
    );

    // Set default layout for all pages
    page.default.layout = page.default.layout || BlankLayout;

    return page;
  },
  setup({ el, App, props, plugin }) {
    const pinia = createPinia();
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(pinia)
      .use(Vue3Toastify, {
        autoClose: 3000,
        position: "top-right",
        theme: "colored",
      })
      // .use(router)
      .mount(el);
  },
  title: (title) => (title ? `${title} - VuexyAdmin` : "VuexyAdmin"),
});
