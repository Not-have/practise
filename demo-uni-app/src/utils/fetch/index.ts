// https://www.jianshu.com/p/ddd984e9d197
/*
/api/basic/v1/ :基础信息的前缀，包括房屋、行政区域、小区
/api/dispatch/v1/ :维修单相关所有的网关前缀
/api/system/v1/ ：用户、角色、员工、公司、区域设置  http://192.168.0.3:18502/doc.html#/home
/api/sso/v1/ ：登录注册、忘记密码
/api/config/v1/ ：配置相关前缀包括banner、三方小程序等
 */
import request from './data-response';

interface IConfig extends Omit<UniNamespace.RequestOptions, 'method' | 'url' | 'data'> { }

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
