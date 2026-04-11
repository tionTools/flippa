import { createApp } from "vue";
import { createPinia } from "pinia";
import { clerkPlugin } from "@clerk/vue";
import "./global.css";

import App from "./App.vue";
import router from "./router";

const PUBLISHABLE_KEY = "pk_test_c3RlcmxpbmctamF5YmlyZC00Mi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.mount("#app");
