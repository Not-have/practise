import { useLayoutHeight } from '@/layouts/default/content/useContentViewHeight';
import { getViewportOffset } from '@/utils/domUtils';
import { isNumber, isString } from '@/utils/is';
import { onMountedOrActivated, useWindowSizeFn } from '@vben/hooks';
import { isRef, nextTick, ref, unref, watch } from 'vue';
export function useContentHeight(flag, anchorRef, subtractHeightRefs, subtractSpaceRefs, upwardSpace = 0, offsetHeightRef = ref(0)) {
    const contentHeight = ref(null);
    const { footerHeightRef: layoutFooterHeightRef } = useLayoutHeight();
    let compensationHeight = {
        useLayoutFooter: true
    };
    const setCompensation = (params) => {
        compensationHeight = params;
    };
    function redoHeight() {
        nextTick(() => {
            calcContentHeight();
        });
    }
    function calcSubtractSpace(element, direction = 'all') {
        function numberPx(px) {
            return Number(px.replace(/[^\d]/g, ''));
        }
        let subtractHeight = 0;
        const ZERO_PX = '0px';
        if (element) {
            const cssStyle = getComputedStyle(element);
            const marginTop = numberPx(cssStyle?.marginTop ?? ZERO_PX);
            const marginBottom = numberPx(cssStyle?.marginBottom ?? ZERO_PX);
            const paddingTop = numberPx(cssStyle?.paddingTop ?? ZERO_PX);
            const paddingBottom = numberPx(cssStyle?.paddingBottom ?? ZERO_PX);
            if (direction === 'all') {
                subtractHeight += marginTop;
                subtractHeight += marginBottom;
                subtractHeight += paddingTop;
                subtractHeight += paddingBottom;
            }
            else if (direction === 'top') {
                subtractHeight += marginTop;
                subtractHeight += paddingTop;
            }
            else {
                subtractHeight += marginBottom;
                subtractHeight += paddingBottom;
            }
        }
        return subtractHeight;
    }
    function getEl(element) {
        if (element == null) {
            return null;
        }
        return (element instanceof HTMLDivElement ? element : element.$el);
    }
    async function calcContentHeight() {
        if (!flag.value) {
            return;
        }
        await nextTick();
        const anchorEl = getEl(unref(anchorRef));
        if (!anchorEl) {
            return;
        }
        const { bottomIncludeBody } = getViewportOffset(anchorEl);
        let subtractHeight = 0;
        subtractHeightRefs.forEach(item => {
            subtractHeight += getEl(unref(item))?.offsetHeight ?? 0;
        });
        let subtractSpaceHeight = calcSubtractSpace(anchorEl) ?? 0;
        subtractSpaceRefs.forEach(item => {
            subtractSpaceHeight += calcSubtractSpace(getEl(unref(item)));
        });
        let upwardSpaceHeight = 0;
        function upward(element, upwardLvlOrClass) {
            if (element && upwardLvlOrClass) {
                const parent = element.parentElement;
                if (parent) {
                    if (isString(upwardLvlOrClass)) {
                        if (!parent.classList.contains(upwardLvlOrClass)) {
                            upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
                            upward(parent, upwardLvlOrClass);
                        }
                        else {
                            upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
                        }
                    }
                    else if (isNumber(upwardLvlOrClass)) {
                        if (upwardLvlOrClass > 0) {
                            upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
                            upward(parent, --upwardLvlOrClass);
                        }
                    }
                }
            }
        }
        if (isRef(upwardSpace)) {
            upward(anchorEl, unref(upwardSpace));
        }
        else {
            upward(anchorEl, upwardSpace);
        }
        let height = bottomIncludeBody -
            unref(layoutFooterHeightRef) -
            unref(offsetHeightRef) -
            subtractHeight -
            subtractSpaceHeight -
            upwardSpaceHeight;
        const calcCompensationHeight = () => {
            compensationHeight.elements?.forEach(item => {
                height += getEl(unref(item))?.offsetHeight ?? 0;
            });
        };
        if (compensationHeight.useLayoutFooter && unref(layoutFooterHeightRef) > 0) {
            calcCompensationHeight();
        }
        else {
            calcCompensationHeight();
        }
        contentHeight.value = height;
    }
    onMountedOrActivated(() => {
        nextTick(() => {
            calcContentHeight();
        });
    });
    useWindowSizeFn(() => {
        calcContentHeight();
    }, { wait: 50, immediate: true });
    watch(() => [layoutFooterHeightRef.value], () => {
        calcContentHeight();
    }, {
        flush: 'post',
        immediate: true
    });
    return { redoHeight, setCompensation, contentHeight };
}
