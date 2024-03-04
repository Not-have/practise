import { createPinia } from 'pinia';
import { registerPiniaPersistPlugin } from '@/store/plugin/persist';
const store = createPinia();
registerPiniaPersistPlugin(store);
export function setupStore(app) {
    app.use(store);
}
export { store };
