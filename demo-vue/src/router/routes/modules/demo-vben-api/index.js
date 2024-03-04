import { LAYOUT } from '@/router/constant';
const dashboard = {
    path: '/demo-vben-api',
    name: 'demo-vben-api',
    component: LAYOUT,
    redirect: '/demo-vben-api/hooks',
    meta: {
        orderNo: 10,
        icon: 'ant-design:api-outlined',
        title: 'vben 内部 API demo'
    },
    children: [
        {
            path: 'hooks',
            name: 'hooks',
            component: () => import('@/views/demo-vben-api/hooks/index.vue'),
            meta: {
                title: 'hooks'
            }
        }
    ]
};
export default dashboard;
