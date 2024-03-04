import { computed, unref, reactive } from 'vue';
import { MenuEventEnum } from './types';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useRouter } from 'vue-router';
import { useTabs } from '@/hooks/web/useTabs';
import { useI18n } from '@/hooks/web/useI18n';
export function useTabDropdown(tabContentProps, getIsTabs) {
    const state = reactive({
        current: null,
        currentIndex: 0
    });
    const { t } = useI18n();
    const tabStore = useMultipleTabStore();
    const { currentRoute } = useRouter();
    const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();
    const getTargetTab = computed(() => {
        return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
    });
    const getDropMenuList = computed(() => {
        if (!unref(getTargetTab)) {
            return;
        }
        const { meta } = unref(getTargetTab);
        const { path } = unref(currentRoute);
        const curItem = state.current;
        const isCurItem = curItem ? curItem.path === path : false;
        const index = state.currentIndex;
        const refreshDisabled = !isCurItem;
        const closeLeftDisabled = index === 0 || !isCurItem;
        const disabled = tabStore.getTabList.length === 1;
        const closeRightDisabled = !isCurItem ||
            (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
        const dropMenuList = [
            {
                icon: 'ion:reload-sharp',
                event: MenuEventEnum.REFRESH_PAGE,
                text: t('layout.multipleTab.reload'),
                disabled: refreshDisabled
            },
            {
                icon: 'clarity:close-line',
                event: MenuEventEnum.CLOSE_CURRENT,
                text: t('layout.multipleTab.close'),
                disabled: !!meta?.affix || disabled,
                divider: true
            },
            {
                icon: 'line-md:arrow-close-left',
                event: MenuEventEnum.CLOSE_LEFT,
                text: t('layout.multipleTab.closeLeft'),
                disabled: closeLeftDisabled,
                divider: false
            },
            {
                icon: 'line-md:arrow-close-right',
                event: MenuEventEnum.CLOSE_RIGHT,
                text: t('layout.multipleTab.closeRight'),
                disabled: closeRightDisabled,
                divider: true
            },
            {
                icon: 'dashicons:align-center',
                event: MenuEventEnum.CLOSE_OTHER,
                text: t('layout.multipleTab.closeOther'),
                disabled: disabled || !isCurItem
            },
            {
                icon: 'clarity:minus-line',
                event: MenuEventEnum.CLOSE_ALL,
                text: t('layout.multipleTab.closeAll'),
                disabled: disabled
            }
        ];
        return dropMenuList;
    });
    function handleContextMenu(tabItem) {
        return (e) => {
            if (!tabItem) {
                return;
            }
            e?.preventDefault();
            const index = tabStore.getTabList.findIndex(tab => tab.path === tabItem.path);
            state.current = tabItem;
            state.currentIndex = index;
        };
    }
    function handleMenuEvent(menu) {
        const { event } = menu;
        switch (event) {
            case MenuEventEnum.REFRESH_PAGE:
                refreshPage();
                break;
            case MenuEventEnum.CLOSE_CURRENT:
                close(tabContentProps.tabItem);
                break;
            case MenuEventEnum.CLOSE_LEFT:
                closeLeft();
                break;
            case MenuEventEnum.CLOSE_RIGHT:
                closeRight();
                break;
            case MenuEventEnum.CLOSE_OTHER:
                closeOther();
                break;
            case MenuEventEnum.CLOSE_ALL:
                closeAll();
                break;
        }
    }
    return { getDropMenuList, handleMenuEvent, handleContextMenu };
}
