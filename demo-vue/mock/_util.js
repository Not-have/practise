import { ResultEnum } from '@/enums/httpEnum';
export function resultSuccess(result, { message = 'ok' } = {}) {
    return {
        code: ResultEnum.SUCCESS,
        result,
        message,
        type: 'success'
    };
}
export function resultPageSuccess(page, pageSize, list, { message = 'ok' } = {}) {
    const pageData = pagination(page, pageSize, list);
    return {
        ...resultSuccess({
            items: pageData,
            total: list.length
        }),
        message
    };
}
export function resultError(message = 'Request failed', { code = ResultEnum.ERROR, result = null } = {}) {
    return {
        code,
        result,
        message,
        type: 'error'
    };
}
export function pagination(pageNo, pageSize, array) {
    const offset = (pageNo - 1) * Number(pageSize);
    return offset + Number(pageSize) >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + Number(pageSize));
}
export function getRequestToken({ headers }) {
    return headers?.authorization;
}
