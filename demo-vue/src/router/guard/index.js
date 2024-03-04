import { useAppStoreWithOut } from '@/store/modules/app';
import { useUserStoreWithOut } from '@/store/modules/user';
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
import { AxiosCanceler } from '@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
import { warn } from '@/utils/log';
import { unref } from 'vue';
import { setRouteChange } from '@/logics/mitt/routeChange';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import nProgress from 'nprogress';
import projectSetting from '@/settings/projectSetting';
import { createParamMenuGuard } from './paramMenuGuard';
export function setupRouterGuard(router) {
    createPageGuard(router);
    createPageLoadingGuard(router);
    createHttpGuard(router);
    createScrollGuard(router);
    createMessageGuard(router);
    createProgressGuard(router);
    createPermissionGuard(router);
    createParamMenuGuard(router);
    createStateGuard(router);
}
function createPageGuard(router) {
    const loadedPageMap = new Map();
    router.beforeEach(async (to) => {
        to.meta.loaded = !!loadedPageMap.get(to.path);
        setRouteChange(to);
        return true;
    });
    router.afterEach(to => {
        loadedPageMap.set(to.path, true);
    });
}
function createPageLoadingGuard(router) {
    const userStore = useUserStoreWithOut();
    const appStore = useAppStoreWithOut();
    const { getOpenPageLoading } = useTransitionSetting();
    router.beforeEach(async (to) => {
        if (!userStore.getToken) {
            return true;
        }
        if (to.meta.loaded) {
            return true;
        }
        if (unref(getOpenPageLoading)) {
            appStore.setPageLoadingAction(true);
            return true;
        }
        return true;
    });
    router.afterEach(async () => {
        if (unref(getOpenPageLoading)) {
            setTimeout(() => {
                appStore.setPageLoading(false);
            }, 220);
        }
        return true;
    });
}
function createHttpGuard(router) {
    const { removeAllHttpPending } = projectSetting;
    let axiosCanceler;
    if (removeAllHttpPending) {
        axiosCanceler = new AxiosCanceler();
    }
    router.beforeEach(async () => {
        axiosCanceler?.removeAllPending();
        return true;
    });
}
function createScrollGuard(router) {
    const isHash = (href) => {
        return /^#/.test(href);
    };
    router.afterEach(async (to) => {
        isHash(to?.href) &&
            document.querySelector('.vben-layout-content')?.scrollTo(0, 0);
        return true;
    });
}
export function createMessageGuard(router) {
    const { closeMessageOnSwitch } = projectSetting;
    router.beforeEach(async () => {
        try {
            if (closeMessageOnSwitch) {
                Modal.destroyAll();
                notification.destroy();
            }
        }
        catch (error) {
            warn('message guard error:' + error);
        }
        return true;
    });
}
export function createProgressGuard(router) {
    const { getOpenNProgress } = useTransitionSetting();
    router.beforeEach(async (to) => {
        if (to.meta.loaded) {
            return true;
        }
        unref(getOpenNProgress) && nProgress.start();
        return true;
    });
    router.afterEach(async () => {
        unref(getOpenNProgress) && nProgress.done();
        return true;
    });
}
