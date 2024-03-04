import { clone } from 'lodash-es';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from '@/hooks/web/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString, isUndefined, isNull, isEmpty } from '@/utils/is';
import { getToken } from '@/utils/auth';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { useI18n } from '@/hooks/web/useI18n';
import { joinTimestamp, formatRequestDate } from './helper';
import { useUserStoreWithOut } from '@/store/modules/user';
import { AxiosRetry } from '@/utils/http/axios/axiosRetry';
import axios from 'axios';
const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal, createSuccessModal } = useMessage();
const transform = {
    transformResponseHook: (res, options) => {
        const { t } = useI18n();
        const { isTransformResponse, isReturnNativeResponse } = options;
        if (isReturnNativeResponse) {
            return res;
        }
        if (!isTransformResponse) {
            return res.data;
        }
        const { data } = res;
        if (!data) {
            throw new Error(t('sys.api.apiRequestFailed'));
        }
        const { code, result, message } = data;
        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
        if (hasSuccess) {
            let successMsg = message;
            if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
                successMsg = t(`sys.api.operationSuccess`);
            }
            if (options.successMessageMode === 'modal') {
                createSuccessModal({ title: t('sys.api.successTip'), content: successMsg });
            }
            else if (options.successMessageMode === 'message') {
                createMessage.success(successMsg);
            }
            return result;
        }
        let timeoutMsg = '';
        switch (code) {
            case ResultEnum.TIMEOUT:
                timeoutMsg = t('sys.api.timeoutMessage');
                const userStore = useUserStoreWithOut();
                userStore.logout(false);
                break;
            default:
                if (message) {
                    timeoutMsg = message;
                }
        }
        if (options.errorMessageMode === 'modal') {
            createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
        }
        else if (options.errorMessageMode === 'message') {
            createMessage.error(timeoutMsg);
        }
        throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
    },
    beforeRequestHook: (config, options) => {
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
        if (joinPrefix) {
            config.url = `${urlPrefix}${config.url}`;
        }
        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }
        const params = config.params || {};
        const data = config.data || false;
        formatDate && data && !isString(data) && formatRequestDate(data);
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
            }
            else {
                config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
                config.params = undefined;
            }
        }
        else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                if (Reflect.has(config, 'data') &&
                    config.data &&
                    (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
                    config.data = data;
                    config.params = params;
                }
                else {
                    config.data = params;
                    config.params = undefined;
                }
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url, Object.assign({}, config.params, config.data));
                }
            }
            else {
                config.url = config.url + params;
                config.params = undefined;
            }
        }
        return config;
    },
    requestInterceptors: (config, options) => {
        const token = getToken();
        if (token && config?.requestOptions?.withToken !== false) {
            config.headers.Authorization = options.authenticationScheme
                ? `${options.authenticationScheme} ${token}`
                : token;
        }
        return config;
    },
    responseInterceptors: (res) => {
        return res;
    },
    responseInterceptorsCatch: (axiosInstance, error) => {
        const { t } = useI18n();
        const errorLogStore = useErrorLogStoreWithOut();
        errorLogStore.addAjaxErrorInfo(error);
        const { response, code, message, config } = error || {};
        const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
        const msg = response?.data?.error?.message ?? '';
        const err = error?.toString?.() ?? '';
        let errMessage = '';
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                errMessage = t('sys.api.apiTimeoutMessage');
            }
            if (err?.includes('Network Error')) {
                errMessage = t('sys.api.networkExceptionMsg');
            }
            if (errMessage) {
                if (errorMessageMode === 'modal') {
                    createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
                }
                else if (errorMessageMode === 'message') {
                    createMessage.error(errMessage);
                }
                return Promise.reject(error);
            }
        }
        catch (error) {
            throw new Error(error);
        }
        checkStatus(error?.response?.status, msg, errorMessageMode);
        const retryRequest = new AxiosRetry();
        const { isOpenRetry } = config.requestOptions.retryRequest;
        config.method?.toUpperCase() === RequestEnum.GET &&
            isOpenRetry &&
            retryRequest.retry(axiosInstance, error);
        return Promise.reject(error);
    }
};
function createAxios(opt) {
    return new VAxios(deepMerge({
        authenticationScheme: '',
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        requestOptions: {
            joinPrefix: true,
            isReturnNativeResponse: false,
            isTransformResponse: true,
            joinParamsToUrl: false,
            formatDate: true,
            errorMessageMode: 'message',
            apiUrl: globSetting.apiUrl,
            urlPrefix: urlPrefix,
            joinTime: true,
            ignoreCancelToken: true,
            withToken: true,
            retryRequest: {
                isOpenRetry: true,
                count: 5,
                waitTime: 100
            }
        }
    }, opt || {}));
}
export const defHttp = createAxios();
