import { defineStore } from 'pinia';
import { store } from '@/store';
import { useI18n } from '@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper';
import { transformRouteToMenu } from '@/router/helper/menuHelper';
import projectSetting from '@/settings/projectSetting';
import { PermissionModeEnum } from '@/enums/appEnum';
import { asyncRoutes } from '@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { filter } from '@/utils/helper/treeHelper';
import { getMenuList } from '@/api/sys/menu';
import { getPermCode } from '@/api/sys/user';
import { useMessage } from '@/hooks/web/useMessage';
import { PageEnum } from '@/enums/pageEnum';
export const usePermissionStore = defineStore({
    id: 'app-permission',
    state: () => ({
        permCodeList: [],
        isDynamicAddedRoute: false,
        lastBuildMenuTime: 0,
        backMenuList: [],
        frontMenuList: []
    }),
    getters: {
        getPermCodeList(state) {
            return state.permCodeList;
        },
        getBackMenuList(state) {
            return state.backMenuList;
        },
        getFrontMenuList(state) {
            return state.frontMenuList;
        },
        getLastBuildMenuTime(state) {
            return state.lastBuildMenuTime;
        },
        getIsDynamicAddedRoute(state) {
            return state.isDynamicAddedRoute;
        }
    },
    actions: {
        setPermCodeList(codeList) {
            this.permCodeList = codeList;
        },
        setBackMenuList(list) {
            this.backMenuList = list;
            list?.length > 0 && this.setLastBuildMenuTime();
        },
        setFrontMenuList(list) {
            this.frontMenuList = list;
        },
        setLastBuildMenuTime() {
            this.lastBuildMenuTime = new Date().getTime();
        },
        setDynamicAddedRoute(added) {
            this.isDynamicAddedRoute = added;
        },
        resetState() {
            this.isDynamicAddedRoute = false;
            this.permCodeList = [];
            this.backMenuList = [];
            this.lastBuildMenuTime = 0;
        },
        async changePermissionCode() {
            const codeList = await getPermCode();
            this.setPermCodeList(codeList);
        },
        async buildRoutesAction() {
            const { t } = useI18n();
            const userStore = useUserStore();
            const appStore = useAppStoreWithOut();
            let routes = [];
            const roleList = toRaw(userStore.getRoleList) || [];
            const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
            const routeFilter = (route) => {
                const { meta } = route;
                const { roles } = meta || {};
                if (!roles)
                    return true;
                return roleList.some(role => roles.includes(role));
            };
            const routeRemoveIgnoreFilter = (route) => {
                const { meta } = route;
                const { ignoreRoute } = meta || {};
                return !ignoreRoute;
            };
            const patchHomeAffix = (routes) => {
                if (!routes || routes.length === 0)
                    return;
                let homePath = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
                function patcher(routes, parentPath = '') {
                    if (parentPath)
                        parentPath = parentPath + '/';
                    routes.forEach((route) => {
                        const { path, children, redirect } = route;
                        const currentPath = path.startsWith('/') ? path : parentPath + path;
                        if (currentPath === homePath) {
                            if (redirect) {
                                homePath = route.redirect;
                            }
                            else {
                                route.meta = Object.assign({}, route.meta, { affix: true });
                                throw new Error('end');
                            }
                        }
                        children && children.length > 0 && patcher(children, currentPath);
                    });
                }
                try {
                    patcher(routes);
                }
                catch (e) {
                }
                return;
            };
            switch (permissionMode) {
                case PermissionModeEnum.ROLE:
                    routes = filter(asyncRoutes, routeFilter);
                    routes = routes.filter(routeFilter);
                    routes = flatMultiLevelRoutes(routes);
                    break;
                case PermissionModeEnum.ROUTE_MAPPING:
                    routes = filter(asyncRoutes, routeFilter);
                    routes = routes.filter(routeFilter);
                    const menuList = transformRouteToMenu(routes, true);
                    routes = filter(routes, routeRemoveIgnoreFilter);
                    routes = routes.filter(routeRemoveIgnoreFilter);
                    menuList.sort((a, b) => {
                        return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
                    });
                    this.setFrontMenuList(menuList);
                    routes = flatMultiLevelRoutes(routes);
                    break;
                case PermissionModeEnum.BACK:
                    const { createMessage } = useMessage();
                    createMessage.loading({
                        content: t('sys.app.menuLoading'),
                        duration: 1
                    });
                    let routeList = [];
                    try {
                        await this.changePermissionCode();
                        routeList = (await getMenuList());
                    }
                    catch (error) {
                        console.error(error);
                    }
                    routeList = transformObjToRoute(routeList);
                    const backMenuList = transformRouteToMenu(routeList);
                    this.setBackMenuList(backMenuList);
                    routeList = filter(routeList, routeRemoveIgnoreFilter);
                    routeList = routeList.filter(routeRemoveIgnoreFilter);
                    routeList = flatMultiLevelRoutes(routeList);
                    routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
                    break;
            }
            routes.push(ERROR_LOG_ROUTE);
            patchHomeAffix(routes);
            return routes;
        }
    }
});
export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
