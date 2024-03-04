import { getCurrentInstance, shallowReactive, computed, unref, watch } from 'vue';
import { isBoolean, isFunction, isNumber, isObject } from '@/utils/is';
import { useBreakpoint } from '@/hooks/event/useBreakpoint';
import { useDebounceFn } from '@vueuse/core';
const BASIC_COL_LEN = 24;
export default function ({ advanceState, emit, getProps, getSchema, formModel, defaultValueRef }) {
    const vm = getCurrentInstance();
    const { realWidthRef, screenEnum, screenRef } = useBreakpoint();
    const getEmptySpan = computed(() => {
        if (!advanceState.isAdvanced) {
            return 0;
        }
        const emptySpan = unref(getProps).emptySpan || 0;
        if (isNumber(emptySpan)) {
            return emptySpan;
        }
        if (isObject(emptySpan)) {
            const { span = 0 } = emptySpan;
            const screen = unref(screenRef);
            const screenSpan = emptySpan[screen.toLowerCase()];
            return screenSpan || span || 0;
        }
        return 0;
    });
    const debounceUpdateAdvanced = useDebounceFn(updateAdvanced, 30);
    watch([() => unref(getSchema), () => advanceState.isAdvanced, () => unref(realWidthRef)], () => {
        const { showAdvancedButton } = unref(getProps);
        if (showAdvancedButton) {
            debounceUpdateAdvanced();
        }
    }, { immediate: true });
    function getAdvanced(itemCol, itemColSum = 0, isLastAction = false) {
        const width = unref(realWidthRef);
        const mdWidth = parseInt(itemCol.md) ||
            parseInt(itemCol.xs) ||
            parseInt(itemCol.sm) ||
            itemCol.span ||
            BASIC_COL_LEN;
        const lgWidth = parseInt(itemCol.lg) || mdWidth;
        const xlWidth = parseInt(itemCol.xl) || lgWidth;
        const xxlWidth = parseInt(itemCol.xxl) || xlWidth;
        if (width <= screenEnum.LG) {
            itemColSum += mdWidth;
        }
        else if (width < screenEnum.XL) {
            itemColSum += lgWidth;
        }
        else if (width < screenEnum.XXL) {
            itemColSum += xlWidth;
        }
        else {
            itemColSum += xxlWidth;
        }
        if (isLastAction) {
            advanceState.hideAdvanceBtn = false;
            if (itemColSum <= BASIC_COL_LEN * 2) {
                advanceState.hideAdvanceBtn = true;
                advanceState.isAdvanced = true;
            }
            else if (itemColSum > BASIC_COL_LEN * 2 &&
                itemColSum <= BASIC_COL_LEN * (unref(getProps).autoAdvancedLine || 3)) {
                advanceState.hideAdvanceBtn = false;
            }
            else if (!advanceState.isLoad) {
                advanceState.isLoad = true;
                advanceState.isAdvanced = !advanceState.isAdvanced;
            }
            return { isAdvanced: advanceState.isAdvanced, itemColSum };
        }
        if (itemColSum > BASIC_COL_LEN * (unref(getProps).alwaysShowLines || 1)) {
            return { isAdvanced: advanceState.isAdvanced, itemColSum };
        }
        else {
            return { isAdvanced: true, itemColSum };
        }
    }
    const fieldsIsAdvancedMap = shallowReactive({});
    function updateAdvanced() {
        let itemColSum = 0;
        let realItemColSum = 0;
        const { baseColProps = {} } = unref(getProps);
        for (const schema of unref(getSchema)) {
            const { show, colProps } = schema;
            let isShow = true;
            if (isBoolean(show)) {
                isShow = show;
            }
            if (isFunction(show)) {
                isShow = show({
                    schema: schema,
                    model: formModel,
                    field: schema.field,
                    values: {
                        ...unref(defaultValueRef),
                        ...formModel
                    }
                });
            }
            if (isShow && (colProps || baseColProps)) {
                const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum);
                itemColSum = sum || 0;
                if (isAdvanced) {
                    realItemColSum = itemColSum;
                }
                fieldsIsAdvancedMap[schema.field] = isAdvanced;
            }
        }
        vm?.proxy?.$forceUpdate();
        advanceState.actionSpan = (realItemColSum % BASIC_COL_LEN) + unref(getEmptySpan);
        getAdvanced(unref(getProps).actionColOptions || { span: BASIC_COL_LEN }, itemColSum, true);
        emit('advanced-change');
    }
    function handleToggleAdvanced() {
        advanceState.isAdvanced = !advanceState.isAdvanced;
    }
    return { handleToggleAdvanced, fieldsIsAdvancedMap };
}
