import { createSSRApp } from 'vue';
import App from './App.vue';
import "uno.css";
import setupStore from '@/store/index';
import setupUiLibrary from '@/common/setup-ui-library'

export function createApp() {
    const app = createSSRApp(App);
    setupStore(app);
    setupUiLibrary(app);
    return {
        app
    };
}