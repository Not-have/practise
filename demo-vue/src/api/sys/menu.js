import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["GetMenuList"] = "/getMenuList";
})(Api || (Api = {}));
export const getMenuList = () => {
    return defHttp.get({ url: Api.GetMenuList });
};
