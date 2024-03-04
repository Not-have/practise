import { usePermissionStoreWithOut } from '@/store/modules/permission';
import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { RootRoute } from '@/router/routes';
const LOGIN_PATH = PageEnum.BASE_LOGIN;
const ROOT_PATH = RootRoute.path;
const whitePathList = [LOGIN_PATH];
export function createPermissionGuard(router) {
    const userStore = useUserStoreWithOut();
    const permissionStore = usePermissionStoreWithOut();
    router.beforeEach(async (to, from, next) => {
        if (from.path === ROOT_PATH &&
            to.path === PageEnum.BASE_HOME &&
            userStore.getUserInfo.homePath &&
            userStore.getUserInfo.homePath !== PageEnum.BASE_HOME) {
            next(userStore.getUserInfo.homePath);
            return;
        }
        let token = userStore.getToken;
        token = '给了一个 token 的固定值，让其一直保持登录状态。';
        if (whitePathList.includes(to.path)) {
            if (to.path === LOGIN_PATH && token) {
                const isSessionTimeout = userStore.getSessionTimeout;
                try {
                    await userStore.afterLoginAction();
                    if (!isSessionTimeout) {
                        next(decodeURIComponent(to.query?.redirect || '/'));
                        return;
                    }
                }
                catch {
                }
            }
            next();
            return;
        }
        if (!token) {
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            const redirectData = {
                path: LOGIN_PATH,
                replace: true
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path
                };
            }
            next(redirectData);
            return;
        }
        if (userStore.getLastUpdateTime === 0) {
            try {
                await userStore.getUserInfoAction();
            }
            catch (err) {
                next();
                return;
            }
        }
        if (!permissionStore.getIsDynamicAddedRoute) {
            const routes = await permissionStore.buildRoutesAction();
            [...routes, PAGE_NOT_FOUND_ROUTE].forEach(route => {
                router.addRoute(route);
            });
            permissionStore.setDynamicAddedRoute(true);
            next({ path: to.fullPath, replace: true, query: to.query });
            return;
        }
        if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
            from.query.redirect = '';
            if (from.path === LOGIN_PATH &&
                to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)) {
                next({ path: userStore.getUserInfo.homePath || PageEnum.BASE_HOME, replace: true });
            }
            else {
                next();
            }
        }
        else if (from.query.redirect) {
            const redirect = decodeURIComponent(from.query.redirect || '');
            if (redirect === to.fullPath) {
                next();
            }
            else {
                next({ path: redirect, replace: true });
            }
        }
        else {
            next();
        }
    });
}
