import { componentMap } from '@/components/Table/src/componentMap';
import { Popover } from 'ant-design-vue';
import { h } from 'vue';
export const CellComponent = ({ component = 'Input', rule = true, ruleMessage, popoverVisible, getPopupContainer }, { attrs }) => {
    const Comp = componentMap.get(component);
    const DefaultComp = h(Comp, attrs);
    if (!rule) {
        return DefaultComp;
    }
    return h(Popover, {
        overlayClassName: 'edit-cell-rule-popover',
        open: !!popoverVisible,
        ...(getPopupContainer ? { getPopupContainer } : {})
    }, {
        default: () => DefaultComp,
        content: () => ruleMessage
    });
};
