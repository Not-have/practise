// https://www.jianshu.com/p/ddd984e9d197

import request from './data-response';

interface IConfig extends Omit<UniNamespace.RequestOptions, 'method' | 'url' | 'data'> {}

function fetch(conf?: UniNamespace.RequestOptions) {
    function get<D, Q extends string | AnyObject>(
        url: string,
        params?: Q,
        config?: IConfig
    ): Promise<D> {
        return request<D>({
            ...conf,
            url,
            method: 'GET',
            data: params,
            header: {
                ...config?.header
            },
            ...config
        });
    }

    function post<D, Q extends string | AnyObject>(
        url: string,
        params?: Q,
        config?: IConfig
    ): Promise<D | null> {
        return request<D>({
            ...conf,
            url,
            method: 'POST',
            data: params,
            header: {
                ...config?.header
            },
            ...config
        });
    }

    return {
        get,
        post
    };
}

export default fetch();

/**
 * request 使用 request 去外部兼容历史
 */
export { request, fetch };
