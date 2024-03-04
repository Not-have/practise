import { nextTick, unref } from 'vue';
export function useSortable(el, options) {
    function initSortable() {
        nextTick(async () => {
            el = unref(el);
            if (!el)
                return;
            const Sortable = (await import('sortablejs')).default;
            Sortable.create(el, {
                animation: 100,
                delay: 400,
                delayOnTouchOnly: true,
                ...options
            });
        });
    }
    return { initSortable };
}
