<script lang="ts" setup>
import Page from '@/components/public-page/index.vue';
import { ERouter } from '@/enum';
import { useTestStore } from '@/store';
const { objTestStore, setPropertyTestStore } = useTestStore();
import { useRouter } from '@/hooks';

const handleClick = () => {
    setPropertyTestStore('age', 1);
    // setAllTestStore({
    //     name: '哈哈',
    //     age: 1
    // });
};
const router = useRouter();

const handleRouter = () => {
    router({
        type: 'navigateTo',
        url: ERouter.HOME_DETAILS,
        query: {
            name: '111'
        }
    });
};

console.log(uni.$u.trim(' abc '));
console.log(' abc ');
</script>
<template>
    <Page :topBar="true">
        <button @click="handleClick" id="text">修改</button>
        <button @click="handleRouter"> 跳转 </button>
        {{ objTestStore }}
    </Page>
</template>

<style scoped lang="scss"></style>
