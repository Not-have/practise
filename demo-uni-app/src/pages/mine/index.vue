<script setup lang="ts">
import { useWeChatOpenId, useWeChatPhoneNumber as handlePhoneNumberClick } from '@/hooks';

// eslint-disable-next-line no-unused-vars
const initWeChatOpenId = () => {
    useWeChatOpenId().then((res) => {
        console.log(res);
    });
};
</script>

<template>
    <view class="">
        <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumberClick"
            >获取手机号</button
        >
        <view class="uni-scss-test"> uni.scss 内置的常用样式变量测试 </view>
    </view>
</template>

<style scoped lang="scss">
.uni-scss-test {
    color: $uni-color-primary;
}
</style>
