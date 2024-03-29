import type { IData0 } from '../types';
import initRequest from '../init-request';

/**
 * 真实的后台数据响应
 */
export default async function dataResponse<T>({
    url,
    data,
    method,
    ...params
}: UniNamespace.RequestOptions): Promise<T> {
    let token;
    try {
        token = uni.getStorageSync(import.meta.env.VITE_TOKEN_NAME);
    } catch (e) {
        throw new Error(`token error: ${e}`);
    }

    const headerToken = {
        authorization: token ? `Bearer ${token}` : null
    };

    if (!/^https?:\/\//i.test(url)) {
        url = `${import.meta.env.VITE_BASE_URL}${url}`;
    }

    try {
        const data0: IData0<T> = await initRequest({
            url,
            data,
            method,
            header: {
                ...params.header,
                ...headerToken
            },
        });
        /**
         * 401 令牌失效
         */
        if (data0.code === 401) {
            uni.clearStorage();
        }

        let errStr = '';
        if (data0.code !== 200) {
            if (/^[a-zA-Z0-9.,!?]+$/.test(data0.msg || '')) {
                errStr = data0.msg.length > 10 ? 'Request failed' : data0.msg;
            }

            if (/[\u4E00-\u9FA5]+.*[.,!?]+.*[0-9]+/.test(data0.msg) || /[a-zA-Z]+.*[.,!?]+.*[0-9]+/.test(data0.msg)) {
                errStr = data0.msg.length > 7 ? '网络请求失败' : data0.msg;
            }

            uni.showToast({
                title: errStr || 'Request failed',
                icon: 'error'
            });

            throw data0;
        }

        return data0?.data;
    } catch (err) {
        throw err;
    }
}