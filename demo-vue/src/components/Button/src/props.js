const validColors = ['primary', 'error', 'warning', 'success', ''];
export const buttonProps = {
    color: {
        type: String,
        validator: v => validColors.includes(v),
        default: ''
    },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    preIcon: { type: String },
    postIcon: { type: String },
    iconSize: { type: Number, default: 14 },
    onClick: { type: [Function, Array], default: null },
    text: { type: String }
};
