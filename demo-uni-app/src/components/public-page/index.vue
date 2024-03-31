<script lang="ts" setup>
import PublicTabbar from '../public-tabbar/index.vue';
</script>
<template>
    <view class="page flex flex-row">
        <common-top-bar
            bg-image="https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG"
        />
        <view class="content"><slot></slot></view>
        <view class="footer">
            <PublicTabbar />
        </view>
    </view>
</template>

<style scoped lang="scss">
.page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
    }
}
</style>
