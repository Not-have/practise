import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["AREA_RECORD"] = "/cascader/getAreaRecord";
})(Api || (Api = {}));
export const areaRecord = (data) => defHttp.post({ url: Api.AREA_RECORD, data });
