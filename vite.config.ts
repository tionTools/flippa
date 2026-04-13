import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import faroUploader from "@grafana/faro-rollup-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      faroUploader({
        appName: "flippa",
        endpoint: "https://faro-api-prod-eu-west-2.grafana.net/faro/api/v1",
        apiKey: env.GRAFANA_FARO_API_KEY,
        appId: "5512",
        stackId: "1574680",
        verbose: true,
        gzipContents: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
