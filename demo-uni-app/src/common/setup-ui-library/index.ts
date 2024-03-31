import type { App } from 'vue';
import uviewPlus from 'uview-plus';

export default function setupUiLibrary(app: App<Element>) {
    app.use(uviewPlus);
}
