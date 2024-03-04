import { defHttp } from '@/utils/http/axios';
var Api;
(function (Api) {
    Api["AccountList"] = "/system/getAccountList";
    Api["IsAccountExist"] = "/system/accountExist";
    Api["DeptList"] = "/system/getDeptList";
    Api["setRoleStatus"] = "/system/setRoleStatus";
    Api["MenuList"] = "/system/getMenuList";
    Api["RolePageList"] = "/system/getRoleListByPage";
    Api["GetAllRoleList"] = "/system/getAllRoleList";
})(Api || (Api = {}));
export const getAccountList = (params) => defHttp.get({ url: Api.AccountList, params });
export const getDeptList = (params) => defHttp.get({ url: Api.DeptList, params });
export const getMenuList = (params) => defHttp.get({ url: Api.MenuList, params });
export const getRoleListByPage = (params) => defHttp.get({ url: Api.RolePageList, params });
export const getAllRoleList = (params) => defHttp.get({ url: Api.GetAllRoleList, params });
export const setRoleStatus = (id, status) => defHttp.post({ url: Api.setRoleStatus, params: { id, status } });
export const isAccountExist = (account) => defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
