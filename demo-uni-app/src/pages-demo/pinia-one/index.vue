<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Page from '@/components/public-page/index.vue';
import { useTestOneStore } from '@/store';

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

        <hr />
        {{ objTestStore.age }}
        {{ objTestStore.name }}
    </Page>
</template>

<style scoped lang="scss"></style>
