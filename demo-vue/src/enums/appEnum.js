export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;
export var ContentEnum;
(function (ContentEnum) {
    ContentEnum["FULL"] = "full";
    ContentEnum["FIXED"] = "fixed";
})(ContentEnum || (ContentEnum = {}));
export var ThemeEnum;
(function (ThemeEnum) {
    ThemeEnum["DARK"] = "dark";
    ThemeEnum["LIGHT"] = "light";
})(ThemeEnum || (ThemeEnum = {}));
export var SettingButtonPositionEnum;
(function (SettingButtonPositionEnum) {
    SettingButtonPositionEnum["AUTO"] = "auto";
    SettingButtonPositionEnum["HEADER"] = "header";
    SettingButtonPositionEnum["FIXED"] = "fixed";
})(SettingButtonPositionEnum || (SettingButtonPositionEnum = {}));
export var SessionTimeoutProcessingEnum;
(function (SessionTimeoutProcessingEnum) {
    SessionTimeoutProcessingEnum[SessionTimeoutProcessingEnum["ROUTE_JUMP"] = 0] = "ROUTE_JUMP";
    SessionTimeoutProcessingEnum[SessionTimeoutProcessingEnum["PAGE_COVERAGE"] = 1] = "PAGE_COVERAGE";
})(SessionTimeoutProcessingEnum || (SessionTimeoutProcessingEnum = {}));
export var PermissionModeEnum;
(function (PermissionModeEnum) {
    PermissionModeEnum["ROLE"] = "ROLE";
    PermissionModeEnum["BACK"] = "BACK";
    PermissionModeEnum["ROUTE_MAPPING"] = "ROUTE_MAPPING";
})(PermissionModeEnum || (PermissionModeEnum = {}));
export var RouterTransitionEnum;
(function (RouterTransitionEnum) {
    RouterTransitionEnum["ZOOM_FADE"] = "zoom-fade";
    RouterTransitionEnum["ZOOM_OUT"] = "zoom-out";
    RouterTransitionEnum["FADE_SIDE"] = "fade-slide";
    RouterTransitionEnum["FADE"] = "fade";
    RouterTransitionEnum["FADE_BOTTOM"] = "fade-bottom";
    RouterTransitionEnum["FADE_SCALE"] = "fade-scale";
})(RouterTransitionEnum || (RouterTransitionEnum = {}));
