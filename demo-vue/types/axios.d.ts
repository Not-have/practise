export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
    // 将请求参数拼接到 url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    // 是否处理请求结果
    isTransformResponse?: boolean;
    // 是否返回本机响应标头
    // 例如：当需要获取响应标头时，请使用此属性
    isReturnNativeResponse?: boolean;
    // 是否加入网址
    joinPrefix?: boolean;
    // 接口地址，如果留空，请使用默认的 apiUrl
    apiUrl?: string;
    // 请求拼接路径
    urlPrefix?: string;
    // 错误消息提示类型
    errorMessageMode?: ErrorMessageMode;
    // 成功消息提示类型
    successMessageMode?: SuccessMessageMode;
    // 是否添加时间戳
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    // 是否在标头中发送令牌
    withToken?: boolean;
    // 请求重试机制
    retryRequest?: RetryRequest;
}

export interface RetryRequest {
    isOpenRetry: boolean;
    count: number;
    waitTime: number;
}
export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
    // Other parameters
    data?: Recordable;
    // File parameter interface field name
    name?: string;
    // file name
    file: File | Blob;
    // file name
    filename?: string;
    [key: string]: any;
}
