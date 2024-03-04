import { ref, getCurrentInstance, unref } from 'vue';
import { isProdMode } from '@/utils/env';
export function useDescription(props) {
    if (!getCurrentInstance()) {
        throw new Error('useDescription() can only be used inside setup() or functional components!');
    }
    const desc = ref(null);
    const loaded = ref(false);
    function register(instance) {
        if (unref(loaded) && isProdMode()) {
            return;
        }
        desc.value = instance;
        props && instance.setDescProps(props);
        loaded.value = true;
    }
    const methods = {
        setDescProps: (descProps) => {
            unref(desc)?.setDescProps(descProps);
        }
    };
    return [register, methods];
}
