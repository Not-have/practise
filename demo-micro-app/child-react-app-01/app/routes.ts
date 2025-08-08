import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("products", "routes/products.tsx"),
  route("contact", "routes/contact.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
