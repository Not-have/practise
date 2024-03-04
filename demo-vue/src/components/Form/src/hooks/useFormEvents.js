import { unref, toRaw, nextTick } from 'vue';
import { isArray, isFunction, isObject, isString, isDef, isNil } from '@/utils/is';
import { deepMerge } from '@/utils';
import { dateItemType, handleInputNumberValue, defaultValueComponents, isIncludeSimpleComponents } from '../helper';
import { dateUtil } from '@/utils/dateUtil';
import { cloneDeep, set, uniqBy, get } from 'lodash-es';
import { error } from '@/utils/log';
function tryConstructArray(field, values = {}) {
    const pattern = /^\[(.+)\]$/;
    if (pattern.test(field)) {
        const match = field.match(pattern);
        if (match && match[1]) {
            const keys = match[1].split(',');
            if (!keys.length) {
                return undefined;
            }
            const result = [];
            keys.forEach((k, index) => {
                set(result, index, values[k.trim()]);
            });
            return result.filter(Boolean).length ? result : undefined;
        }
    }
}
function tryConstructObject(field, values = {}) {
    const pattern = /^\{(.+)\}$/;
    if (pattern.test(field)) {
        const match = field.match(pattern);
        if (match && match[1]) {
            const keys = match[1].split(',');
            if (!keys.length) {
                return;
            }
            const result = {};
            keys.forEach(k => {
                set(result, k.trim(), values[k.trim()]);
            });
            return Object.values(result).filter(Boolean).length ? result : undefined;
        }
    }
}
export function useFormEvents({ emit, getProps, formModel, getSchema, defaultValueRef, formElRef, schemaRef, handleFormValues }) {
    async function resetFields() {
        const { resetFunc, submitOnReset } = unref(getProps);
        resetFunc && isFunction(resetFunc) && (await resetFunc());
        const formEl = unref(formElRef);
        if (!formEl)
            return;
        Object.keys(formModel).forEach(key => {
            const schema = unref(getSchema).find(item => item.field === key);
            const defaultValueObj = schema?.defaultValueObj;
            const fieldKeys = Object.keys(defaultValueObj || {});
            if (fieldKeys.length) {
                fieldKeys.map(field => {
                    formModel[field] = defaultValueObj[field];
                });
            }
            formModel[key] = getDefaultValue(schema, defaultValueRef, key);
        });
        nextTick(() => clearValidate());
        emit('reset', toRaw(formModel));
        submitOnReset && handleSubmit();
    }
    const getAllFields = () => unref(getSchema)
        .map(item => [...(item.fields || []), item.field])
        .flat(1)
        .filter(Boolean);
    async function setFieldsValue(values) {
        if (Object.keys(values).length === 0) {
            return;
        }
        const fields = getAllFields();
        const delimiter = '.';
        const nestKeyArray = fields.filter(item => String(item).indexOf(delimiter) >= 0);
        const validKeys = [];
        fields.forEach(key => {
            const schema = unref(getSchema).find(item => item.field === key);
            let value = get(values, key);
            const hasKey = Reflect.has(values, key);
            value = handleInputNumberValue(schema?.component, value);
            const { componentProps } = schema || {};
            let _props = componentProps;
            if (typeof componentProps === 'function') {
                _props = _props({
                    formModel: unref(formModel),
                    formActionType
                });
            }
            const constructValue = tryConstructArray(key, values) || tryConstructObject(key, values);
            if (hasKey || !!constructValue) {
                const fieldValue = constructValue || value;
                if (itemIsDateType(key)) {
                    if (Array.isArray(fieldValue)) {
                        const arr = [];
                        for (const ele of fieldValue) {
                            arr.push(ele ? dateUtil(ele) : null);
                        }
                        unref(formModel)[key] = arr;
                    }
                    else {
                        unref(formModel)[key] = fieldValue
                            ? _props?.valueFormat
                                ? fieldValue
                                : dateUtil(fieldValue)
                            : null;
                    }
                }
                else {
                    unref(formModel)[key] = fieldValue;
                }
                if (_props?.onChange) {
                    _props?.onChange(fieldValue);
                }
                validKeys.push(key);
            }
            else {
                nestKeyArray.forEach((nestKey) => {
                    try {
                        const value = nestKey.split('.').reduce((out, item) => out[item], values);
                        if (isDef(value)) {
                            unref(formModel)[nestKey] = unref(value);
                            validKeys.push(nestKey);
                        }
                    }
                    catch (e) {
                        if (isDef(defaultValueRef.value[nestKey])) {
                            unref(formModel)[nestKey] = cloneDeep(unref(defaultValueRef.value[nestKey]));
                        }
                    }
                });
            }
        });
        validateFields(validKeys).catch(_ => { });
    }
    async function removeSchemaByField(fields) {
        const schemaList = cloneDeep(unref(getSchema));
        if (!fields) {
            return;
        }
        let fieldList = isString(fields) ? [fields] : fields;
        if (isString(fields)) {
            fieldList = [fields];
        }
        for (const field of fieldList) {
            _removeSchemaByFeild(field, schemaList);
        }
        schemaRef.value = schemaList;
    }
    function _removeSchemaByFeild(field, schemaList) {
        if (isString(field)) {
            const index = schemaList.findIndex(schema => schema.field === field);
            if (index !== -1) {
                delete formModel[field];
                schemaList.splice(index, 1);
            }
        }
    }
    async function appendSchemaByField(schema, prefixField, first = false) {
        const schemaList = cloneDeep(unref(getSchema));
        const addSchemaIds = Array.isArray(schema)
            ? schema.map(item => item.field)
            : [schema.field];
        if (schemaList.find(item => addSchemaIds.includes(item.field))) {
            error('There are schemas that have already been added');
            return;
        }
        const index = schemaList.findIndex(schema => schema.field === prefixField);
        const _schemaList = isObject(schema) ? [schema] : schema;
        if (!prefixField || index === -1 || first) {
            first ? schemaList.unshift(..._schemaList) : schemaList.push(..._schemaList);
        }
        else if (index !== -1) {
            schemaList.splice(index + 1, 0, ..._schemaList);
        }
        schemaRef.value = schemaList;
        _setDefaultValue(schema);
    }
    async function resetSchema(data) {
        let updateData = [];
        if (isObject(data)) {
            updateData.push(data);
        }
        if (isArray(data)) {
            updateData = [...data];
        }
        const hasField = updateData.every(item => isIncludeSimpleComponents(item.component) ||
            (Reflect.has(item, 'field') && item.field));
        if (!hasField) {
            error('All children of the form Schema array that need to be updated must contain the `field` field');
            return;
        }
        schemaRef.value = updateData;
    }
    async function updateSchema(data) {
        let updateData = [];
        if (isObject(data)) {
            updateData.push(data);
        }
        if (isArray(data)) {
            updateData = [...data];
        }
        const hasField = updateData.every(item => isIncludeSimpleComponents(item.component) ||
            (Reflect.has(item, 'field') && item.field));
        if (!hasField) {
            error('All children of the form Schema array that need to be updated must contain the `field` field');
            return;
        }
        const schema = [];
        const updatedSchema = [];
        unref(getSchema).forEach(val => {
            const updatedItem = updateData.find(item => val.field === item.field);
            if (updatedItem) {
                const newSchema = deepMerge(val, updatedItem);
                updatedSchema.push(newSchema);
                schema.push(newSchema);
            }
            else {
                schema.push(val);
            }
        });
        _setDefaultValue(updatedSchema);
        schemaRef.value = uniqBy(schema, 'field');
    }
    function _setDefaultValue(data) {
        let schemas = [];
        if (isObject(data)) {
            schemas.push(data);
        }
        if (isArray(data)) {
            schemas = [...data];
        }
        const obj = {};
        const currentFieldsValue = getFieldsValue();
        schemas.forEach(item => {
            if (!isIncludeSimpleComponents(item.component) &&
                Reflect.has(item, 'field') &&
                item.field &&
                !isNil(item.defaultValue) &&
                (!(item.field in currentFieldsValue) || isNil(currentFieldsValue[item.field]))) {
                obj[item.field] = item.defaultValue;
            }
        });
        setFieldsValue(obj);
    }
    function getFieldsValue() {
        const formEl = unref(formElRef);
        if (!formEl)
            return {};
        return handleFormValues(toRaw(unref(formModel)));
    }
    function itemIsDateType(key) {
        return unref(getSchema).some(item => {
            return item.field === key && item.component
                ? dateItemType.includes(item.component)
                : false;
        });
    }
    async function validateFields(nameList) {
        const values = await unref(formElRef)?.validateFields(nameList);
        return handleFormValues(values);
    }
    async function setProps(formProps) {
        await unref(formElRef)?.setProps(formProps);
    }
    async function validate(nameList) {
        let _nameList;
        if (nameList === undefined) {
            _nameList = getAllFields();
        }
        else {
            _nameList = nameList === Array.isArray(nameList) ? nameList : undefined;
        }
        const values = await unref(formElRef)?.validate(_nameList);
        return handleFormValues(values);
    }
    async function clearValidate(name) {
        await unref(formElRef)?.clearValidate(name);
    }
    async function scrollToField(name, options) {
        await unref(formElRef)?.scrollToField(name, options);
    }
    async function handleSubmit(e) {
        e && e.preventDefault();
        const { submitFunc } = unref(getProps);
        if (submitFunc && isFunction(submitFunc)) {
            await submitFunc();
            return;
        }
        const formEl = unref(formElRef);
        if (!formEl)
            return;
        try {
            const values = await validate();
            emit('submit', values);
        }
        catch (error) {
            if (error?.outOfDate === false && error?.errorFields) {
                return;
            }
            throw new Error(error);
        }
    }
    const formActionType = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        updateSchema,
        resetSchema,
        setProps,
        removeSchemaByField,
        appendSchemaByField,
        clearValidate,
        validateFields,
        validate,
        submit: handleSubmit,
        scrollToField: scrollToField
    };
    return {
        handleSubmit,
        clearValidate,
        validate,
        validateFields,
        getFieldsValue,
        updateSchema,
        resetSchema,
        appendSchemaByField,
        removeSchemaByField,
        resetFields,
        setFieldsValue,
        scrollToField
    };
}
function getDefaultValue(schema, defaultValueRef, key) {
    let defaultValue = cloneDeep(defaultValueRef.value[key]);
    const isInput = checkIsInput(schema);
    if (isInput) {
        return defaultValue || undefined;
    }
    if (!defaultValue && schema && checkIsRangeSlider(schema)) {
        defaultValue = [0, 0];
    }
    if (!defaultValue && schema && schema.component === 'ApiTree') {
        defaultValue = [];
    }
    return defaultValue;
}
function checkIsRangeSlider(schema) {
    if (schema.component === 'Slider' &&
        schema.componentProps &&
        'range' in schema.componentProps) {
        return true;
    }
}
function checkIsInput(schema) {
    return schema?.component && defaultValueComponents.includes(schema.component);
}
