import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es';
import { unref } from 'vue';
import { isArray, isObject } from '@/utils/is';
export const noop = () => { };
export function getPopupContainer(node) {
    return node?.parentNode ?? document.body;
}
export function setObjToUrlParams(baseUrl, obj) {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
export function deepMerge(source, target, mergeArrays = 'replace') {
    if (!target) {
        return source;
    }
    if (!source) {
        return target;
    }
    return mergeWith({}, source, target, (sourceValue, targetValue) => {
        if (isArray(targetValue) && isArray(sourceValue)) {
            switch (mergeArrays) {
                case 'union':
                    return unionWith(sourceValue, targetValue, isEqual);
                case 'intersection':
                    return intersectionWith(sourceValue, targetValue, isEqual);
                case 'concat':
                    return sourceValue.concat(targetValue);
                case 'replace':
                    return targetValue;
                default:
                    throw new Error(`Unknown merge array strategy: ${mergeArrays}`);
            }
        }
        if (isObject(targetValue) && isObject(sourceValue)) {
            return deepMerge(sourceValue, targetValue, mergeArrays);
        }
        return undefined;
    });
}
export function openWindow(url, opt) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature = [];
    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');
    window.open(url, target, feature.join(','));
}
export function getDynamicProps(props) {
    const ret = {};
    Object.keys(props).map(key => {
        ret[key] = unref(props[key]);
    });
    return ret;
}
export function getRawRoute(route) {
    if (!route)
        return route;
    const { matched, ...opt } = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map(item => ({
                meta: item.meta,
                name: item.name,
                path: item.path
            }))
            : undefined)
    };
}
export const withInstall = (component, alias) => {
    component.install = (app) => {
        const compName = component.name || component.displayName;
        if (!compName)
            return;
        app.component(compName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component;
};
