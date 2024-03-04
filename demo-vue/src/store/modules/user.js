import { defineStore } from 'pinia';
import { store } from '@/store';
import { PageEnum } from '@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { doLogout, getUserInfo, loginApi } from '@/api/sys/user';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { isArray } from '@/utils/is';
import { h } from 'vue';
export const useUserStore = defineStore({
    id: 'app-user',
    state: () => ({
        userInfo: null,
        token: undefined,
        roleList: [],
        sessionTimeout: false,
        lastUpdateTime: 0
    }),
    getters: {
        getUserInfo(state) {
            return state.userInfo || getAuthCache(USER_INFO_KEY) || {};
        },
        getToken(state) {
            return state.token || getAuthCache(TOKEN_KEY);
        },
        getRoleList(state) {
            return state.roleList.length > 0 ? state.roleList : getAuthCache(ROLES_KEY);
        },
        getSessionTimeout(state) {
            return !!state.sessionTimeout;
        },
        getLastUpdateTime(state) {
            return state.lastUpdateTime;
        }
    },
    actions: {
        setToken(info) {
            this.token = info ? info : '';
            setAuthCache(TOKEN_KEY, info);
        },
        setRoleList(roleList) {
            this.roleList = roleList;
            setAuthCache(ROLES_KEY, roleList);
        },
        setUserInfo(info) {
            this.userInfo = info;
            this.lastUpdateTime = new Date().getTime();
            setAuthCache(USER_INFO_KEY, info);
        },
        setSessionTimeout(flag) {
            this.sessionTimeout = flag;
        },
        resetState() {
            this.userInfo = null;
            this.token = '';
            this.roleList = [];
            this.sessionTimeout = false;
        },
        async login(params) {
            try {
                const { goHome = true, mode, ...loginParams } = params;
                const data = await loginApi(loginParams, mode);
                const { token } = data;
                this.setToken(token);
                return this.afterLoginAction(goHome);
            }
            catch (error) {
                return Promise.reject(error);
            }
        },
        async afterLoginAction(goHome) {
            if (!this.getToken)
                return null;
            const userInfo = await this.getUserInfoAction();
            const sessionTimeout = this.sessionTimeout;
            if (sessionTimeout) {
                this.setSessionTimeout(false);
            }
            else {
                const permissionStore = usePermissionStore();
                if (!permissionStore.isDynamicAddedRoute) {
                    const routes = await permissionStore.buildRoutesAction();
                    [...routes, PAGE_NOT_FOUND_ROUTE].forEach(route => {
                        router.addRoute(route);
                    });
                    permissionStore.setDynamicAddedRoute(true);
                }
                goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
            }
            return userInfo;
        },
        async getUserInfoAction() {
            if (!this.getToken)
                return null;
            const userInfo = await getUserInfo();
            const { roles = [] } = userInfo;
            if (isArray(roles)) {
                const roleList = roles.map(item => item.value);
                this.setRoleList(roleList);
            }
            else {
                userInfo.roles = [];
                this.setRoleList([]);
            }
            this.setUserInfo(userInfo);
            return userInfo;
        },
        async logout(goLogin = false) {
            if (this.getToken) {
                try {
                    await doLogout();
                }
                catch {
                    console.log('注销Token失败');
                }
            }
            this.setToken(undefined);
            this.setSessionTimeout(false);
            this.setUserInfo(null);
            if (goLogin) {
                router.replace(PageEnum.BASE_LOGIN);
            }
            else {
                router.replace({
                    path: PageEnum.BASE_LOGIN,
                    query: {
                        redirect: encodeURIComponent(router.currentRoute.value.fullPath)
                    }
                });
            }
        },
        confirmLoginOut() {
            const { createConfirm } = useMessage();
            const { t } = useI18n();
            createConfirm({
                iconType: 'warning',
                title: () => h('span', t('sys.app.logoutTip')),
                content: () => h('span', t('sys.app.logoutMessage')),
                onOk: async () => {
                    await this.logout(true);
                }
            });
        }
    }
});
export function useUserStoreWithOut() {
    return useUserStore(store);
}
