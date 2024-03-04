import { defineStore } from 'pinia';
import { TABLE_SETTING_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
export const useTableSettingStore = defineStore({
    id: 'table-setting',
    state: () => ({
        setting: Persistent.getLocal(TABLE_SETTING_KEY)
    }),
    getters: {
        getTableSetting(state) {
            return state.setting;
        },
        getTableSize(state) {
            return state.setting?.size || 'middle';
        },
        getShowIndexColumn(state) {
            return (routerName) => {
                return state.setting?.showIndexColumn?.[routerName];
            };
        },
        getShowRowSelection(state) {
            return (routerName) => {
                return state.setting?.showRowSelection?.[routerName];
            };
        },
        getColumns(state) {
            return (routerName) => {
                return state.setting?.columns && state.setting?.columns[routerName]
                    ? state.setting?.columns[routerName]
                    : null;
            };
        }
    },
    actions: {
        setTableSetting(setting) {
            this.setting = Object.assign({}, this.setting, setting);
            Persistent.setLocal(TABLE_SETTING_KEY, this.setting, true);
        },
        resetTableSetting() {
            Persistent.removeLocal(TABLE_SETTING_KEY, true);
            this.setting = null;
        },
        setTableSize(size) {
            this.setTableSetting(Object.assign({}, this.setting, {
                size
            }));
        },
        setShowIndexColumn(routerName, show) {
            this.setTableSetting(Object.assign({}, this.setting, {
                showIndexColumn: {
                    ...this.setting?.showIndexColumn,
                    [routerName]: show
                }
            }));
        },
        setShowRowSelection(routerName, show) {
            this.setTableSetting(Object.assign({}, this.setting, {
                showRowSelection: {
                    ...this.setting?.showRowSelection,
                    [routerName]: show
                }
            }));
        },
        setColumns(routerName, columns) {
            this.setTableSetting(Object.assign({}, this.setting, {
                columns: {
                    ...this.setting?.columns,
                    [routerName]: columns
                }
            }));
        },
        clearColumns(routerName) {
            this.setTableSetting(Object.assign({}, this.setting, {
                columns: {
                    ...this.setting?.columns,
                    [routerName]: undefined
                }
            }));
        }
    }
});
