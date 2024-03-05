import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';

import "./assets/main.css";
import App from './App.vue';
import router from './router';
import draggable from './directives/draggable';
import './rc/imitation-vue-error/rc/index'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(draggable);
// err 参数通常是一个 Error 对象或其子类的实例
app.config.errorHandler = (err, instance) => {
    instance?.$nextTick(() => {
        /* */
        // must be within function call because that's when the element is defined for sure.
        const ErrorOverlays = customElements.get("imitation-vue-error");
        
        // don't open outside vite environment
        if (!ErrorOverlays) {
            return;
        }

        if (instance?.$el.childNodes.length > 0) {
            (instance?.$el as Element).innerHTML = "";
            (instance?.$el as Element).appendChild(new ErrorOverlays(err));
            return
        }

        // 在处理一个 template 直接字符串的情况
        console.log("直接字符串");
        document.body.appendChild(new ErrorOverlays(err, true));
    });
}

app.mount('#app');