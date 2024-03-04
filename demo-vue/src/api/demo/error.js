import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["Error"] = "/error";
})(Api || (Api = {}));
export const fireErrorApi = () => defHttp.get({ url: Api.Error });
