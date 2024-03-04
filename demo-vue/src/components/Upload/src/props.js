export const basicProps = {
    listType: {
        type: String,
        default: 'picture-card'
    },
    helpText: {
        type: String,
        default: ''
    },
    maxSize: {
        type: Number,
        default: 2
    },
    maxNumber: {
        type: Number,
        default: 1
    },
    accept: {
        type: Array,
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    uploadParams: {
        type: Object,
        default: () => ({})
    },
    api: {
        type: Function,
        default: null,
        required: true
    },
    name: {
        type: String,
        default: 'file'
    },
    filename: {
        type: String,
        default: null
    },
    fileListOpenDrag: {
        type: Boolean,
        default: true
    },
    fileListDragOptions: {
        type: Object,
        default: () => ({})
    }
};
export const uploadContainerProps = {
    value: {
        type: Array,
        default: () => []
    },
    ...basicProps,
    showPreviewNumber: {
        type: Boolean,
        default: true
    },
    emptyHidePreview: {
        type: Boolean,
        default: false
    }
};
export const previewProps = {
    value: {
        type: Array,
        default: () => []
    }
};
export const fileListProps = {
    columns: {
        type: Array,
        default: null
    },
    actionColumn: {
        type: Object,
        default: null
    },
    dataSource: {
        type: Array,
        default: null
    },
    openDrag: {
        type: Boolean,
        default: false
    },
    dragOptions: {
        type: Object,
        default: () => ({})
    }
};
