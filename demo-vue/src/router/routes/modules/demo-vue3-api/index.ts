import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const about: AppRouteModule = {
    path: '/demo-vue3-api',
    name: 'demo-vue3-api',
    component: LAYOUT,
    redirect: '/demo-vue3-api/app-conf',
    meta: {
        hideChildrenInMenu: true,
        icon: 'simple-icons:aboutdotme',
        title: 'vue3-api',
        orderNo: 100000
    },
    children: [
        {
            path: 'app-conf',
            name: 'app-conf',
            component: () => import('@/views/demo-vue3-api/app-config/index.vue'),
            meta: {
                title: 'app.config',
                icon: 'simple-icons:aboutdotme',
                hideMenu: true
            }
        }
    ]
};

export default about;
