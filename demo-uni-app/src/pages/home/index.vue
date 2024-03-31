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
    <view class="flex">
        <common-top-bar
            bg-image="https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG"
        />
        <button @click="handleClick">修改</button>
        <button @click="handleRouter"> 跳转 </button>
        {{ objTestStore }}
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>

        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>

        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>
        <view> 1 </view>

        <view> 1 </view>
        <view> 1 </view>
        <view> 12 </view>
    </view>
</template>

<style scoped lang="scss"></style>
