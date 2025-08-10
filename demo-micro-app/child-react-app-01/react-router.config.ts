import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // 添加对开发工具请求的处理
  serverModuleFormat: "esm",
  basename: "/child-react-app-01/",
} satisfies Config;
