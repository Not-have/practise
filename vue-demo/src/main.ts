import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';

import "./assets/main.css";
import App from './App.vue';
import router from './router';
import draggable from './directives/draggable';
import './rc/imitation-vue-error/rc/index'

const app = createApp(App);
import Antd from 'ant-design-vue';
app.use(Antd);
app.use(createPinia());
app.use(router);
app.use(draggable);

window.addEventListener('unhandledrejection', handleUnhandledRejection);

function handleUnhandledRejection(event: any) {
    console.error('未处理的 Promise 拒绝:', event.reason);
}
app.mount('#app');