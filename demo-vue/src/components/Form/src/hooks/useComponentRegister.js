import { tryOnUnmounted } from '@vueuse/core';
import { add, del } from '../componentMap';
import { isPascalCase } from '@/utils/is';
export function useComponentRegister(compName, comp) {
    if (!isPascalCase(compName)) {
        throw new Error('compName must be in PascalCase');
    }
    add(compName, comp);
    tryOnUnmounted(() => {
        del(compName);
    });
}
