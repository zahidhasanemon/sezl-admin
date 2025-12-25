import { createInertiaApp } from "@inertiajs/vue3";
import { renderToString } from "@vue/server-renderer";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createPinia } from "pinia";
import { createSSRApp, h } from "vue";
import "../../css/frontend/app.css";

import FrontendLayout from "./Layouts/FrontendLayout.vue";

export default function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page = await resolvePageComponent(
        `./Pages/${name}.vue`,
        import.meta.glob("./Pages/**/*.vue")
      );

      // Set default layout
      page.default.layout = page.default.layout || FrontendLayout;

      return page;
    },
    setup({ App, props, plugin }) {
      const pinia = createPinia();
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(pinia);
    },
  });
}
