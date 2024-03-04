import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { useGo, useRedo } from '@/hooks/web/usePage';
import { Persistent } from '@/utils/cache/persistent';
import { PageEnum } from '@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';
import { getRawRoute } from '@/utils';
import { MULTIPLE_TABS_KEY } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { useUserStore } from '@/store/modules/user';
function handleGotoPage(router) {
    const go = useGo(router);
    go(unref(router.currentRoute).fullPath, true);
}
const getToTarget = (tabItem) => {
    const { params, path, query } = tabItem;
    return {
        params: params || {},
        path,
        query: query || {}
    };
};
const cacheTab = projectSetting.multiTabsSetting.cache;
export const useMultipleTabStore = defineStore({
    id: 'app-multiple-tab',
    state: () => ({
        cacheTabList: new Set(),
        tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
        lastDragEndIndex: 0
    }),
    getters: {
        getTabList(state) {
            return state.tabList;
        },
        getCachedTabList(state) {
            return Array.from(state.cacheTabList);
        },
        getLastDragEndIndex(state) {
            return state.lastDragEndIndex;
        }
    },
    actions: {
        async updateCacheTab() {
            const cacheMap = new Set();
            for (const tab of this.tabList) {
                const item = getRawRoute(tab);
                const needCache = !item.meta?.ignoreKeepAlive;
                if (!needCache) {
                    continue;
                }
                const name = item.name;
                cacheMap.add(name);
            }
            this.cacheTabList = cacheMap;
        },
        async refreshPage(router) {
            const { currentRoute } = router;
            const route = unref(currentRoute);
            const name = route.name;
            const findTab = this.getCachedTabList.find(item => item === name);
            if (findTab) {
                this.cacheTabList.delete(findTab);
            }
            const redo = useRedo(router);
            await redo();
        },
        clearCacheTabs() {
            this.cacheTabList = new Set();
        },
        resetState() {
            this.tabList = [];
            this.clearCacheTabs();
        },
        goToPage(router) {
            const go = useGo(router);
            const len = this.tabList.length;
            const { path } = unref(router.currentRoute);
            let toPath = PageEnum.BASE_HOME;
            if (len > 0) {
                const page = this.tabList[len - 1];
                const p = page.fullPath || page.path;
                if (p) {
                    toPath = p;
                }
            }
            path !== toPath && go(toPath, true);
        },
        async addTab(route) {
            const { path, name, fullPath, params, query, meta } = getRawRoute(route);
            if (path === PageEnum.ERROR_PAGE ||
                path === PageEnum.BASE_LOGIN ||
                !name ||
                [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)) {
                return;
            }
            let updateIndex = -1;
            const tabHasExits = this.tabList.some((tab, index) => {
                updateIndex = index;
                return (tab.fullPath || tab.path) === (fullPath || path);
            });
            if (tabHasExits) {
                const curTab = toRaw(this.tabList)[updateIndex];
                if (!curTab) {
                    return;
                }
                curTab.params = params || curTab.params;
                curTab.query = query || curTab.query;
                curTab.fullPath = fullPath || curTab.fullPath;
                this.tabList.splice(updateIndex, 1, curTab);
            }
            else {
                const dynamicLevel = meta?.dynamicLevel ?? -1;
                if (dynamicLevel > 0) {
                    const realPath = meta?.realPath ?? '';
                    if (this.tabList.filter(e => e.meta?.realPath ?? '' === realPath).length >=
                        dynamicLevel) {
                        const index = this.tabList.findIndex(item => item.meta.realPath === realPath);
                        index !== -1 && this.tabList.splice(index, 1);
                    }
                }
                this.tabList.push(route);
            }
            this.updateCacheTab();
            cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
        },
        async closeTab(tab, router) {
            const close = (route) => {
                const { fullPath, meta: { affix } = {} } = route;
                if (affix) {
                    return;
                }
                const index = this.tabList.findIndex(item => item.fullPath === fullPath);
                index !== -1 && this.tabList.splice(index, 1);
            };
            const { currentRoute, replace } = router;
            const { path } = unref(currentRoute);
            if (path !== tab.path) {
                close(tab);
                this.updateCacheTab();
                return;
            }
            let toTarget = {};
            const index = this.tabList.findIndex(item => item.path === path);
            if (index === 0) {
                if (this.tabList.length === 1) {
                    const userStore = useUserStore();
                    toTarget = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
                }
                else {
                    const page = this.tabList[index + 1];
                    toTarget = getToTarget(page);
                }
            }
            else {
                const page = this.tabList[index - 1];
                toTarget = getToTarget(page);
            }
            close(currentRoute.value);
            await replace(toTarget);
        },
        async closeTabByKey(key, router) {
            const index = this.tabList.findIndex(item => (item.fullPath || item.path) === key);
            if (index !== -1) {
                await this.closeTab(this.tabList[index], router);
                const { currentRoute, replace } = router;
                const isActivated = this.tabList.findIndex(item => {
                    return item.fullPath === currentRoute.value.fullPath;
                });
                if (isActivated === -1) {
                    let pageIndex;
                    if (index > 0) {
                        pageIndex = index - 1;
                    }
                    else if (index < this.tabList.length - 1) {
                        pageIndex = index + 1;
                    }
                    else {
                        pageIndex = -1;
                    }
                    if (pageIndex >= 0) {
                        const page = this.tabList[index - 1];
                        const toTarget = getToTarget(page);
                        await replace(toTarget);
                    }
                }
            }
        },
        async sortTabs(oldIndex, newIndex) {
            const currentTab = this.tabList[oldIndex];
            this.tabList.splice(oldIndex, 1);
            this.tabList.splice(newIndex, 0, currentTab);
            this.lastDragEndIndex = this.lastDragEndIndex + 1;
        },
        async closeLeftTabs(route, router) {
            const index = this.tabList.findIndex(item => item.path === route.path);
            if (index > 0) {
                const leftTabs = this.tabList.slice(0, index);
                const pathList = [];
                for (const item of leftTabs) {
                    const affix = item?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(item.fullPath);
                    }
                }
                this.bulkCloseTabs(pathList);
            }
            this.updateCacheTab();
            handleGotoPage(router);
        },
        async closeRightTabs(route, router) {
            const index = this.tabList.findIndex(item => item.fullPath === route.fullPath);
            if (index >= 0 && index < this.tabList.length - 1) {
                const rightTabs = this.tabList.slice(index + 1, this.tabList.length);
                const pathList = [];
                for (const item of rightTabs) {
                    const affix = item?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(item.fullPath);
                    }
                }
                this.bulkCloseTabs(pathList);
            }
            this.updateCacheTab();
            handleGotoPage(router);
        },
        async closeAllTab(router) {
            this.tabList = this.tabList.filter(item => item?.meta?.affix ?? false);
            this.clearCacheTabs();
            this.goToPage(router);
        },
        async closeOtherTabs(route, router) {
            const closePathList = this.tabList.map(item => item.fullPath);
            const pathList = [];
            for (const path of closePathList) {
                if (path !== route.fullPath) {
                    const closeItem = this.tabList.find(item => item.fullPath === path);
                    if (!closeItem) {
                        continue;
                    }
                    const affix = closeItem?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(closeItem.fullPath);
                    }
                }
            }
            this.bulkCloseTabs(pathList);
            this.updateCacheTab();
            Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList, true);
            handleGotoPage(router);
        },
        async bulkCloseTabs(pathList) {
            this.tabList = this.tabList.filter(item => !pathList.includes(item.fullPath));
        },
        async setTabTitle(title, route) {
            const findTab = this.getTabList.find(item => item === route);
            if (findTab) {
                findTab.meta.title = title;
                await this.updateCacheTab();
            }
        },
        async updateTabPath(fullPath, route) {
            const findTab = this.getTabList.find(item => item === route);
            if (findTab) {
                findTab.fullPath = fullPath;
                findTab.path = fullPath;
                await this.updateCacheTab();
            }
        }
    }
});
export function useMultipleTabWithOutStore() {
    return useMultipleTabStore(store);
}
