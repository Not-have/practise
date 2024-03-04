import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["OPTIONS_LIST"] = "/select/getDemoOptions";
})(Api || (Api = {}));
export const optionsListApi = (params) => defHttp.get({ url: Api.OPTIONS_LIST, params });
