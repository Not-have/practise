import App from "./App.vue";
import {
  directiveDraggable,
  directiveConversionTime
} from "@mt-kit/vue-directives";
import {
  createApp
} from "vue";

import {
  createPinia
} from "pinia";

import router from "./router";

import "element-plus/dist/index.css";
import "./assets/main.css";

const app = createApp(App);

// app.config.errorHandler = (err, instance, info): void => {
//   if (instance) {
//     configErrorHandler(err, instance, info);
//   } else {
//     console.error(err, info);
//   }
// };

app.use(directiveDraggable);
app.use(directiveConversionTime);

app.use(createPinia());
app.use(router);

app.mount("#app");
