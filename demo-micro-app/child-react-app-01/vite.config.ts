import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/child-react-app-01/',
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
});
