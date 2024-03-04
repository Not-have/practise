import { ref, getCurrentInstance, unref, reactive, watchEffect, nextTick, toRaw, computed } from 'vue';
import { isProdMode } from '@/utils/env';
import { isFunction } from '@/utils/is';
import { tryOnUnmounted } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { error } from '@/utils/log';
const dataTransferRef = reactive({});
const openData = reactive({});
export function useDrawer() {
    if (!getCurrentInstance()) {
        throw new Error('useDrawer() can only be used inside setup() or functional components!');
    }
    const drawer = ref(null);
    const loaded = ref(false);
    const uid = ref(0);
    function register(drawerInstance, uuid) {
        isProdMode() &&
            tryOnUnmounted(() => {
                drawer.value = null;
                loaded.value = null;
                dataTransferRef[unref(uid)] = null;
            });
        if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
            return;
        }
        uid.value = uuid;
        drawer.value = drawerInstance;
        loaded.value = true;
        drawerInstance.emitOpen = (open, uid) => {
            openData[uid] = open;
        };
    }
    const getInstance = () => {
        const instance = unref(drawer);
        if (!instance) {
            error('useDrawer instance is undefined!');
        }
        return instance;
    };
    const methods = {
        setDrawerProps: (props) => {
            getInstance()?.setDrawerProps(props);
        },
        getOpen: computed(() => {
            return openData[~~unref(uid)];
        }),
        openDrawer: (open = true, data, openOnSet = true) => {
            getInstance()?.setDrawerProps({
                open
            });
            if (!data)
                return;
            if (openOnSet) {
                dataTransferRef[unref(uid)] = null;
                dataTransferRef[unref(uid)] = toRaw(data);
                return;
            }
            const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data));
            if (!equal) {
                dataTransferRef[unref(uid)] = toRaw(data);
            }
        },
        closeDrawer: () => {
            getInstance()?.setDrawerProps({ open: false });
        }
    };
    return [register, methods];
}
export const useDrawerInner = (callbackFn) => {
    const drawerInstanceRef = ref(null);
    const currentInstance = getCurrentInstance();
    const uidRef = ref(0);
    if (!getCurrentInstance()) {
        throw new Error('useDrawerInner() can only be used inside setup() or functional components!');
    }
    const getInstance = () => {
        const instance = unref(drawerInstanceRef);
        if (!instance) {
            error('useDrawerInner instance is undefined!');
            return;
        }
        return instance;
    };
    const register = (modalInstance, uuid) => {
        isProdMode() &&
            tryOnUnmounted(() => {
                drawerInstanceRef.value = null;
            });
        uidRef.value = uuid;
        drawerInstanceRef.value = modalInstance;
        currentInstance?.emit('register', modalInstance, uuid);
    };
    watchEffect(() => {
        const data = dataTransferRef[unref(uidRef)];
        if (!data)
            return;
        if (!callbackFn || !isFunction(callbackFn))
            return;
        nextTick(() => {
            callbackFn(data);
        });
    });
    return [
        register,
        {
            changeLoading: (loading = true) => {
                getInstance()?.setDrawerProps({ loading });
            },
            changeOkLoading: (loading = true) => {
                getInstance()?.setDrawerProps({ confirmLoading: loading });
            },
            getOpen: computed(() => {
                return openData[~~unref(uidRef)];
            }),
            closeDrawer: () => {
                getInstance()?.setDrawerProps({ open: false });
            },
            setDrawerProps: (props) => {
                getInstance()?.setDrawerProps(props);
            }
        }
    ];
};
