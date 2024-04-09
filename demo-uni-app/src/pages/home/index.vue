<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Page from '@/components/public-page/index.vue';
import { ERouter } from '@/router';
import { useTestOneStore } from '@/store';

import { useRouter } from '@/hooks';

const testStore = useTestOneStore();
const { objTestStore } = storeToRefs(testStore);
const { setAllTestStore, setPropertyTestStore } = testStore;

const handleClick = () => {
    setPropertyTestStore('age', 1);
};
const handleAllClick = () => {
    setAllTestStore({
        name: '哈哈',
        age: 333
    });
};
const router = useRouter();

const handleRouter = () => {
    router({
        type: 'navigateTo',
        url: ERouter.HOME_DETAILS,
        query: {
            name: '111',
            arr: [1, 2, 3, 4, 5, 'wwwws']
        },
        params: {
            a: 222
        }
    });
};

console.log(uni.$u.trim(' abc '));
console.log(' abc ');
</script>
<template>
    <Page
        :topBar="{
            title: '11111',
            bgImage: 'https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG'
        }"
    >
        <button @click="handleClick">修改</button>
        <button @click="handleAllClick">全量修改</button>

        <button @click="handleRouter"> 跳转 </button>
        <hr />
        {{ objTestStore.age }}
        {{ objTestStore.name }}
    </Page>
</template>

<style scoped lang="scss"></style>
