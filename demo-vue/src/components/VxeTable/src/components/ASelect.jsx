import { h, resolveComponent } from 'vue';
import XEUtils from 'xe-utils';
import { cellText, createCellRender, createEvents, createProps, isEmptyValue, createExportMethod, createFormItemRender } from './common';
function renderOptions(options, optionProps) {
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    return XEUtils.map(options, (item, oIndex) => {
        return h(resolveComponent('a-select-option'), {
            key: oIndex,
            value: item[valueProp],
            disabled: item.disabled
        }, {
            default: () => cellText(item[labelProp])
        });
    });
}
function createEditRender() {
    return function (renderOpts, params) {
        const { options = [], optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts;
        const { row, column, $table } = params;
        const { attrs } = renderOpts;
        const cellValue = XEUtils.get(row, column.field);
        const props = createProps(renderOpts, cellValue);
        const ons = createEvents(renderOpts, params, (value) => {
            XEUtils.set(row, column.field, value);
        }, () => {
            $table.updateStatus(params);
        });
        if (optionGroups) {
            const groupOptions = optionGroupProps.options || 'options';
            const groupLabel = optionGroupProps.label || 'label';
            return [
                h(resolveComponent('a-select'), {
                    ...attrs,
                    ...props,
                    ...ons
                }, {
                    default: () => {
                        return XEUtils.map(optionGroups, (group, gIndex) => {
                            return h(resolveComponent('a-select-opt-group'), {
                                key: gIndex
                            }, {
                                label: () => {
                                    return h('span', {}, group[groupLabel]);
                                },
                                default: () => renderOptions(group[groupOptions], optionProps)
                            });
                        });
                    }
                })
            ];
        }
        return [
            h(resolveComponent('a-select'), {
                ...props,
                ...attrs,
                ...ons
            }, {
                default: () => renderOptions(options, optionProps)
            })
        ];
    };
}
function getSelectCellValue(renderOpts, params) {
    const { options = [], optionGroups, props = {}, optionProps = {}, optionGroupProps = {} } = renderOpts;
    const { row, column } = params;
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    const groupOptions = optionGroupProps.options || 'options';
    const cellValue = XEUtils.get(row, column.field);
    if (!isEmptyValue(cellValue)) {
        return XEUtils.map(props.mode === 'multiple' ? cellValue : [cellValue], optionGroups
            ? value => {
                let selectItem;
                for (let index = 0; index < optionGroups.length; index++) {
                    selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] === value);
                    if (selectItem) {
                        break;
                    }
                }
                return selectItem ? selectItem[labelProp] : value;
            }
            : value => {
                const selectItem = XEUtils.find(options, item => item[valueProp] === value);
                return selectItem ? selectItem[labelProp] : value;
            }).join(', ');
    }
    return '';
}
function createFilterRender() {
    return function (renderOpts, params) {
        const { options = [], optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts;
        const groupOptions = optionGroupProps.options || 'options';
        const groupLabel = optionGroupProps.label || 'label';
        const { column } = params;
        const { attrs } = renderOpts;
        return [
            h('div', {
                class: 'vxe-table--filter-antd-wrapper'
            }, optionGroups
                ? column.filters.map((option, oIndex) => {
                    const optionValue = option.data;
                    const props = createProps(renderOpts, optionValue);
                    return h(resolveComponent('a-select'), {
                        key: oIndex,
                        ...attrs,
                        ...props,
                        ...createEvents(renderOpts, params, (value) => {
                            option.data = value;
                        }, () => {
                            const { $panel } = params;
                            $panel.changeOption(null, props.mode === 'multiple'
                                ? option.data && option.data.length > 0
                                : !XEUtils.eqNull(option.data), option);
                        })
                    }, {
                        default: () => {
                            return XEUtils.map(optionGroups, (group, gIndex) => {
                                return h(resolveComponent('a-select-opt-group'), {
                                    key: gIndex
                                }, {
                                    label: () => {
                                        return h('span', {}, group[groupLabel]);
                                    },
                                    default: () => renderOptions(group[groupOptions], optionProps)
                                });
                            });
                        }
                    });
                })
                : column.filters.map((option, oIndex) => {
                    const optionValue = option.data;
                    const props = createProps(renderOpts, optionValue);
                    return h(resolveComponent('a-select'), {
                        key: oIndex,
                        ...attrs,
                        ...props,
                        ...createEvents(renderOpts, params, (value) => {
                            option.data = value;
                        }, () => {
                            const { $panel } = params;
                            $panel.changeOption(null, props.mode === 'multiple'
                                ? option.data && option.data.length > 0
                                : !XEUtils.eqNull(option.data), option);
                        })
                    }, {
                        default: () => renderOptions(options, optionProps)
                    });
                }))
        ];
    };
}
export default {
    renderEdit: createEditRender(),
    renderCell: createCellRender(getSelectCellValue),
    renderFilter: createFilterRender(),
    defaultFilterMethod(params) {
        const { option, row, column } = params;
        const { data } = option;
        const { field, filterRender: renderOpts } = column;
        const { props = {} } = renderOpts;
        const cellValue = XEUtils.get(row, field);
        if (props.mode === 'multiple') {
            if (XEUtils.isArray(cellValue)) {
                return XEUtils.includeArrays(cellValue, data);
            }
            return data.indexOf(cellValue) > -1;
        }
        return cellValue == data;
    },
    renderItemContent: createFormItemRender(),
    exportMethod: createExportMethod(getSelectCellValue)
};
