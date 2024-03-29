<template>
    <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
        <BasicTable @register="registerTable">
            <template #toolbar>
                <a-button type="primary" @click="handleReloadCurrent">刷新当前页</a-button>
                <a-button type="primary" @click="handleReload">刷新并返回第一页</a-button>
            </template>
        </BasicTable>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table';
import { getBasicColumns } from './tableData';
import { PageWrapper } from '@/components/Page';

import { demoListApi } from '@/api/demo/table';

const [registerTable, { reload }] = useTable({
    title: '远程加载示例',
    api: demoListApi,
    columns: getBasicColumns(),
    pagination: { pageSize: 10 }
});

console.log(registerTable);

function handleReloadCurrent() {
    reload();
    // 异步错误（Promise 拒绝）
    // new Promise((resolve, reject) => {
    //     reject('1111');
    // }).catch;
}

function handleReload() {
    reload({ page: 1 });
}
</script>
