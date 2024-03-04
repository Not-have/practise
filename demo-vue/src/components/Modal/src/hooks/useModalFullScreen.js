import { computed, ref, unref } from 'vue';
export function useFullScreen(context) {
    const fullScreenRef = ref(false);
    const getWrapClassName = computed(() => {
        const clsName = unref(context.wrapClassName) || '';
        return unref(fullScreenRef) ? `fullscreen-modal ${clsName} ` : unref(clsName);
    });
    function handleFullScreen(e) {
        e && e.stopPropagation();
        fullScreenRef.value = !unref(fullScreenRef);
    }
    return { getWrapClassName, handleFullScreen, fullScreenRef };
}
