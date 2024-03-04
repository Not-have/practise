import { mitt } from '@/utils/mitt';
import { getRawRoute } from '@/utils';
const key = Symbol();
const emitter = mitt();
let lastChangeTab;
export function setRouteChange(lastChangeRoute) {
    const r = getRawRoute(lastChangeRoute);
    emitter.emit(key, r);
    lastChangeTab = r;
}
export function listenerRouteChange(callback, immediate = true) {
    emitter.on(key, callback);
    immediate && lastChangeTab && callback(lastChangeTab);
}
export function removeTabChangeListener() {
    emitter.clear();
}
