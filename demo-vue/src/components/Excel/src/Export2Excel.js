import * as xlsx from 'xlsx';
const { utils, writeFile } = xlsx;
const DEF_FILE_NAME = 'excel-list.xlsx';
const DEF_SHEET_NAME = 'sheet';
function setColumnWidth(data, worksheet, min = 3) {
    const obj = {};
    worksheet['!cols'] = [];
    data.forEach(item => {
        Object.keys(item).forEach(key => {
            const cur = item[key];
            const length = cur?.length ?? min;
            obj[key] = Math.max(length, obj[key] ?? min);
        });
    });
    Object.keys(obj).forEach(key => {
        worksheet['!cols'].push({
            wch: obj[key]
        });
    });
}
export function jsonToSheetXlsx({ data, header, filename = DEF_FILE_NAME, sheetName = DEF_SHEET_NAME, json2sheetOpts = {}, write2excelOpts = { bookType: 'xlsx' } }) {
    const arrData = [...data];
    if (header) {
        arrData.unshift(header);
        json2sheetOpts.skipHeader = true;
    }
    const worksheet = utils.json_to_sheet(arrData, json2sheetOpts);
    setColumnWidth(arrData, worksheet);
    const workbook = {
        SheetNames: [sheetName],
        Sheets: {
            [sheetName]: worksheet
        }
    };
    writeFile(workbook, filename, write2excelOpts);
}
export function aoaToSheetXlsx({ data, header, filename = DEF_FILE_NAME, write2excelOpts = { bookType: 'xlsx' } }) {
    const arrData = [...data];
    if (header) {
        arrData.unshift(header);
    }
    const worksheet = utils.aoa_to_sheet(arrData);
    const workbook = {
        SheetNames: [filename],
        Sheets: {
            [filename]: worksheet
        }
    };
    writeFile(workbook, filename, write2excelOpts);
}
export function jsonToMultipleSheetXlsx({ sheetList, filename = DEF_FILE_NAME, write2excelOpts = { bookType: 'xlsx' } }) {
    const workbook = {
        SheetNames: [],
        Sheets: {}
    };
    sheetList.forEach((p, index) => {
        const arrData = [...p.data];
        if (p.header) {
            arrData.unshift(p.header);
            p.json2sheetOpts = p.json2sheetOpts || {};
            p.json2sheetOpts.skipHeader = true;
        }
        const worksheet = utils.json_to_sheet(arrData, p.json2sheetOpts);
        setColumnWidth(arrData, worksheet);
        p.sheetName = p.sheetName || `${DEF_SHEET_NAME}${index}`;
        workbook.SheetNames.push(p.sheetName);
        workbook.Sheets[p.sheetName] = worksheet;
    });
    writeFile(workbook, filename, write2excelOpts);
}
export function aoaToMultipleSheetXlsx({ sheetList, filename = DEF_FILE_NAME, write2excelOpts = { bookType: 'xlsx' } }) {
    const workbook = {
        SheetNames: [],
        Sheets: {}
    };
    sheetList.forEach((p, index) => {
        const arrData = [...p.data];
        if (p.header) {
            arrData.unshift(p.header);
        }
        const worksheet = utils.aoa_to_sheet(arrData);
        p.sheetName = p.sheetName || `${DEF_SHEET_NAME}${index}`;
        workbook.SheetNames.push(p.sheetName);
        workbook.Sheets[p.sheetName] = worksheet;
    });
    writeFile(workbook, filename, write2excelOpts);
}
