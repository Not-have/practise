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
    },
    {
      path: "/waterfall",
      name: "waterfall",
      component: () => import("@/pages/demo-waterfall/index.vue")
    },
    {
      path: "/components",
      name: "components",
      component: () => import("@/pages/demo-components/index.vue")
    },
    {
      path: "/markdown",
      name: "markdown",
      component: () => import("@/pages/demo-markdown/index.vue")
    },
    {
      path: "/rich-text",
      name: "rich-text",
      component: () => import("@/pages/demo-rich-text/index.vue")
    }
  ]
});

export default router;
