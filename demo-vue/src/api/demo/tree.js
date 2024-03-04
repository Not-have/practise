import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["TREE_OPTIONS_LIST"] = "/tree/getDemoOptions";
})(Api || (Api = {}));
export const treeOptionsListApi = (params) => defHttp.get({ url: Api.TREE_OPTIONS_LIST, params });
