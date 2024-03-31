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
        <u-button type="primary" text="确定" />
        <u-button type="primary" :plain="true" text="镂空" />
        <u-button type="primary" :plain="true" :hairline="true" text="细边" />
        <u-button type="primary" text="禁用" />
        <u-button type="primary" loading loadingText="加载中" />
        <u-button type="primary" icon="map" text="图标按钮" />
        <u-button type="primary" shape="circle" text="按钮形状" />
        <u-button
            text="渐变色按钮"
            color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        />
        <u-button type="primary" size="small" text="大小尺寸" />
    </Page>
</template>

<style scoped lang="scss"></style>
