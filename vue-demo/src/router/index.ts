import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { ERouter } from "./enum";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: ERouter.ROUTER,
            name: ERouter.ROUTER,
            component: () => import("../views/router/Router.vue"),
            children: [
                // {
                //     path: Router.ROUTER,
                //     name: Router.ROUTER,
                //     component: () => import('../views/Router.vue'),
                // },
                {
                    path: ERouter.ROUTER_$id_ROUTER_SON,
                    name: ERouter.ROUTER_$id_ROUTER_SON,
                    component: () => import("../views/router/Router-son.vue"),
                    props: true, // 将动态路径参数作为 props 传递给组件
                },
            ],
        },
        {
            path: ERouter.COMPOSITION,
            name: ERouter.COMPOSITION,
            component: () => import("../views/composition/Index.vue"),
        },
        {
            path: ERouter.PROVIDE,
            name: ERouter.PROVIDE,
            component: () => import("../views/provide/Index.vue"),
        },
        {
            path: ERouter.DIRECTIVES,
            name: ERouter.DIRECTIVES,
            component: () => import("../views/directives/Index.vue"),
        },
        {
            path: ERouter.COMPUTED,
            name: ERouter.COMPUTED,
            component: () => import("../views/computed/index.vue"),
        },
        {
            path: ERouter.VUE_STYLED_COMPONENTS,
            name: ERouter.VUE_STYLED_COMPONENTS,
            // @ts-ignore
            component: () => import("../views/vue-styled-components/index.vue"),
        },
        {
            path: ERouter.DEMO_HOOKS,
            name: ERouter.DEMO_HOOKS,
            component: () => import("../views/demo-hooks/index.vue"),
        },
        {
            path: ERouter.FIX_DATA,
            name: ERouter.FIX_DATA,
            component: () => import("../views/fix-data/index.vue"),
        }
    ],
});

export default router;
