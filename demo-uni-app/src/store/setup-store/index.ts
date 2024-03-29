/**
 * https://juejin.cn/post/7178796457133080613
 *
 * pinia-plugin-unistorage
 *
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();

pinia.use(
    createPersistedState({
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync
        }
    })
);

export default function setupStore(app: App<Element>) {
    app.use(pinia);
}
