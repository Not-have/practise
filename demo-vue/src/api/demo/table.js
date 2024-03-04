import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["DEMO_LIST"] = "/table/getDemoList";
})(Api || (Api = {}));
export const demoListApi = (params) => defHttp.get({
    url: Api.DEMO_LIST,
    params,
    headers: {
        ignoreCancelToken: true
    }
});
