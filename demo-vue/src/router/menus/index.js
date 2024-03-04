import { useAppStoreWithOut } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { transformMenuModule, getAllParentPath } from '@/router/helper/menuHelper';
import { filter } from '@/utils/helper/treeHelper';
import { isHttpUrl } from '@/utils/is';
import { router } from '@/router';
import { PermissionModeEnum } from '@/enums/appEnum';
import { pathToRegexp } from 'path-to-regexp';
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const menuModules = [];
Object.keys(modules).forEach(key => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
});
const getPermissionMode = () => {
    const appStore = useAppStoreWithOut();
    return appStore.getProjectConfig.permissionMode;
};
const isBackMode = () => {
    return getPermissionMode() === PermissionModeEnum.BACK;
};
const isRouteMappingMode = () => {
    return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};
const isRoleMode = () => {
    return getPermissionMode() === PermissionModeEnum.ROLE;
};
const staticMenus = [];
(() => {
    menuModules.sort((a, b) => {
        return (a.orderNo || 0) - (b.orderNo || 0);
    });
    for (const menu of menuModules) {
        staticMenus.push(transformMenuModule(menu));
    }
})();
async function getAsyncMenus() {
    const permissionStore = usePermissionStore();
    const menuFilter = items => {
        return items.filter(item => {
            const show = !item.meta?.hideMenu && !item.hideMenu;
            if (show && item.children) {
                item.children = menuFilter(item.children);
            }
            return show;
        });
    };
    if (isBackMode()) {
        return menuFilter(permissionStore.getBackMenuList);
    }
    if (isRouteMappingMode()) {
        return menuFilter(permissionStore.getFrontMenuList);
    }
    return staticMenus;
}
export const getMenus = async () => {
    const menus = await getAsyncMenus();
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return filter(menus, basicFilter(routes));
    }
    return menus;
};
export async function getCurrentParentPath(currentPath) {
    const menus = await getAsyncMenus();
    const allParentPath = await getAllParentPath(menus, currentPath);
    return allParentPath?.[0];
}
export async function getShallowMenus() {
    const menus = await getAsyncMenus();
    const shallowMenuList = menus.map(item => ({ ...item, children: undefined }));
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return shallowMenuList.filter(basicFilter(routes));
    }
    return shallowMenuList;
}
export async function getChildrenMenus(parentPath) {
    const menus = await getMenus();
    const parent = menus.find(item => item.path === parentPath);
    if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
        return [];
    }
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return filter(parent.children, basicFilter(routes));
    }
    return parent.children;
}
function basicFilter(routes) {
    return (menu) => {
        const matchRoute = routes.find(route => {
            if (isHttpUrl(menu.path))
                return true;
            if (route.meta?.carryParam) {
                return pathToRegexp(route.path).test(menu.path);
            }
            const isSame = route.path === menu.path;
            if (!isSame)
                return false;
            if (route.meta?.ignoreAuth)
                return true;
            return isSame || pathToRegexp(route.path).test(menu.path);
        });
        if (!matchRoute)
            return false;
        menu.icon = (menu.icon || matchRoute.meta.icon);
        menu.meta = matchRoute.meta;
        return true;
    };
}