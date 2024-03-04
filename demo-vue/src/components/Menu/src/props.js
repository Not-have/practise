import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { ThemeEnum } from '@/enums/appEnum';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
    items: {
        type: Array,
        default: () => []
    },
    collapsedShowTitle: propTypes.bool,
    inlineIndent: propTypes.number.def(20),
    mode: {
        type: String,
        default: MenuModeEnum.INLINE
    },
    type: {
        type: String,
        default: MenuTypeEnum.MIX
    },
    theme: {
        type: String,
        default: ThemeEnum.DARK
    },
    inlineCollapsed: propTypes.bool,
    mixSider: propTypes.bool,
    isHorizontal: propTypes.bool,
    accordion: propTypes.bool.def(true),
    beforeClickFn: {
        type: Function
    }
};
export const itemProps = {
    item: {
        type: Object,
        default: () => ({})
    },
    level: propTypes.number,
    theme: propTypes.oneOf(['dark', 'light']),
    showTitle: propTypes.bool,
    isHorizontal: propTypes.bool
};
export const contentProps = {
    item: {
        type: Object,
        default: null
    },
    showTitle: propTypes.bool.def(true),
    level: propTypes.number.def(0),
    isHorizontal: propTypes.bool.def(true)
};
