import { ref, onUnmounted, unref, getCurrentInstance, reactive, watchEffect, nextTick, toRaw, computed } from 'vue';
import { isProdMode } from '@/utils/env';
import { isFunction } from '@/utils/is';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';
import { error } from '@/utils/log';
const dataTransfer = reactive({});
const openData = reactive({});
export function useModal() {
    const modal = ref(null);
    const loaded = ref(false);
    const uid = ref(0);
    function register(modalMethod, uuid) {
        if (!getCurrentInstance()) {
            throw new Error('useModal() can only be used inside setup() or functional components!');
        }
        uid.value = uuid;
        isProdMode() &&
            onUnmounted(() => {
                modal.value = null;
                loaded.value = false;
                dataTransfer[String(unref(uid))] = null;
            });
        if (unref(loaded) && isProdMode() && modalMethod === unref(modal))
            return;
        modal.value = modalMethod;
        loaded.value = true;
        modalMethod.emitOpen = (open, uid) => {
            openData[uid] = open;
        };
    }
    const getInstance = () => {
        const instance = unref(modal);
        if (!instance) {
            error('useModal instance is undefined!');
        }
        return instance;
    };
    const methods = {
        setModalProps: (props) => {
            getInstance()?.setModalProps(props);
        },
        getOpen: computed(() => {
            return openData[~~unref(uid)];
        }),
        redoModalHeight: () => {
            getInstance()?.redoModalHeight?.();
        },
        openModal: (open = true, data, openOnSet = true) => {
            getInstance()?.setModalProps({
                open
            });
            if (!data)
                return;
            const id = unref(uid);
            if (openOnSet) {
                dataTransfer[id] = null;
                dataTransfer[id] = toRaw(data);
                return;
            }
            const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
            if (!equal) {
                dataTransfer[id] = toRaw(data);
            }
        },
        closeModal: () => {
            getInstance()?.setModalProps({ open: false });
        }
    };
    return [register, methods];
}
export const useModalInner = (callbackFn) => {
    const modalInstanceRef = ref(null);
    const currentInstance = getCurrentInstance();
    const uidRef = ref(0);
    const getInstance = () => {
        const instance = unref(modalInstanceRef);
        if (!instance) {
            error('useModalInner instance is undefined!');
        }
        return instance;
    };
    const register = (modalInstance, uuid) => {
        isProdMode() &&
            tryOnUnmounted(() => {
                modalInstanceRef.value = null;
            });
        uidRef.value = uuid;
        modalInstanceRef.value = modalInstance;
        currentInstance?.emit('register', modalInstance, uuid);
    };
    watchEffect(() => {
        const data = dataTransfer[unref(uidRef)];
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
                getInstance()?.setModalProps({ loading });
            },
            getOpen: computed(() => {
                return openData[~~unref(uidRef)];
            }),
            changeOkLoading: (loading = true) => {
                getInstance()?.setModalProps({ confirmLoading: loading });
            },
            closeModal: () => {
                getInstance()?.setModalProps({ open: false });
            },
            setModalProps: (props) => {
                getInstance()?.setModalProps(props);
            },
            redoModalHeight: () => {
                const callRedo = getInstance()?.redoModalHeight;
                callRedo && callRedo();
            }
        }
    ];
};
