import {
  createRouter, createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/css",
      name: "css",
      component: () => import("@/pages/demo-css/index.vue")
    }
  ]
});

export default router;
