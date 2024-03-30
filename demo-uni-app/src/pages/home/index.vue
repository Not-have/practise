<script lang="ts" setup>
import { ERouter } from '@/enum';
import { useTestStore } from '@/store';
const { objTestStore, setPropertyTestStore } = useTestStore();

const handleClick = () => {
    setPropertyTestStore('age', 1);
    // setAllTestStore({
    //     name: '哈哈',
    //     age: 1
    // });
};

const handleRouter = () => {
    uni.navigateTo({ url: ERouter.HOME_DETAILS });
};
</script>
<template>
    <view class="">
        <button @click="handleClick">修改</button>
        <button @click="handleRouter"> 跳转 </button>
        {{ objTestStore }}
    </view>
</template>

<style scoped lang="scss"></style>
