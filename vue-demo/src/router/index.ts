import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Router from './enum';

console.log(Router.ROUTER)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: Router.ROUTER,
            name: Router.ROUTER,
            component: () => import('../views/router/Router.vue'),
            children: [
                // {
                //     path: Router.ROUTER,
                //     name: Router.ROUTER,
                //     component: () => import('../views/Router.vue'),
                // },
                {
                    path: Router.ROUTER_$id_ROUTER_SON,
                    name: Router.ROUTER_$id_ROUTER_SON,
                    component: () => import('../views/router/Router-son.vue'),
                    props: true, // 将动态路径参数作为 props 传递给组件
                }
            ]
        }
    ]
})

export default router
