import { buildProps } from '@/utils/props';
export var ToolbarEnum;
(function (ToolbarEnum) {
    ToolbarEnum[ToolbarEnum["SELECT_ALL"] = 0] = "SELECT_ALL";
    ToolbarEnum[ToolbarEnum["UN_SELECT_ALL"] = 1] = "UN_SELECT_ALL";
    ToolbarEnum[ToolbarEnum["EXPAND_ALL"] = 2] = "EXPAND_ALL";
    ToolbarEnum[ToolbarEnum["UN_EXPAND_ALL"] = 3] = "UN_EXPAND_ALL";
    ToolbarEnum[ToolbarEnum["CHECK_STRICTLY"] = 4] = "CHECK_STRICTLY";
    ToolbarEnum[ToolbarEnum["CHECK_UN_STRICTLY"] = 5] = "CHECK_UN_STRICTLY";
})(ToolbarEnum || (ToolbarEnum = {}));
export const treeEmits = [
    'update:expandedKeys',
    'update:selectedKeys',
    'update:value',
    'change',
    'check',
    'update:searchValue'
];
export const treeProps = buildProps({
    value: {
        type: [Object, Array]
    },
    renderIcon: {
        type: Function
    },
    helpMessage: {
        type: [String, Array],
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    toolbar: Boolean,
    search: Boolean,
    searchValue: {
        type: String,
        default: ''
    },
    checkStrictly: Boolean,
    clickRowToExpand: {
        type: Boolean,
        default: false
    },
    checkable: Boolean,
    defaultExpandLevel: {
        type: [String, Number],
        default: ''
    },
    defaultExpandAll: Boolean,
    fieldNames: {
        type: Object
    },
    treeData: {
        type: Array
    },
    actionList: {
        type: Array,
        default: () => []
    },
    expandedKeys: {
        type: Array
    },
    selectedKeys: {
        type: Array,
        default: () => []
    },
    checkedKeys: {
        type: [Array, Object],
        default: () => []
    },
    beforeRightClick: {
        type: Function,
        default: undefined
    },
    rightMenuList: {
        type: Array
    },
    filterFn: {
        type: Function,
        default: undefined
    },
    highlight: {
        type: [Boolean, String],
        default: false
    },
    expandOnSearch: Boolean,
    checkOnSearch: Boolean,
    selectedOnSearch: Boolean,
    loading: {
        type: Boolean,
        default: false
    },
    treeWrapperClassName: String
});
