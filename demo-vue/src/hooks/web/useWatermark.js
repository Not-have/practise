import { getCurrentInstance, onBeforeUnmount, ref, shallowRef, unref } from 'vue';
import { useRafThrottle } from '@/utils/domUtils';
import { addResizeListener, removeResizeListener } from '@/utils/event';
import { isDef } from '@/utils/is';
const watermarkSymbol = 'watermark-dom';
const updateWatermarkText = ref(null);
const sourceMap = new Map();
function createBase64(str) {
    const can = document.createElement('canvas');
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });
    const cans = can.getContext('2d');
    if (cans) {
        cans.rotate((-20 * Math.PI) / 180);
        cans.font = '15px Vedana';
        cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
        cans.textAlign = 'left';
        cans.textBaseline = 'middle';
        cans.fillText(str, width / 20, height);
    }
    return can.toDataURL('image/png');
}
const resetWatermarkStyle = (element, watermarkText) => {
    element.className = '__' + watermarkSymbol;
    element.style.pointerEvents = 'none';
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.position = 'absolute';
    element.style.zIndex = '100000';
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.background = `url(${createBase64(unref(updateWatermarkText) || watermarkText)}) left top repeat`;
};
const obFn = () => {
    const obInstance = new MutationObserver(mutationRecords => {
        for (const mutation of mutationRecords) {
            for (const node of Array.from(mutation.removedNodes)) {
                const target = Array.from(sourceMap.values()).find(item => item.targetElement === node);
                if (!target)
                    return;
                const { targetElement, parentElement } = target;
                if (!parentElement?.contains(targetElement)) {
                    target?.parentElement?.appendChild(node);
                }
            }
            if (mutation.attributeName === 'style' && mutation.target) {
                const _target = mutation.target;
                if (_target.className === '__' + watermarkSymbol) {
                    resetWatermarkStyle(_target, _target?.['data-watermark-text']);
                }
            }
        }
    });
    return obInstance;
};
export function useWatermark(appendEl = ref(document.body)) {
    const domSymbol = Symbol(watermarkSymbol);
    const appendElRaw = unref(appendEl);
    if (appendElRaw && sourceMap.has(domSymbol)) {
        const { setWatermark, clear } = sourceMap.get(domSymbol);
        return { setWatermark, clear, clearAll };
    }
    const func = useRafThrottle(function () {
        const el = unref(appendEl);
        if (!el)
            return;
        const { clientHeight: height, clientWidth: width } = el;
        updateWatermark({ height, width });
    });
    const watermarkEl = shallowRef();
    const clear = () => {
        const domId = unref(watermarkEl);
        watermarkEl.value = undefined;
        const el = unref(appendEl);
        sourceMap.has(domSymbol) && sourceMap.get(domSymbol)?.obInstance?.disconnect();
        sourceMap.delete(domSymbol);
        if (!el)
            return;
        domId && el.removeChild(domId);
        removeResizeListener(el, func);
    };
    function updateWatermark(options = {}) {
        const el = unref(watermarkEl);
        if (!el)
            return;
        if (isDef(options.width)) {
            el.style.width = `${options.width}px`;
        }
        if (isDef(options.height)) {
            el.style.height = `${options.height}px`;
        }
        if (isDef(options.str)) {
            el.style.background = `url(${createBase64(options.str)}) left top repeat`;
        }
    }
    const createWatermark = (str) => {
        if (unref(watermarkEl) && sourceMap.has(domSymbol)) {
            updateWatermarkText.value = str;
            updateWatermark({ str });
            return;
        }
        const div = document.createElement('div');
        div['data-watermark-text'] = str;
        updateWatermarkText.value = str;
        watermarkEl.value = div;
        resetWatermarkStyle(div, str);
        const el = unref(appendEl);
        if (!el)
            return;
        const { clientHeight: height, clientWidth: width } = el;
        updateWatermark({ str, width, height });
        el.appendChild(div);
        sourceMap.set(domSymbol, {
            setWatermark,
            clear,
            parentElement: el,
            targetElement: div,
            obInstance: obFn()
        });
        sourceMap.get(domSymbol)?.obInstance?.observe(el, {
            childList: true,
            subtree: true,
            attributes: true
        });
    };
    function setWatermark(str) {
        createWatermark(str);
        addResizeListener(document.documentElement, func);
        const instance = getCurrentInstance();
        if (instance) {
            onBeforeUnmount(() => {
                clear();
            });
        }
    }
    return { setWatermark, clear, clearAll };
}
function clearAll() {
    Array.from(sourceMap.values()).forEach(item => {
        item?.obInstance?.disconnect();
        item.clear();
    });
}
