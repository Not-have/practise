<script lang="ts" setup>
import { useTestStore } from '@/store';
import { useRouter } from '@/hooks';
const { objTestStore } = useTestStore();
let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
console.log(routes[routes.length - 1]);
const router = useRouter();
const handleClick = () => {
    router({
        type: 'navigateBack'
    });
};
</script>
<template>
    <view class="">
        <button @click="handleClick">返回</button>
        详情
        <br />
        {{ objTestStore }}
    </view>
</template>

<style scoped lang="scss"></style>
