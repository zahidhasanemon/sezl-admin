import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    laravel({
      input: [
        "resources/js/frontend/app.js",
        "resources/js/frontend/ssr.js",
        "resources/css/frontend/app.css",
      ],
      ssr: "resources/js/frontend/ssr.js",
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./resources/js/frontend", import.meta.url)),
      "@stores": fileURLToPath(
        new URL("./resources/js/frontend/stores", import.meta.url)
      ),
      "@images": fileURLToPath(new URL("./resources/images/", import.meta.url)),
    },
  },
  ssr: {
    noExternal: ["@inertiajs/vue3"],
  },
  build: {
    rollupOptions: {
      input: {
        app: "resources/js/frontend/app.js",
        ssr: "resources/js/frontend/ssr.js",
      },
    },
  },
});
