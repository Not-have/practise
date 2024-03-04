import XEUtils from 'xe-utils';
import { createEditRender, createCellRender, createFormItemRender, createExportMethod } from './common';
function matchCascaderData(index, list, values, labels) {
    const val = values[index];
    if (list && values.length > index) {
        XEUtils.each(list, item => {
            if (item.value === val) {
                labels.push(item.label);
                matchCascaderData(++index, item.children, values, labels);
            }
        });
    }
}
function getCascaderCellValue(renderOpts, params) {
    const { props = {} } = renderOpts;
    const { row, column } = params;
    const cellValue = XEUtils.get(row, column.field);
    const values = cellValue || [];
    const labels = [];
    matchCascaderData(0, props.options, values, labels);
    return (props.showAllLevels === false ? labels.slice(labels.length - 1, labels.length) : labels).join(` ${props.separator || '/'} `);
}
export default {
    renderEdit: createEditRender(),
    renderCell: createCellRender(getCascaderCellValue),
    renderItemContent: createFormItemRender(),
    exportMethod: createExportMethod(getCascaderCellValue)
};
