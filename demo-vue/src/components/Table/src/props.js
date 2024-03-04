import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING, DEFAULT_SIZE } from './const';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
    clickToRowSelect: { type: Boolean, default: true },
    isTreeTable: Boolean,
    tableSetting: propTypes.shape({}),
    inset: Boolean,
    sortFn: {
        type: Function,
        default: DEFAULT_SORT_FN
    },
    filterFn: {
        type: Function,
        default: DEFAULT_FILTER_FN
    },
    showTableSetting: Boolean,
    autoCreateKey: { type: Boolean, default: true },
    striped: { type: Boolean, default: true },
    showSummary: Boolean,
    summaryFunc: {
        type: [Function, Array],
        default: null
    },
    summaryData: {
        type: Array,
        default: null
    },
    indentSize: propTypes.number.def(24),
    canColDrag: { type: Boolean, default: true },
    api: {
        type: Function,
        default: null
    },
    beforeFetch: {
        type: Function,
        default: null
    },
    afterFetch: {
        type: Function,
        default: null
    },
    handleSearchInfoFn: {
        type: Function,
        default: null
    },
    fetchSetting: {
        type: Object,
        default: () => {
            return FETCH_SETTING;
        }
    },
    immediate: { type: Boolean, default: true },
    emptyDataIsShowTable: { type: Boolean, default: true },
    searchInfo: {
        type: Object,
        default: null
    },
    defSort: {
        type: Object,
        default: null
    },
    useSearchForm: propTypes.bool,
    formConfig: {
        type: Object,
        default: null
    },
    columns: {
        type: Array,
        default: () => []
    },
    showIndexColumn: { type: Boolean, default: true },
    indexColumnProps: {
        type: Object,
        default: null
    },
    actionColumn: {
        type: Object,
        default: null
    },
    ellipsis: { type: Boolean, default: true },
    isCanResizeParent: { type: Boolean, default: false },
    canResize: { type: Boolean, default: true },
    clearSelectOnPageChange: propTypes.bool,
    resizeHeightOffset: propTypes.number.def(0),
    rowSelection: {
        type: Object,
        default: null
    },
    showSelectionBar: propTypes.bool,
    title: {
        type: [String, Function],
        default: null
    },
    titleHelpMessage: {
        type: [String, Array]
    },
    maxHeight: propTypes.number,
    dataSource: {
        type: Array,
        default: null
    },
    rowKey: {
        type: [String, Function],
        default: ''
    },
    bordered: propTypes.bool,
    pagination: {
        type: [Object, Boolean],
        default: null
    },
    loading: propTypes.bool,
    rowClassName: {
        type: Function
    },
    scroll: {
        type: Object
    },
    beforeEditSubmit: {
        type: Function
    },
    size: {
        type: String,
        default: DEFAULT_SIZE
    }
};
