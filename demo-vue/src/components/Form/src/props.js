import { propTypes } from '@/utils/propTypes';
export const basicProps = {
    model: {
        type: Object,
        default: () => ({})
    },
    labelWidth: {
        type: [Number, String],
        default: 0
    },
    fieldMapToTime: {
        type: Array,
        default: () => []
    },
    compact: propTypes.bool,
    schemas: {
        type: Array,
        default: () => []
    },
    mergeDynamicData: {
        type: Object,
        default: null
    },
    baseRowStyle: {
        type: Object
    },
    baseColProps: {
        type: Object
    },
    autoSetPlaceHolder: propTypes.bool.def(true),
    autoSubmitOnEnter: propTypes.bool.def(false),
    submitOnReset: propTypes.bool,
    submitOnChange: propTypes.bool,
    size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
    disabled: propTypes.bool,
    emptySpan: {
        type: [Number, Object],
        default: 0
    },
    showAdvancedButton: propTypes.bool,
    transformDateFunc: {
        type: Function,
        default: (date) => {
            return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date;
        }
    },
    rulesMessageJoinLabel: propTypes.bool.def(true),
    autoAdvancedLine: propTypes.number.def(3),
    alwaysShowLines: propTypes.number.def(1),
    showActionButtonGroup: propTypes.bool.def(true),
    actionColOptions: Object,
    showResetButton: propTypes.bool.def(true),
    autoFocusFirstItem: propTypes.bool,
    resetButtonOptions: Object,
    showSubmitButton: propTypes.bool.def(true),
    submitButtonOptions: Object,
    resetFunc: Function,
    submitFunc: Function,
    hideRequiredMark: propTypes.bool,
    labelCol: Object,
    layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
    tableAction: {
        type: Object
    },
    wrapperCol: Object,
    colon: propTypes.bool,
    labelAlign: propTypes.string,
    rowProps: Object
};
