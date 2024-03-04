import { findFormItem, formItemsForEach } from '../utils';
import { cloneDeep, isFunction } from 'lodash-es';
export function useVFormMethods(props, _context, formInstance, formInstanceMethods) {
    const get = field => findFormItem(props.formConfig.schemas, item => item.field === field);
    const set = (field, key, value) => {
        const formItem = get(field);
        if (formItem)
            formItem[key] = value;
    };
    const setProps = (field, key, value) => {
        const formItem = get(field);
        if (formItem?.componentProps) {
            ['options', 'treeData'].includes(key) && setValue(field, undefined);
            formItem.componentProps[key] = value;
        }
    };
    const setValue = (field, value) => {
        if (typeof field === 'string') {
            props.formModel[field] = value;
            formInstance.value?.validateField(field, value, []);
        }
        else {
            const keys = Object.keys(field);
            keys.forEach(key => {
                props.formModel[key] = field[key];
                formInstance.value?.validateField(key, field[key], []);
            });
        }
    };
    const setFormConfig = (key, value) => {
        props.formConfig[key] = value;
    };
    const getValue = field => {
        const formData = cloneDeep(props.formModel);
        return formData[field];
    };
    const getData = async () => {
        return cloneDeep(props.formModel);
    };
    const hidden = field => {
        set(field, 'hidden', true);
    };
    const disable = field => {
        typeof field === 'string'
            ? setProps(field, 'disabled', true)
            : setFormConfig('disabled', field !== false);
    };
    const show = field => {
        set(field, 'hidden', false);
    };
    const linkOn = {};
    const initLink = (schemas) => {
        formItemsForEach(schemas, formItem => {
            formItemsForEach(schemas, item => {
                if (!linkOn[item.field])
                    linkOn[item.field] = new Set();
                if (formItem.link?.includes(item.field) && isFunction(formItem.update)) {
                    linkOn[item.field].add(formItem);
                }
            });
            linkOn[formItem.field].add(formItem);
        });
    };
    initLink(props.formConfig.schemas);
    return {
        linkOn,
        setValue,
        getValue,
        hidden,
        show,
        set,
        get,
        setProps,
        getData,
        disable,
        ...formInstanceMethods
    };
}
