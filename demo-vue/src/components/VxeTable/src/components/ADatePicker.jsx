import XEUtils from 'xe-utils';
import { createCellRender, createEditRender, createExportMethod, createFormItemRender } from './common';
export function getDatePickerCellValue(renderOpts, params, defaultFormat) {
    const { props = {} } = renderOpts;
    const { row, column } = params;
    let cellValue = XEUtils.get(row, column.field);
    if (cellValue) {
        cellValue = cellValue.format(props.format || defaultFormat);
    }
    return cellValue;
}
export default {
    renderEdit: createEditRender(),
    renderCell: createCellRender(getDatePickerCellValue, () => {
        return ['YYYY-MM-DD'];
    }),
    renderItemContent: createFormItemRender(),
    exportMethod: createExportMethod(getDatePickerCellValue, () => {
        return ['YYYY-MM-DD'];
    })
};
