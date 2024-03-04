import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
const WHITE_NAME_LIST = [];
const getRouteNames = (array) => array.forEach(item => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
});
getRouteNames(basicRoutes);
export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: basicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
});
export function resetRouter() {
    router.getRoutes().forEach(route => {
        const { name } = route;
        if (name && !WHITE_NAME_LIST.includes(name)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}
export function setupRouter(app) {
    app.use(router);
}
