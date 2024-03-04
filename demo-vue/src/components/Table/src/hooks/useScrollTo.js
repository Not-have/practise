import { nextTick, unref } from 'vue';
import { warn } from '@/utils/log';
export function useTableScrollTo(tableElRef, getDataSourceRef) {
    let bodyEl;
    async function findTargetRowToScroll(targetRowData) {
        const { id } = targetRowData;
        const targetRowEl = bodyEl?.querySelector(`[data-row-key="${id}"]`);
        await nextTick();
        bodyEl?.scrollTo({
            top: targetRowEl?.offsetTop ?? 0,
            behavior: 'smooth'
        });
    }
    function scrollTo(pos) {
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
        const dataSource = unref(getDataSourceRef);
        if (!dataSource)
            return;
        if (pos === 'top') {
            findTargetRowToScroll(dataSource[0]);
        }
        else if (pos === 'bottom') {
            findTargetRowToScroll(dataSource[dataSource.length - 1]);
        }
        else {
            const targetRowData = dataSource.find(data => data.id === pos);
            if (targetRowData) {
                findTargetRowToScroll(targetRowData);
            }
            else {
                warn(`id: ${pos} doesn't exist`);
            }
        }
    }
    return { scrollTo };
}
