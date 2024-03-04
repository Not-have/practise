import { i18n } from '@/locales/setupI18n';
function getKey(namespace, key) {
    if (!namespace) {
        return key;
    }
    if (key.startsWith(namespace)) {
        return key;
    }
    return `${namespace}.${key}`;
}
export function useI18n(namespace) {
    const normalFn = {
        t: (key) => {
            return getKey(namespace, key);
        }
    };
    if (!i18n) {
        return normalFn;
    }
    const { t, ...methods } = i18n.global;
    const tFn = (key, ...arg) => {
        if (!key)
            return '';
        if (!key.includes('.') && !namespace)
            return key;
        return t(getKey(namespace, key), ...arg);
    };
    return {
        ...methods,
        t: tFn
    };
}
export const t = (key) => key;
