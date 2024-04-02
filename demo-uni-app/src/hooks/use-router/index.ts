import type { TOptions } from './types';
import { queryParams } from '@/utils';

function addRootPath(url: string): string {
    return url[0] === '/' ? url : `/${url}`;
}

function mixinQuery(url: string, params: Record<string, any>): string {
    url = url && addRootPath(url);

    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    let query = '';
    if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return (url += `&${query}`);
    }
    // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
    query = queryParams(params);
    return (url += query);
}

export default function useRouter(): (options: string | TOptions) => void {
    return function (options: string | TOptions) {
        let _url = '';
        if (typeof options === 'string') {
            _url = options;
        }

        // @ts-ignore
        const { type = 'default', url, query = {}, params, ...args } = options;
        const urlQuery = mixinQuery(url || _url, query);

        switch (type) {
            case 'default':
            case 'navigateTo':
                uni.navigateTo({
                    url: urlQuery,
                    animationType: args.animationType,
                    animationDuration: args.animationDuration,
                    success: (res) => {
                        if (params) res.eventChannel.emit('acceptDataParams', args.params);
                    }
                });
                break;
            case 'redirectTo':
                uni.redirectTo({
                    url: urlQuery
                });
                break;
            case 'reLaunch':
                uni.reLaunch({
                    url: urlQuery
                });
            case 'switchTab': {
                uni.switchTab({
                    url: url
                });
                break;
            }
            case 'navigateBack': {
                uni.navigateBack({
                    delta: args.delta,
                    animationType: args.animationType,
                    animationDuration: args.animationDuration
                });
                break;
            }
            default:
                throw new Error('参数错误');
        }
    };
}
