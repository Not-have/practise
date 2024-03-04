import XEUtils from 'xe-utils';
import { createCellRender, createEditRender, createExportMethod, createFormItemRender } from './common';
function getRangePickerCellValue(renderOpts, params) {
    const { props = {} } = renderOpts;
    const { row, column } = params;
    let cellValue = XEUtils.get(row, column.field);
    if (cellValue) {
        cellValue = XEUtils.map(cellValue, (date) => date.format(props.format || 'YYYY-MM-DD')).join(' ~ ');
    }
    return cellValue;
}
export default {
    renderEdit: createEditRender(),
    renderCell: createCellRender(getRangePickerCellValue),
    renderItemContent: createFormItemRender(),
    exportMethod: createExportMethod(getRangePickerCellValue)
};
