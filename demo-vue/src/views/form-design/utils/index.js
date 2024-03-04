import { cloneDeep, isArray, isFunction, isNumber, uniqueId } from 'lodash-es';
export function generateKey(formItem) {
    if (formItem && formItem.component) {
        const key = uniqueId(`${toLine(formItem.component)}_`);
        formItem.key = key;
        formItem.field = key;
        return true;
    }
    return uniqueId('key_');
}
export function remove(array, value) {
    let removeVal = [];
    if (!isArray(array))
        return undefined;
    if (isNumber(value)) {
        removeVal = array.splice(value, 1);
    }
    else {
        const index = array.findIndex(value);
        if (index !== -1) {
            removeVal = array.splice(index, 1);
        }
    }
    return removeVal.shift();
}
export function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
export function randomUUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
}
export function toLine(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
export function formItemsForEach(array, cb) {
    if (!isArray(array))
        return;
    const traverse = (schemas) => {
        schemas.forEach((formItem) => {
            if (['Grid'].includes(formItem.component)) {
                formItem.columns?.forEach(item => traverse(item.children));
            }
            else {
                cb(formItem);
            }
        });
    };
    traverse(array);
}
export const findFormItem = (schemas, cb) => {
    let res;
    const traverse = (schemas) => {
        return schemas.some((formItem) => {
            const { component: type } = formItem;
            if (['Grid'].includes(type)) {
                return formItem.columns?.some(item => traverse(item.children));
            }
            if (cb(formItem))
                res = formItem;
            return cb(formItem);
        });
    };
    traverse(schemas);
    return res;
};
export const removeAttrs = (formConfig) => {
    const copyFormConfig = cloneDeep(formConfig);
    delete copyFormConfig.currentItem;
    delete copyFormConfig.activeKey;
    copyFormConfig.schemas &&
        formItemsForEach(copyFormConfig.schemas, item => {
            delete item.icon;
            delete item.key;
        });
    return copyFormConfig;
};
export const handleAsyncOptions = async (options) => {
    try {
        if (isFunction(options))
            return await options();
        return options;
    }
    catch {
        return [];
    }
};
export const formatRules = (schemas) => {
    formItemsForEach(schemas, item => {
        if ('required' in item) {
            !isArray(item.rules) && (item.rules = []);
            item.rules.push({ required: true, message: item.message });
            delete item['required'];
            delete item['message'];
        }
    });
};
export const strToReg = (rules) => {
    const newRules = cloneDeep(rules);
    return newRules.map(item => {
        if (item.pattern)
            item.pattern = runCode(item.pattern);
        return item;
    });
};
export const runCode = (code) => {
    try {
        return new Function(`return ${code}`)();
    }
    catch {
        return code;
    }
};
