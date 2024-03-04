import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["Login"] = "/login";
    Api["Logout"] = "/logout";
    Api["GetUserInfo"] = "/getUserInfo";
    Api["GetPermCode"] = "/getPermCode";
    Api["TestRetry"] = "/testRetry";
})(Api || (Api = {}));
export function loginApi(params, mode = 'modal') {
    return defHttp.post({
        url: Api.Login,
        params
    }, {
        errorMessageMode: mode
    });
}
export function getUserInfo() {
    return defHttp.get({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}
export function getPermCode() {
    return defHttp.get({ url: Api.GetPermCode });
}
export function doLogout() {
    return defHttp.get({ url: Api.Logout });
}
export function testRetry() {
    return defHttp.get({ url: Api.TestRetry }, {
        retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 1000
        }
    });
}
