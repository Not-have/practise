import { ref, computed, unref, nextTick, watch } from 'vue';
import { getViewportOffset } from '@/utils/domUtils';
import { isBoolean } from '@/utils/is';
import { useWindowSizeFn, onMountedOrActivated } from '@vben/hooks';
import { useModalContext } from '@/components/Modal';
import { useDebounceFn, promiseTimeout } from '@vueuse/core';
import { footerHeight as layoutFooterHeight, layoutMultipleHeadePlaceholderTime } from '@/settings/designSetting';
import { useRootSetting } from '@/hooks/setting/useRootSetting';
const { getShowFooter, getFullContent } = useRootSetting();
export function useTableScroll(propsRef, tableElRef, columnsRef, rowSelectionRef, getDataSourceRef, wrapRef, formRef) {
    const tableHeightRef = ref(167);
    const modalFn = useModalContext();
    const debounceRedoHeight = useDebounceFn(redoHeight, 100);
    const getCanResize = computed(() => {
        const { canResize, scroll } = unref(propsRef);
        return canResize && !(scroll || {}).y;
    });
    watch(() => [unref(getCanResize), unref(getDataSourceRef)?.length, unref(getShowFooter)], () => {
        debounceRedoHeight();
    }, {
        flush: 'post'
    });
    watch(() => [unref(getFullContent)], async () => {
        await promiseTimeout(layoutMultipleHeadePlaceholderTime * 1000 + 200);
        debounceRedoHeight();
    }, {
        flush: 'post'
    });
    function redoHeight() {
        nextTick(() => {
            calcTableHeight();
        });
    }
    function setHeight(height) {
        tableHeightRef.value = height;
        modalFn?.redoModalHeight?.();
    }
    let paginationEl;
    let footerEl;
    let bodyEl;
    const tableWrapperPadding = 6;
    function handleScrollBar(bodyEl, tableEl) {
        const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight;
        const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth;
        if (hasScrollBarY) {
            tableEl.classList.contains('hide-scrollbar-y') &&
                tableEl.classList.remove('hide-scrollbar-y');
        }
        else {
            !tableEl.classList.contains('hide-scrollbar-y') &&
                tableEl.classList.add('hide-scrollbar-y');
        }
        if (hasScrollBarX) {
            tableEl.classList.contains('hide-scrollbar-x') &&
                tableEl.classList.remove('hide-scrollbar-x');
        }
        else {
            !tableEl.classList.contains('hide-scrollbar-x') &&
                tableEl.classList.add('hide-scrollbar-x');
        }
    }
    function caclPaginationHeight(tableEl) {
        const { pagination } = unref(propsRef);
        let paginationHeight = 0;
        if (!isBoolean(pagination)) {
            if (!paginationEl) {
                paginationEl = tableEl.querySelector('.ant-pagination');
            }
            if (paginationEl) {
                const paginationElMarginTop = parseInt(getComputedStyle(paginationEl).marginTop);
                const offsetHeight = paginationEl.offsetHeight;
                paginationHeight = offsetHeight + paginationElMarginTop;
            }
            else {
                paginationHeight = 10 + 24;
            }
        }
        else {
            paginationHeight = 0;
        }
        return paginationHeight;
    }
    function caclFooterHeight(tableEl) {
        const { pagination } = unref(propsRef);
        let footerHeight = 0;
        if (!isBoolean(pagination)) {
            if (!footerEl) {
                footerEl = tableEl.querySelector('.ant-table-footer');
            }
            else {
                const offsetHeight = footerEl.offsetHeight;
                footerHeight += offsetHeight || 0;
            }
        }
        return footerHeight;
    }
    function calcHeaderHeight(headEl) {
        let headerHeight = 0;
        if (headEl) {
            headerHeight = headEl.offsetHeight;
        }
        return headerHeight;
    }
    function calcBottomAndPaddingHeight(tableEl, headEl) {
        const { isCanResizeParent } = unref(propsRef);
        let bottomIncludeBody = 0;
        if (unref(wrapRef) && isCanResizeParent) {
            const wrapHeight = unref(wrapRef)?.offsetHeight ?? 0;
            let formHeight = unref(formRef)?.$el.offsetHeight ?? 0;
            if (formHeight) {
                formHeight += 16 + 16 * 2;
            }
            bottomIncludeBody = wrapHeight - tableWrapperPadding - formHeight;
        }
        else {
            bottomIncludeBody = getViewportOffset(headEl).bottomIncludeBody;
        }
        return bottomIncludeBody;
    }
    function calcModalHeight(tableEl) {
        let modalEl = null;
        let modalWrapEl = null;
        let modalFooterEl = null;
        let modalElIterator = tableEl.parentElement;
        let modalIsFullscreen = false;
        while (modalElIterator !== document.body) {
            if (modalElIterator.classList.contains('ant-modal')) {
                modalEl = modalElIterator;
                modalWrapEl = modalEl.parentElement;
                modalFooterEl = modalElIterator.querySelector('.ant-modal-content>.ant-modal-footer');
                modalIsFullscreen = modalWrapEl?.classList.contains('fullscreen-modal') ?? false;
                break;
            }
            modalElIterator = modalElIterator.parentElement;
        }
        if (modalEl) {
            const { top: modalTop = 0 } = modalEl ? getViewportOffset(modalEl) : {};
            const modalBottom = modalIsFullscreen ? 0 : 24;
            const modalFooterHeight = modalFooterEl?.offsetHeight ?? 0;
            const modalFooterMarginTop = modalFooterEl
                ? modalIsFullscreen
                    ? 0
                    : parseInt(getComputedStyle(modalFooterEl).marginTop)
                : 0;
            const modalScrollBarHeight = 14;
            return ((modalTop > modalBottom ? modalTop : modalBottom) +
                modalFooterHeight +
                modalFooterMarginTop +
                modalScrollBarHeight);
        }
        return 0;
    }
    function getMarginPaddingHeight() {
        const { isCanResizeParent } = unref(propsRef);
        if (unref(wrapRef) && isCanResizeParent) {
            return tableWrapperPadding;
        }
        return (tableWrapperPadding + 16);
    }
    async function calcTableHeight() {
        const { resizeHeightOffset, maxHeight } = unref(propsRef);
        const tableData = unref(getDataSourceRef);
        const table = unref(tableElRef);
        if (!table)
            return;
        const tableEl = table.$el;
        if (!tableEl)
            return;
        if (!bodyEl) {
            bodyEl = tableEl.querySelector('.ant-table-body');
            if (!bodyEl)
                return;
        }
        handleScrollBar(bodyEl, tableEl);
        bodyEl.style.height = 'unset';
        if (!unref(getCanResize) || !unref(tableData) || tableData.length === 0)
            return;
        await nextTick();
        const headEl = tableEl.querySelector('.ant-table-thead ');
        if (!headEl)
            return;
        const paginationHeight = caclPaginationHeight(tableEl);
        const footerHeight = caclFooterHeight(tableEl);
        const headerHeight = calcHeaderHeight(headEl);
        const bottomIncludeBody = calcBottomAndPaddingHeight(tableEl, headEl);
        const modalHeight = calcModalHeight(tableEl);
        const marginPaddingHeight = getMarginPaddingHeight();
        let height = Math.floor(bottomIncludeBody -
            (resizeHeightOffset || 0) -
            paginationHeight -
            footerHeight -
            headerHeight -
            modalHeight -
            (getShowFooter.value && modalHeight <= 0 ? layoutFooterHeight : 0) -
            marginPaddingHeight -
            1);
        height = (height > maxHeight ? maxHeight : height) ?? height;
        setHeight(height);
        bodyEl.style.height = `${height}px`;
    }
    useWindowSizeFn(calcTableHeight, { wait: 280 });
    onMountedOrActivated(() => {
        calcTableHeight();
        nextTick(() => {
            debounceRedoHeight();
        });
    });
    const getScrollX = computed(() => {
        let width = 0;
        if (unref(rowSelectionRef)) {
            width += 60;
        }
        const NORMAL_WIDTH = 150;
        const columns = unref(columnsRef).filter(item => !item.defaultHidden);
        columns.forEach(item => {
            width += Number.parseFloat(item.width) || 0;
        });
        const unsetWidthColumns = columns.filter(item => !Reflect.has(item, 'width') && item.ifShow !== false);
        const len = unsetWidthColumns.length;
        if (len !== 0) {
            width += len * NORMAL_WIDTH;
        }
        const table = unref(tableElRef);
        const tableWidth = table?.$el?.offsetWidth ?? 0;
        return tableWidth > width ? '100%' : width;
    });
    const getScrollRef = computed(() => {
        const tableHeight = unref(tableHeightRef);
        const { canResize, scroll } = unref(propsRef);
        return {
            x: unref(getScrollX),
            y: canResize ? tableHeight : null,
            scrollToFirstRowOnChange: false,
            ...scroll
        };
    });
    return { getScrollRef, redoHeight };
}
