import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import laravel from "laravel-vite-plugin";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  VueRouterAutoImports,
  getPascalCaseRouteName,
} from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import MetaLayouts from "vite-plugin-vue-meta-layouts";
import vuetify from "vite-plugin-vuetify";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    VueRouter({
      routesFolder: "resources/js/admin/pages",
      getRouteName: (routeNode) =>
        getPascalCaseRouteName(routeNode)
          .replace(/([a-z\d])([A-Z])/g, "$1-$2")
          .toLowerCase(),
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag === "swiper-container" || tag === "swiper-slide",
        },

        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    laravel({
      input: ["resources/js/admin/main.js"],
      refresh: true,
      buildDirectory: "build/admin",
    }),
    vueJsx(),
    vuetify({
      styles: { configFile: "resources/styles/variables/_vuetify.scss" },
    }),
    MetaLayouts({
      target: "./resources/js/admin/layouts",
      defaultLayout: "default",
    }),
    Components({
      dirs: [
        "resources/js/admin/@core/components",
        "resources/js/admin/views/demos",
        "resources/js/admin/components",
      ],
      dts: true,
      resolvers: [
        (componentName) => {
          // Auto import `VueApexCharts`
          if (componentName === "VueApexCharts")
            return {
              name: "default",
              from: "vue3-apexcharts",
              as: "VueApexCharts",
            };
        },
      ],
    }),
    AutoImport({
      imports: [
        "vue",
        VueRouterAutoImports,
        "@vueuse/core",
        "@vueuse/math",
        "vue-i18n",
        "pinia",
      ],
      dirs: [
        "./resources/js/admin/@core/utils",
        "./resources/js/admin/@core/composable/",
        "./resources/js/admin/composables/",
        "./resources/js/admin/utils/",
        "./resources/js/admin/plugins/*/composables/*",
      ],
      vueTemplate: true,

      // ℹ️ Disabled to avoid confusion & accidental usage
      ignore: ["useCookies", "useStorage"],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
      },
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(
          new URL("./resources/js/admin/locales/**", import.meta.url)
        ),
      ],
    }),
    svgLoader(),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@core-scss": fileURLToPath(
        new URL("./resources/styles/@core", import.meta.url)
      ),
      "@": fileURLToPath(new URL("./resources/js/admin", import.meta.url)),
      "@themeConfig": fileURLToPath(
        new URL("./themeConfig.js", import.meta.url)
      ),
      "@core": fileURLToPath(
        new URL("./resources/js/admin/@core", import.meta.url)
      ),
      "@layouts": fileURLToPath(
        new URL("./resources/js/admin/@layouts", import.meta.url)
      ),
      "@images": fileURLToPath(new URL("./resources/images/", import.meta.url)),
      "@styles": fileURLToPath(new URL("./resources/styles/", import.meta.url)),
      "@configured-variables": fileURLToPath(
        new URL("./resources/styles/variables/_template.scss", import.meta.url)
      ),
      "@db": fileURLToPath(
        new URL(
          "./resources/js/admin/plugins/fake-api/handlers/",
          import.meta.url
        )
      ),
      "@api-utils": fileURLToPath(
        new URL("./resources/js/admin/plugins/fake-api/utils/", import.meta.url)
      ),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: { vendor: ["vue", "vuetify", "pinia"] },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./resources/js/admin/**/*.vue"],
  },
});
