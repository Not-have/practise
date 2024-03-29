import { createSSRApp } from 'vue';
// import "uno.css";
import setupStore from '@/store/index';

import App from './App.vue';
export function createApp() {
    const app = createSSRApp(App);
    setupStore(app);
    return {
        app
    };
}
