import { useI18n } from '@/hooks/web/useI18n';
import { dateUtil } from '@/utils/dateUtil';
import { isNumber, isObject } from '@/utils/is';
const { t } = useI18n();
export function createPlaceholderMessage(component) {
    if (component.includes('Input') || component.includes('Complete')) {
        return t('common.inputText');
    }
    if (component.includes('Picker')) {
        return t('common.chooseText');
    }
    if (component.includes('Select') ||
        component.includes('Cascader') ||
        component.includes('Checkbox') ||
        component.includes('Radio') ||
        component.includes('Switch')) {
        return t('common.chooseText');
    }
    return '';
}
const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];
function genType() {
    return [...DATE_TYPE, 'RangePicker'];
}
export function setComponentRuleType(rule, component, valueFormat) {
    if (Reflect.has(rule, 'type')) {
        return;
    }
    if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
        rule.type = valueFormat ? 'string' : 'object';
    }
    else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
        rule.type = 'array';
    }
    else if (['InputNumber'].includes(component)) {
        rule.type = 'number';
    }
}
export function processDateValue(attr, component) {
    const { valueFormat, value } = attr;
    if (valueFormat) {
        attr.value = isObject(value)
            ? dateUtil(value).format(valueFormat)
            : value;
    }
    else if (DATE_TYPE.includes(component) && value) {
        attr.value = dateUtil(attr.value);
    }
}
export const defaultValueComponents = [
    'Input',
    'InputPassword',
    'InputNumber',
    'InputSearch',
    'InputTextArea'
];
export function handleInputNumberValue(component, val) {
    if (!component)
        return val;
    if (defaultValueComponents.includes(component)) {
        return val && isNumber(val) ? `${val}` : val;
    }
    return val;
}
export const dateItemType = genType();
export const NO_AUTO_LINK_COMPONENTS = [
    'Upload',
    'ApiTransfer',
    'ApiTree',
    'ApiTreeSelect',
    'ApiRadioGroup',
    'ApiCascader',
    'AutoComplete',
    'RadioButtonGroup',
    'ImageUpload',
    'ApiSelect'
];
export const simpleComponents = ['Divider', 'BasicTitle'];
export function isIncludeSimpleComponents(component) {
    return simpleComponents.includes(component || '');
}
