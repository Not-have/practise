import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("one", "routes/one.tsx"),
  route("two", "routes/two.tsx"),
] satisfies RouteConfig;
