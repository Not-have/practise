import { useAppStore } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore } from '@/store/modules/user';
import { useTabs } from './useTabs';
import { router, resetRouter } from '@/router';
import projectSetting from '@/settings/projectSetting';
import { PermissionModeEnum } from '@/enums/appEnum';
import { intersection } from 'lodash-es';
import { isArray } from '@/utils/is';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
export function usePermission() {
    const userStore = useUserStore();
    const appStore = useAppStore();
    const permissionStore = usePermissionStore();
    const { closeAll } = useTabs(router);
    async function togglePermissionMode() {
        appStore.setProjectConfig({
            permissionMode: appStore.projectConfig?.permissionMode === PermissionModeEnum.BACK
                ? PermissionModeEnum.ROUTE_MAPPING
                : PermissionModeEnum.BACK
        });
        location.reload();
    }
    async function resume() {
        const tabStore = useMultipleTabStore();
        tabStore.clearCacheTabs();
        resetRouter();
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach(route => {
            router.addRoute(route);
        });
        permissionStore.setLastBuildMenuTime();
        closeAll();
    }
    function hasPermission(value, def = true) {
        if (!value) {
            return def;
        }
        const permMode = appStore.getProjectConfig.permissionMode;
        if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
            if (!isArray(value)) {
                return userStore.getRoleList?.includes(value);
            }
            return intersection(value, userStore.getRoleList).length > 0;
        }
        if (PermissionModeEnum.BACK === permMode) {
            const allCodeList = permissionStore.getPermCodeList;
            if (!isArray(value)) {
                const splits = ['||', '&&'];
                const splitName = splits.find(item => value.includes(item));
                if (splitName) {
                    const splitCodes = value.split(splitName);
                    return splitName === splits[0]
                        ? intersection(splitCodes, allCodeList).length > 0
                        : intersection(splitCodes, allCodeList).length === splitCodes.length;
                }
                return allCodeList.includes(value);
            }
            return intersection(value, allCodeList).length > 0;
        }
        return true;
    }
    async function changeRole(roles) {
        if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
            throw new Error('Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!');
        }
        if (!isArray(roles)) {
            roles = [roles];
        }
        userStore.setRoleList(roles);
        await resume();
    }
    async function refreshMenu() {
        resume();
    }
    return { changeRole, hasPermission, togglePermissionMode, refreshMenu };
}
