<template>
    <Card
        :tab-list="tabListTitle"
        v-bind="$attrs"
        :active-tab-key="activeKey"
        @tab-change="onTabChange"
    >
        <p v-if="activeKey === 'tab1'">
            <VisitAnalysis />
        </p>
        <p v-if="activeKey === 'tab2'">
            <VisitAnalysisBar />
        </p>
        <p v-if="activeKey === 'tab3'">
            <EchartsTest />
        </p>
    </Card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Card } from 'ant-design-vue';
import VisitAnalysis from './VisitAnalysis.vue';
import VisitAnalysisBar from './VisitAnalysisBar.vue';
import EchartsTest from './EchartsTest.vue';

const activeKey = ref('tab1');

const tabListTitle = [
    {
        key: 'tab1',
        tab: '流量趋势'
    },
    {
        key: 'tab2',
        tab: '访问量'
    },
    {
        key: 'tab3',
        tab: '数据修改测试'
    }
];

function onTabChange(key) {
    activeKey.value = key;
}
</script>
