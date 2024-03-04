import { h } from 'vue';
import XEUtils from 'xe-utils';
import { cellText, createEvents, createProps, getComponent } from './common';
const COMPONENT_NAME = 'AButton';
export function createEditRender() {
    return function (renderOpts, params) {
        const { attrs } = renderOpts;
        const Component = getComponent(COMPONENT_NAME);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, null),
                ...createEvents(renderOpts, params)
            })
        ];
    };
}
export function createDefaultRender() {
    return function (renderOpts, params) {
        const { attrs } = renderOpts;
        const Component = getComponent(COMPONENT_NAME);
        return [
            h(Component, {
                ...attrs,
                ...createProps(renderOpts, null),
                ...createEvents(renderOpts, params)
            }, cellText(renderOpts.content))
        ];
    };
}
export function createFormItemRender() {
    return function (renderOpts, params) {
        const { attrs, content } = renderOpts;
        const { property, $form, data } = params;
        const props = createProps(renderOpts, null);
        const Component = getComponent(COMPONENT_NAME);
        return [
            h(Component, {
                ...attrs,
                ...props,
                ...createEvents(renderOpts, params, (value) => {
                    XEUtils.set(data, property, value);
                }, () => {
                    $form.updateStatus({
                        ...params,
                        field: property
                    });
                })
            }, {
                default: () => cellText(content || props.content)
            })
        ];
    };
}
function createToolbarButtonRender() {
    return function (renderOpts, params) {
        const { attrs } = renderOpts;
        const { button } = params;
        const props = createProps(renderOpts, null);
        const Component = getComponent(COMPONENT_NAME);
        return [
            h(Component, {
                ...attrs,
                ...props,
                ...createEvents(renderOpts, params)
            }, {
                default: () => cellText(button?.content || props.content)
            })
        ];
    };
}
export default {
    renderEdit: createEditRender(),
    renderDefault: createDefaultRender(),
    renderItemContent: createFormItemRender(),
    renderToolbarButton: createToolbarButtonRender()
};
