const cssProperties = {
    single: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    multiple: {
        display: '-webkit-box',
        overflow: 'hidden',
        wordBreak: 'break-all'
    }
};
const Ellipsis = {
    mounted(el, binding) {
        const { value = [100, 1], arg = 'single' } = binding;
        const [width, line] = value;
        Object.entries(cssProperties[arg]).forEach(([key, value]) => {
            el.style[key] = value;
        });
        el.style.width = `${width}px`;
        if (arg === 'multiple') {
            el.style.webkitLineClamp = `${line}`;
            el.style.webkitBoxOrient = 'vertical';
        }
    }
};
export function setupEllipsisDirective(app) {
    app.directive('ellipsis', Ellipsis);
}
export default Ellipsis;
