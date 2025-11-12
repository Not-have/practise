import {
  createRouter, createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/css"
    },
    {
      path: "/css",
      name: "css",
      component: () => import("@/pages/demo-css/index.vue")
    },
    {
      path: "/stores",
      name: "stores",
      component: () => import("@/pages/demo-stores/index.vue")
    }
  ]
});

export default router;
