import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["ACCOUNT_INFO"] = "/account/getAccountInfo";
    Api["SESSION_TIMEOUT"] = "/user/sessionTimeout";
    Api["TOKEN_EXPIRED"] = "/user/tokenExpired";
})(Api || (Api = {}));
export const accountInfoApi = () => defHttp.get({ url: Api.ACCOUNT_INFO });
export const sessionTimeoutApi = () => defHttp.post({ url: Api.SESSION_TIMEOUT });
export const tokenExpiredApi = () => defHttp.post({ url: Api.TOKEN_EXPIRED });
