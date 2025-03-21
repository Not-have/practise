import HomeView from "../views/HomeView.vue";
import {
  createRouter, createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/element",
      name: "element",
      component: () => import("../views/Element.vue")
    },
    {
      path: "/othder",
      name: "othder",
      component: () => import("../views/Othder.vue")
    },
    {
      path: "/json",
      name: "json",
      component: () => import("../views/Json.vue")
    }
  ]
});

export default router;
