import {
  createRouter,
  createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/planet-demo-01"
    },
    {
      path: "/planet-demo-01",
      name: "planet-demo-01",
      component: () => {
        return import("@/views/PlanetDemo01/index.vue");
      }
    },
    {
      path: "/planet-demo-02",
      name: "planet-demo-02",
      component: () => {
        return import("@/views/PlanetDemo02/index.vue");
      }
    },
    {
      path: "/planet-demo-03",
      name: "planet-demo-03",
      component: () => {
        return import("@/views/PlanetDemo03/index.vue");
      }
    },
    {
      path: "/demo-canvas",
      name: "demo-canvas",
      component: () => {
        return import("@/views/demo-canvas/index.vue");
      }
    }
  ]
});

export default router;
