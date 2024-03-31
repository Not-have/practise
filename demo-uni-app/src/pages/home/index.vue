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
        <common-top-bar
            bg-image="https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG"
        />
        <button @click="handleClick">修改</button>
        <button @click="handleRouter"> 跳转 </button>
        {{ objTestStore }}

        <view class="center border-box"> 12 </view>
        <view class="space-y-5 flex flex-col justify-center items-center">
            <view class="i-ph-anchor-simple-thin text-lg" />
            <view class="i-mdi-alarm text-orange-400 text-xl" />
            <view class="i-logos-vue text-3xl" />
            <view class="i-carbon-sun" />
        </view>
    </view>
</template>

<style scoped lang="scss">
.size {
    height: 20px;
    width: 30px;
    background-color: red;
}
</style>
