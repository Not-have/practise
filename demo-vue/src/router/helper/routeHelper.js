import { getParentLayout, LAYOUT, EXCEPTION_COMPONENT } from '@/router/constant';
import { cloneDeep, omit } from 'lodash-es';
import { warn } from '@/utils/log';
import { createRouter, createWebHashHistory } from 'vue-router';
const IFRAME = () => import('@/views/sys/iframe/FrameBlank.vue');
const LayoutMap = new Map();
LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('IFRAME', IFRAME);
let dynamicViewsModules;
function asyncImportRoute(routes) {
    dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
    if (!routes)
        return;
    routes.forEach(item => {
        if (!item.component && item.meta?.frameSrc) {
            item.component = 'IFRAME';
        }
        const { component, name } = item;
        const { children } = item;
        if (component) {
            const layoutFound = LayoutMap.get(component.toUpperCase());
            if (layoutFound) {
                item.component = layoutFound;
            }
            else {
                item.component = dynamicImport(dynamicViewsModules, component);
            }
        }
        else if (name) {
            item.component = getParentLayout();
        }
        children && asyncImportRoute(children);
    });
}
function dynamicImport(dynamicViewsModules, component) {
    const keys = Object.keys(dynamicViewsModules);
    const matchKeys = keys.filter(key => {
        const k = key.replace('../../views', '');
        const startFlag = component.startsWith('/');
        const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
        const startIndex = startFlag ? 0 : 1;
        const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
        return k.substring(startIndex, lastIndex) === component;
    });
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0];
        return dynamicViewsModules[matchKey];
    }
    else if (matchKeys?.length > 1) {
        warn('Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure');
        return;
    }
    else {
        warn('在src/views/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!');
        return EXCEPTION_COMPONENT;
    }
}
export function transformObjToRoute(routeList) {
    routeList.forEach(route => {
        const component = route.component;
        if (component) {
            if (component.toUpperCase() === 'LAYOUT') {
                route.component = LayoutMap.get(component.toUpperCase());
            }
            else {
                route.children = [cloneDeep(route)];
                route.component = LAYOUT;
                if (!route.name) {
                    warn('找不到菜单对应的name, 请检查数据!' + JSON.stringify(route));
                }
                route.name = `${route.name}Parent`;
                route.path = '';
                const meta = route.meta || {};
                meta.single = true;
                meta.affix = false;
                route.meta = meta;
            }
        }
        else {
            warn('请正确配置路由：' + route?.name + '的component属性');
        }
        route.children && asyncImportRoute(route.children);
    });
    return routeList;
}
export function flatMultiLevelRoutes(routeModules) {
    const modules = cloneDeep(routeModules);
    for (let index = 0; index < modules.length; index++) {
        const routeModule = modules[index];
        if (!isMultipleRoute(routeModule)) {
            continue;
        }
        promoteRouteLevel(routeModule);
    }
    return modules;
}
function promoteRouteLevel(routeModule) {
    let router = createRouter({
        routes: [routeModule],
        history: createWebHashHistory()
    });
    const routes = router.getRoutes();
    addToChildren(routes, routeModule.children || [], routeModule);
    router = null;
    routeModule.children = routeModule.children?.map(item => omit(item, 'children'));
}
function addToChildren(routes, children, routeModule) {
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        const route = routes.find(item => item.name === child.name);
        if (!route) {
            continue;
        }
        routeModule.children = routeModule.children || [];
        if (!routeModule.children.find(item => item.name === route.name)) {
            routeModule.children?.push(route);
        }
        if (child.children?.length) {
            addToChildren(routes, child.children, routeModule);
        }
    }
}
function isMultipleRoute(routeModule) {
    if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
        return false;
    }
    const children = routeModule.children;
    let flag = false;
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.children?.length) {
            flag = true;
            break;
        }
    }
    return flag;
}
