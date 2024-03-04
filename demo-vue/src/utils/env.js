import pkg from '../../package.json';
import { API_ADDRESS } from '@/enums/cacheEnum';
export function getCommonStoragePrefix() {
    const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
    return `${VITE_GLOB_APP_TITLE.replace(/\s/g, '_')}__${getEnv()}`.toUpperCase();
}
export function getStorageShortName() {
    return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}
const getVariableName = (title) => {
    function strToHex(str) {
        const result = [];
        for (let i = 0; i < str.length; ++i) {
            const hex = str.charCodeAt(i).toString(16);
            result.push(('000' + hex).slice(-4));
        }
        return result.join('').toUpperCase();
    }
    return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '');
};
export function getAppEnvConfig() {
    const ENV_NAME = getVariableName(import.meta.env.VITE_GLOB_APP_TITLE);
    const ENV = import.meta.env.DEV
        ?
            import.meta.env
        : window[ENV_NAME];
    const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL_PREFIX, VITE_GLOB_UPLOAD_URL } = ENV;
    let { VITE_GLOB_API_URL } = ENV;
    if (localStorage.getItem(API_ADDRESS)) {
        const address = JSON.parse(localStorage.getItem(API_ADDRESS) || '{}');
        if (address?.key)
            VITE_GLOB_API_URL = address?.val;
    }
    return {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_API_URL_PREFIX,
        VITE_GLOB_UPLOAD_URL
    };
}
export const devMode = 'development';
export const prodMode = 'production';
export function getEnv() {
    return import.meta.env.MODE;
}
export function isDevMode() {
    return import.meta.env.DEV;
}
export function isProdMode() {
    return import.meta.env.PROD;
}
