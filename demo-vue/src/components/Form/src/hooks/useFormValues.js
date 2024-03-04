import { isArray, isFunction, isEmpty, isObject, isString, isNil } from '@/utils/is';
import { dateUtil } from '@/utils/dateUtil';
import { unref } from 'vue';
import { cloneDeep, get, set, unset } from 'lodash-es';
function tryDeconstructArray(key, value, target) {
    const pattern = /^\[(.+)\]$/;
    if (pattern.test(key)) {
        const match = key.match(pattern);
        if (match && match[1]) {
            const keys = match[1].split(',');
            value = Array.isArray(value) ? value : [value];
            keys.forEach((k, index) => {
                set(target, k.trim(), value[index]);
            });
            return true;
        }
    }
}
function tryDeconstructObject(key, value, target) {
    const pattern = /^\{(.+)\}$/;
    if (pattern.test(key)) {
        const match = key.match(pattern);
        if (match && match[1]) {
            const keys = match[1].split(',');
            value = isObject(value) ? value : {};
            keys.forEach(k => {
                set(target, k.trim(), value[k.trim()]);
            });
            return true;
        }
    }
}
export function useFormValues({ defaultValueRef, getSchema, formModel, getProps }) {
    function handleFormValues(values) {
        if (!isObject(values)) {
            return {};
        }
        const res = {};
        for (const item of Object.entries(values)) {
            let [, value] = item;
            const [key] = item;
            if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
                continue;
            }
            const transformDateFunc = unref(getProps).transformDateFunc;
            if (isObject(value)) {
                value = transformDateFunc?.(value);
            }
            if (isArray(value) && value[0]?.format && value[1]?.format) {
                value = value.map(item => transformDateFunc?.(item));
            }
            if (isString(value)) {
                value = value.trim();
            }
            if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
                set(res, key, value);
            }
        }
        return handleRangeTimeValue(res);
    }
    function handleRangeTimeValue(values) {
        const fieldMapToTime = unref(getProps).fieldMapToTime;
        if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
            return values;
        }
        for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
            if (!field || !startTimeKey || !endTimeKey) {
                continue;
            }
            if (!get(values, field)) {
                unset(values, field);
                continue;
            }
            const [startTime, endTime] = get(values, field);
            const [startTimeFormat, endTimeFormat] = Array.isArray(format)
                ? format
                : [format, format];
            if (!isNil(startTime) && !isEmpty(startTime)) {
                set(values, startTimeKey, formatTime(startTime, startTimeFormat));
            }
            if (!isNil(endTime) && !isEmpty(endTime)) {
                set(values, endTimeKey, formatTime(endTime, endTimeFormat));
            }
            unset(values, field);
        }
        return values;
    }
    function formatTime(time, format) {
        if (format === 'timestamp') {
            return dateUtil(time).unix();
        }
        else if (format === 'timestampStartDay') {
            return dateUtil(time).startOf('day').unix();
        }
        return dateUtil(time).format(format);
    }
    function initDefault() {
        const schemas = unref(getSchema);
        const obj = {};
        schemas.forEach(item => {
            const { defaultValue, defaultValueObj } = item;
            const fieldKeys = Object.keys(defaultValueObj || {});
            if (fieldKeys.length) {
                fieldKeys.map(field => {
                    obj[field] = defaultValueObj[field];
                    if (formModel[field] === undefined) {
                        formModel[field] = defaultValueObj[field];
                    }
                });
            }
            if (!isNil(defaultValue)) {
                obj[item.field] = defaultValue;
                if (formModel[item.field] === undefined) {
                    formModel[item.field] = defaultValue;
                }
            }
        });
        defaultValueRef.value = cloneDeep(obj);
    }
    return { handleFormValues, initDefault };
}
