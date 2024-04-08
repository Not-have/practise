import type { ComponentPublicInstance } from 'vue';
import { onLoad as _onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance } from 'vue';
import type { IReturns } from './types';

/**
 * 获取当前路由信息
 *
 * 唯一缺点他是异步的，不是很完美
 *
 * 写在 onLoad 中
 *
 * @returns {Promise<IReturns>}
 */
export default function useRoute(): Promise<IReturns> {
    return new Promise((resolve, reason) => {
        _onLoad((e) => {
            let params = null;
            try {
                const instance = getCurrentInstance()!.proxy as ComponentPublicInstance;
                // @ts-ignore
                const eventChannel = instance.getOpenerEventChannel();

                eventChannel.on('acceptDataParams', function (data: any) {
                    params = data;
                });
            } catch (e) {
                new Error('获取信息路哟 params 信息错误：' + e);
            }
            try {
                const routes: any = getCurrentPages(); // 获取当前打开过的页面路由数组

                const query = e || routes[routes.length - 1].options;
                const location = routes[routes.length - 1].route;
                let referrer = '';
                if (routes.length > 2) {
                    referrer = routes[routes.length - 2].route;
                }

                resolve({
                    query,
                    location,
                    referrer,
                    params
                });
            } catch (e) {
                reason(e);
                throw new Error('获取信息路哟信息错误：' + e);
            }
        });
    });
}
