import { h } from 'vue';
import XEUtils from 'xe-utils';
import { componentMap } from '../componentMap';
import { createPlaceholderMessage } from '../helper';
export function getComponent(componentName) {
    const Component = componentMap.get(componentName);
    if (!Component)
        throw `您还没注册此组件 ${componentName}`;
    return Component;
}
export function isEmptyValue(cellValue) {
    return cellValue === null || cellValue === undefined || cellValue === '';
}
export function formatText(cellValue) {
    return '' + (isEmptyValue(cellValue) ? '' : cellValue);
}
export function cellText(cellValue) {
    return [formatText(cellValue)];
}
export function getOnName(type) {
    return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
function getModelKey(renderOpts) {
    let prop = 'value';
    switch (renderOpts.name) {
        case 'ASwitch':
            prop = 'checked';
            break;
    }
    return prop;
}
function getModelEvent(renderOpts) {
    let type = 'update:value';
    switch (renderOpts.name) {
        case 'ASwitch':
            type = 'update:checked';
            break;
    }
    return type;
}
function getChangeEvent() {
    return 'change';
}
function getClickEvent() {
    return 'click';
}
export function createEvents(renderOpts, params, inputFunc, changeFunc, clickFunc) {
    const { events } = renderOpts;
    const modelEvent = getModelEvent(renderOpts);
    const changeEvent = getChangeEvent();
    const clickEvent = getClickEvent();
    const isSameEvent = changeEvent === modelEvent;
    const ons = {};
    XEUtils.objectEach(events, (func, key) => {
        ons[getOnName(key)] = function (...args) {
            func(params, ...args);
        };
    });
    if (inputFunc) {
        ons[getOnName(modelEvent)] = function (targetEvnt) {
            inputFunc(targetEvnt);
            if (events && events[modelEvent]) {
                events[modelEvent](params, targetEvnt);
            }
            if (isSameEvent && changeFunc) {
                changeFunc(targetEvnt);
            }
        };
    }
    if (!isSameEvent && changeFunc) {
        ons[getOnName(changeEvent)] = function (...args) {
            changeFunc(...args);
            if (events && events[changeEvent]) {
                events[changeEvent](params, ...args);
            }
        };
    }
    if (clickFunc) {
        ons[getOnName(clickEvent)] = function (...args) {
            clickFunc(...args);
            if (events && events[clickEvent]) {
                events[clickEvent](params, ...args);
            }
        };
    }
    return ons;
}
export function createProps(renderOpts, value, defaultProps) {
    const name = renderOpts.name;
    return XEUtils.assign({
        placeholder: createPlaceholderMessage(name),
        allowClear: true
    }, defaultProps, renderOpts.props, {
        [getModelKey(renderOpts)]: value
    });
}
export function createDefaultRender(defaultProps, callBack) {
    return function (renderOpts, params) {
        const { row, column, $table } = params;
        const { name, attrs } = renderOpts;
        const cellValue = XEUtils.get(row, column.field);
        const args = (callBack && callBack(renderOpts, params)) ?? {};
        const Component = getComponent(name);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, cellValue, defaultProps),
                ...args,
                ...createEvents(renderOpts, params, (value) => XEUtils.set(row, column.field, value), () => $table.updateStatus(params))
            })
        ];
    };
}
export function createEditRender(defaultProps, callBack) {
    return function (renderOpts, params) {
        const { row, column, $table } = params;
        const { name, attrs } = renderOpts;
        const cellValue = XEUtils.get(row, column.field);
        const args = (callBack && callBack(renderOpts, params)) ?? {};
        const Component = getComponent(name);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, cellValue, defaultProps),
                ...args,
                ...createEvents(renderOpts, params, (value) => XEUtils.set(row, column.field, value), () => $table.updateStatus(params))
            })
        ];
    };
}
export function createFilterRender(defaultProps, callBack) {
    return function (renderOpts, params) {
        const { column } = params;
        const { name, attrs } = renderOpts;
        const args = (callBack && callBack(renderOpts, params)) ?? {};
        const Component = getComponent(name);
        return [
            h('div', {
                class: 'vxe-table--filter-antd-wrapper'
            }, column.filters.map((option, oIndex) => {
                const optionValue = option.data;
                const checked = !!option.data;
                return h(Component, {
                    key: oIndex,
                    ...attrs,
                    ...createProps(renderOpts, optionValue, defaultProps),
                    ...args,
                    ...createEvents(renderOpts, params, (value) => {
                        option.data = value;
                    }, () => {
                        const { $panel } = params;
                        $panel.changeOption(null, checked, option);
                    })
                });
            }))
        ];
    };
}
export function createDefaultFilterRender() {
    return function (params) {
        const { option, row, column } = params;
        const { data } = option;
        const cellValue = XEUtils.get(row, column.field);
        return cellValue === data;
    };
}
export function createFormItemRender(defaultProps, callBack) {
    return function (renderOpts, params) {
        const args = (callBack && callBack(renderOpts, params)) ?? {};
        const { data, property, $form } = params;
        const { name } = renderOpts;
        const { attrs } = renderOpts;
        const itemValue = XEUtils.get(data, property);
        const Component = getComponent(name);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, itemValue, defaultProps),
                ...args,
                ...createEvents(renderOpts, params, (value) => {
                    XEUtils.set(data, property, value);
                }, () => {
                    $form.updateStatus({
                        ...params,
                        field: property
                    });
                })
            })
        ];
    };
}
export function createCellRender(getSelectCellValue, callBack) {
    return function (renderOpts, params) {
        const args = (callBack && callBack(renderOpts, params)) ?? [];
        const cellLabel = getSelectCellValue && getSelectCellValue(renderOpts, params, ...args);
        const { placeholder } = renderOpts;
        return [
            h('span', {
                class: 'vxe-cell--label'
            }, placeholder && isEmptyValue(cellLabel)
                ? [
                    h('span', {
                        class: 'vxe-cell--placeholder'
                    }, formatText(placeholder))
                ]
                : formatText(cellLabel))
        ];
    };
}
export function createExportMethod(getExportCellValue, callBack) {
    return function (params) {
        const { row, column, options } = params;
        const args = (callBack && callBack(params)) ?? [];
        return options && options.original
            ? XEUtils.get(row, column.field)
            : getExportCellValue(column.editRender || column.cellRender, params, ...args);
    };
}
export function createToolbarToolRender(defaultProps, callBack) {
    return function (renderOpts, params) {
        const { name, attrs } = renderOpts;
        const args = (callBack && callBack(renderOpts, params)) ?? {};
        const Component = getComponent(name);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, null, defaultProps),
                ...args,
                ...createEvents(renderOpts, params)
            })
        ];
    };
}
