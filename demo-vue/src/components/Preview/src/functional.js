import ImgPreview from './Functional.vue';
import { isClient } from '@/utils/is';
import { createVNode, render } from 'vue';
let instance = null;
export function createImgPreview(options) {
    if (!isClient)
        return;
    const propsData = {};
    const container = document.createElement('div');
    Object.assign(propsData, { show: true, index: 0, scaleStep: 100 }, options);
    instance = createVNode(ImgPreview, propsData);
    render(instance, container);
    document.body.appendChild(container);
    return instance.component?.exposed;
}
