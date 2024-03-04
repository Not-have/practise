import { defineStore } from 'pinia';
import { store } from '@/store';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import { localeSetting } from '@/settings/localeSetting';
const ls = createLocalStorage();
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting);
export const useLocaleStore = defineStore({
    id: 'app-locale',
    state: () => ({
        localInfo: lsLocaleSetting
    }),
    getters: {
        getShowPicker(state) {
            return !!state.localInfo?.showPicker;
        },
        getLocale(state) {
            return state.localInfo?.locale ?? 'zh_CN';
        }
    },
    actions: {
        setLocaleInfo(info) {
            this.localInfo = { ...this.localInfo, ...info };
            ls.set(LOCALE_KEY, this.localInfo);
        },
        initLocale() {
            this.setLocaleInfo({
                ...localeSetting,
                ...this.localInfo
            });
        }
    }
});
export function useLocaleStoreWithOut() {
    return useLocaleStore(store);
}
