import tableProps from 'vxe-table/es/table/src/props';
export const basicProps = {
    ...tableProps,
    columns: Array,
    pagerConfig: {
        type: Object,
        default: () => ({})
    },
    proxyConfig: {
        type: Object,
        default: () => ({})
    },
    toolbarConfig: {
        type: Object,
        default: () => ({})
    },
    formConfig: {
        type: Object,
        default: () => ({})
    },
    zoomConfig: {
        type: Object,
        default: () => ({})
    },
    printConfig: {
        type: Object,
        default: () => ({})
    },
    exportConfig: {
        type: Object,
        default: () => ({})
    },
    importConfig: {
        type: Object,
        default: () => ({})
    },
    size: String,
    tableClass: {
        type: String,
        default: ''
    },
    tableStyle: {
        type: Object,
        default: () => ({})
    }
};
