import { createSSRApp } from "vue";

import setupUiLibrary from "@/common/setup-ui-library";

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);

  setupUiLibrary(app);

  return {
    app
  };
}
