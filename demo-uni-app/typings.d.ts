/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
declare const requirePlugin: (name: string) => any;
declare module 'uview-plus' {
    // TODO 为了解决 uview-plus 中 api 类型错误，不推荐
    global {
        interface Uni {
            $u: $u;
        }
    }
};