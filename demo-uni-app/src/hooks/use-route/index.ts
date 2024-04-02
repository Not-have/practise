import type { IReturns } from './types';
export default function useRoute(): () => IReturns {
    return function () {
        try {
            const routes: any = getCurrentPages(); // 获取当前打开过的页面路由数组
            const query = routes[routes.length - 1].options;
            const location = routes[routes.length - 1].route;
            const referrer = routes[routes.length - 2].route;

            return {
                query,
                location,
                referrer
            };
        } catch (e) {
            throw new Error('获取信息路哟信息错误：' + e);
        }
    };
}
