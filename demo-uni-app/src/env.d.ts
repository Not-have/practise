// / <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_WE_CHAT_APP_ID: string;
  readonly VITE_WE_CHAT_SECRET: string;

  // 其他环境变量也可以在这里添加
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
