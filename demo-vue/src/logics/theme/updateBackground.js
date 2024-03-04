import { colorIsDark, lighten, darken } from '@/utils/color';
import { useAppStore } from '@/store/modules/app';
import { ThemeEnum } from '@/enums/appEnum';
import { setCssVar } from './util';
const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';
const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';
export function updateHeaderBgColor(color) {
    const appStore = useAppStore();
    const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = '#151515';
        }
        else {
            color = appStore.getHeaderSetting.bgColor;
        }
    }
    setCssVar(HEADER_BG_COLOR_VAR, color);
    const hoverColor = lighten(color, 6);
    setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
    setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);
    const isDark = colorIsDark(color);
    appStore.setProjectConfig({
        headerSetting: {
            theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT
        }
    });
}
export function updateSidebarBgColor(color) {
    const appStore = useAppStore();
    const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = '#212121';
        }
        else {
            color = appStore.getMenuSetting.bgColor;
        }
    }
    setCssVar(SIDER_DARK_BG_COLOR, color);
    setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6));
    setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color, 5));
    const isLight = ['#fff', '#ffffff'].includes(color.toLowerCase());
    appStore.setProjectConfig({
        menuSetting: {
            theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK
        }
    });
}
