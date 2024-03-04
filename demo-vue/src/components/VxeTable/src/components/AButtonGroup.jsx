import { createDefaultRender, createEditRender, createFormItemRender } from './AButton';
function createEditButtonRender() {
    return function (renderOpts, params) {
        const buttonEditRender = createEditRender();
        const { children } = renderOpts;
        if (children) {
            return children.map((childRenderOpts) => buttonEditRender(childRenderOpts, params)[0]);
        }
        return [];
    };
}
function createDefaultButtonRender() {
    return function (renderOpts, params) {
        const buttonDefaultRender = createDefaultRender();
        const { children } = renderOpts;
        if (children) {
            return children.map((childRenderOpts) => buttonDefaultRender(childRenderOpts, params)[0]);
        }
        return [];
    };
}
function createButtonItemRender() {
    return function (renderOpts, params) {
        const buttonItemRender = createFormItemRender();
        const { children } = renderOpts;
        if (children) {
            return children.map((childRenderOpts) => buttonItemRender(childRenderOpts, params)[0]);
        }
        return [];
    };
}
export default {
    renderEdit: createEditButtonRender(),
    renderDefault: createDefaultButtonRender(),
    renderItemContent: createButtonItemRender()
};
