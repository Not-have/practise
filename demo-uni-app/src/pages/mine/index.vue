<script setup lang="ts">
import PublicPage from '@/components/public-page/index.vue';
</script>

<template>
    <PublicPage :footer="true">
        <view class="uni-scss-test"> uni.scss 内置的常用样式变量测试 </view>
    </PublicPage>
</template>

<style scoped lang="scss">
.uni-scss-test {
    color: $uni-color-primary;
}
</style>
