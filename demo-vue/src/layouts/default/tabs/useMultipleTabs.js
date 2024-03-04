import { toRaw, ref, nextTick } from 'vue';
import { useDesign } from '@/hooks/web/useDesign';
import { useSortable } from '@/hooks/web/useSortable';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { isNil } from '@/utils/is';
import projectSetting from '@/settings/projectSetting';
import { useRouter } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
const { t } = useI18n();
export function initAffixTabs() {
    const affixList = ref([]);
    const tabStore = useMultipleTabStore();
    const router = useRouter();
    function filterAffixTabs(routes) {
        const tabs = [];
        routes &&
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    tabs.push(toRaw(route));
                }
            });
        return tabs;
    }
    function addAffixTabs() {
        const affixTabs = filterAffixTabs(router.getRoutes());
        affixList.value = affixTabs;
        for (const tab of affixTabs) {
            tabStore.addTab({
                meta: tab.meta,
                name: tab.name,
                path: tab.path
            });
        }
    }
    let isAddAffix = false;
    if (!isAddAffix) {
        addAffixTabs();
        isAddAffix = true;
    }
    return affixList.value.map(item => item.meta?.title).filter(Boolean);
}
export function useTabsDrag(affixTextList) {
    const tabStore = useMultipleTabStore();
    const { multiTabsSetting } = projectSetting;
    const { prefixCls } = useDesign('multiple-tabs');
    nextTick(() => {
        if (!multiTabsSetting.canDrag)
            return;
        const el = document.querySelectorAll(`.${prefixCls} .ant-tabs-nav-wrap > div`)?.[0];
        const { initSortable } = useSortable(el, {
            filter: (_evt, target) => {
                const text = target.innerText;
                if (!text)
                    return false;
                return affixTextList.map(res => t(res)).includes(text);
            },
            onEnd: evt => {
                const { oldIndex, newIndex } = evt;
                if (isNil(oldIndex) || isNil(newIndex) || oldIndex === newIndex) {
                    return;
                }
                tabStore.sortTabs(oldIndex, newIndex);
            }
        });
        initSortable();
    });
}
