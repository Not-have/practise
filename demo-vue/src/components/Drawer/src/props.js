import { useI18n } from '@/hooks/web/useI18n';
const { t } = useI18n();
export const footerProps = {
    confirmLoading: { type: Boolean },
    showCancelBtn: { type: Boolean, default: true },
    cancelButtonProps: Object,
    cancelText: { type: String, default: t('common.cancelText') },
    showOkBtn: { type: Boolean, default: true },
    okButtonProps: Object,
    okText: { type: String, default: t('common.okText') },
    okType: { type: String, default: 'primary' },
    showFooter: { type: Boolean },
    footerHeight: {
        type: [String, Number],
        default: 60
    }
};
export const basicProps = {
    isDetail: { type: Boolean },
    title: { type: String, default: '' },
    loadingText: { type: String },
    showDetailBack: { type: Boolean, default: true },
    open: { type: Boolean },
    loading: { type: Boolean },
    maskClosable: { type: Boolean, default: true },
    getContainer: {
        type: [Object, String]
    },
    closeFunc: {
        type: [Function, Object],
        default: null
    },
    destroyOnClose: { type: Boolean },
    ...footerProps
};
