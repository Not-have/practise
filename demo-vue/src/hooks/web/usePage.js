import { PageEnum } from '@/enums/pageEnum';
import { unref } from 'vue';
import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '@/router/constant';
import { isHttpUrl } from '@/utils/is';
import { openWindow } from '@/utils';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
function handleError(e) {
    console.error(e);
}
export var GoType;
(function (GoType) {
    GoType[GoType["replace"] = 0] = "replace";
    GoType[GoType["after"] = 1] = "after";
})(GoType || (GoType = {}));
export function useGo(_router) {
    const { push, replace, currentRoute } = _router || useRouter();
    function go(opt = PageEnum.BASE_HOME, goTypeOrIsReplace = false) {
        if (!opt) {
            return;
        }
        let path = unref(opt);
        if (path[0] === '/') {
            path = path.slice(1);
        }
        if (isHttpUrl(path)) {
            return openWindow(path);
        }
        const isReplace = goTypeOrIsReplace === true || goTypeOrIsReplace === GoType.replace;
        const isAfter = goTypeOrIsReplace === GoType.after;
        if (isReplace) {
            replace(opt).catch(handleError);
        }
        else if (isAfter) {
            const tabStore = useMultipleTabStore();
            const currentName = unref(currentRoute).name;
            const currentIndex = tabStore.getTabList.findIndex(item => item.name === currentName);
            const currentCount = tabStore.getTabList.length;
            push(opt)
                .then(() => {
                if (tabStore.getTabList.length > currentCount) {
                    const targetIndex = tabStore.getTabList.length - 1;
                    if (currentIndex > -1 && targetIndex > currentIndex) {
                        tabStore.sortTabs(targetIndex, currentIndex + 1);
                    }
                }
            })
                .catch(handleError);
        }
        else {
            push(opt).catch(handleError);
        }
    }
    return go;
}
export const useRedo = (_router) => {
    const { replace, currentRoute } = _router || useRouter();
    const { query, params = {}, name, fullPath } = unref(currentRoute.value);
    function redo() {
        return new Promise(resolve => {
            if (name === REDIRECT_NAME) {
                resolve(false);
                return;
            }
            if (name && Object.keys(params).length > 0) {
                params['_origin_params'] = JSON.stringify(params ?? {});
                params['_redirect_type'] = 'name';
                params['path'] = String(name);
            }
            else {
                params['_redirect_type'] = 'path';
                params['path'] = fullPath;
            }
            replace({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
        });
    }
    return redo;
};
