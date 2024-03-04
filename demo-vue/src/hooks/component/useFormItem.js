import { reactive, readonly, computed, getCurrentInstance, watchEffect, unref, toRaw, nextTick } from 'vue';
import { isEqual } from 'lodash-es';
export function useRuleFormItem(props, key = 'value', changeEvent = 'change', emitData) {
    const instance = getCurrentInstance();
    const emit = instance?.emit;
    const innerState = reactive({
        value: props[key]
    });
    const defaultState = readonly(innerState);
    const setState = (val) => {
        innerState.value = val;
    };
    watchEffect(() => {
        innerState.value = props[key];
    });
    const state = computed({
        get() {
            return innerState.value;
        },
        set(value) {
            if (isEqual(value, defaultState.value))
                return;
            innerState.value = value;
            nextTick(() => {
                emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []));
            });
        }
    });
    return [state, setState, defaultState];
}
