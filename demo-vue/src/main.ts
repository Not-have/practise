import App from "./App.vue";
import {
  createApp
} from "vue";

import ElementPlus from "element-plus";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import {
  createPinia
} from "pinia";

import router from "./router";

import "element-plus/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCN
});

app.mount("#app");
