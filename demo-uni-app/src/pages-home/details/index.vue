<script lang="ts" setup>
import { useTestStore } from '@/store';
const { objTestStore } = useTestStore();

console.log(objTestStore);
</script>
<template>
    <view class="">
        详情
        <br />
        {{ objTestStore }}
    </view>
</template>

<style scoped lang="scss"></style>
