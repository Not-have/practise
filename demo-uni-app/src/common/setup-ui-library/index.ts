import type { App } from "vue";
/**
 * https://uiadmin.net/uview-plus/
 */
import uviewPlus from "uview-plus";
/**
 * 在 uni.scss 中引入主题
 */
export default function setupUiLibrary(app: App<Element>) {
  // @ts-ignore
  app.use(uviewPlus);
}
