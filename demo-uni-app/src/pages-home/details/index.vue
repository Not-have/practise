<script lang="ts" setup>
import { useTestStore } from '@/store';
import { useRouter, useRoute } from '@/hooks';
const { objTestStore } = useTestStore();

const router = useRouter();
const handleClick = () => {
    router({
        type: 'navigateBack'
    });
};

useRoute().then((res) => {
    console.log(res);
});
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
