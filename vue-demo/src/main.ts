import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';
import "./assets/main.css";
import App from './App.vue';
import router from './router';
import draggable from './directives/draggable';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(draggable);

app.mount('#app');
