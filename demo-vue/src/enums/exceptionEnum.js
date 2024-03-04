export var ExceptionEnum;
(function (ExceptionEnum) {
    ExceptionEnum[ExceptionEnum["PAGE_NOT_ACCESS"] = 403] = "PAGE_NOT_ACCESS";
    ExceptionEnum[ExceptionEnum["PAGE_NOT_FOUND"] = 404] = "PAGE_NOT_FOUND";
    ExceptionEnum[ExceptionEnum["ERROR"] = 500] = "ERROR";
    ExceptionEnum[ExceptionEnum["NET_WORK_ERROR"] = 10000] = "NET_WORK_ERROR";
    ExceptionEnum[ExceptionEnum["PAGE_NOT_DATA"] = 10100] = "PAGE_NOT_DATA";
})(ExceptionEnum || (ExceptionEnum = {}));
export var ErrorTypeEnum;
(function (ErrorTypeEnum) {
    ErrorTypeEnum["VUE"] = "vue";
    ErrorTypeEnum["SCRIPT"] = "script";
    ErrorTypeEnum["RESOURCE"] = "resource";
    ErrorTypeEnum["AJAX"] = "ajax";
    ErrorTypeEnum["PROMISE"] = "promise";
})(ErrorTypeEnum || (ErrorTypeEnum = {}));
