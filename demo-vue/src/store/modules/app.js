import { defineStore } from 'pinia';
import { store } from '@/store';
import { APP_DARK_MODE_KEY, PROJ_CFG_KEY, API_ADDRESS } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
import { darkMode } from '@/settings/designSetting';
import { resetRouter } from '@/router';
import { deepMerge } from '@/utils';
let timeId;
export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        darkMode: undefined,
        pageLoading: false,
        projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
        beforeMiniInfo: {}
    }),
    getters: {
        getPageLoading(state) {
            return state.pageLoading;
        },
        getDarkMode(state) {
            return state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode;
        },
        getBeforeMiniInfo(state) {
            return state.beforeMiniInfo;
        },
        getProjectConfig(state) {
            return state.projectConfig || {};
        },
        getHeaderSetting() {
            return this.getProjectConfig.headerSetting;
        },
        getMenuSetting() {
            return this.getProjectConfig.menuSetting;
        },
        getTransitionSetting() {
            return this.getProjectConfig.transitionSetting;
        },
        getMultiTabsSetting() {
            return this.getProjectConfig.multiTabsSetting;
        },
        getApiAddress() {
            return JSON.parse(localStorage.getItem(API_ADDRESS) || '{}');
        }
    },
    actions: {
        setPageLoading(loading) {
            this.pageLoading = loading;
        },
        setDarkMode(mode) {
            this.darkMode = mode;
            localStorage.setItem(APP_DARK_MODE_KEY, mode);
        },
        setBeforeMiniInfo(state) {
            this.beforeMiniInfo = state;
        },
        setProjectConfig(config) {
            this.projectConfig = deepMerge(this.projectConfig || {}, config);
            Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },
        setMenuSetting(setting) {
            this.projectConfig.menuSetting = deepMerge(this.projectConfig.menuSetting, setting);
            Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },
        async resetAllState() {
            resetRouter();
            Persistent.clearAll();
        },
        async setPageLoadingAction(loading) {
            if (loading) {
                clearTimeout(timeId);
                timeId = setTimeout(() => {
                    this.setPageLoading(loading);
                }, 50);
            }
            else {
                this.setPageLoading(loading);
                clearTimeout(timeId);
            }
        },
        setApiAddress(config) {
            localStorage.setItem(API_ADDRESS, JSON.stringify(config));
        }
    }
});
export function useAppStoreWithOut() {
    return useAppStore(store);
}
