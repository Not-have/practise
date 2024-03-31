<script lang="ts" setup>
import Page from '@/components/page/index.vue';
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
    <Page class="">
        <button @click="handleClick">修改</button>
        <button @click="handleRouter"> 跳转 </button>
        {{ objTestStore }}

        <view class="center border-box text-xs"> 12 </view>

        <view class="i-ph-anchor-simple-thin" />
        <view class="i-mdi-alarm" />
        <view class="i-logos-vue" />
        <view class="i-carbon-sun" />
        <view class="i-ph-confetti-duotone" />
        <view class="i-octicon-accessibility-inset-16" />
    </Page>
</template>

<style scoped lang="scss">
.size {
    height: 20px;
    width: 30px;
    background-color: red;
}
</style>
