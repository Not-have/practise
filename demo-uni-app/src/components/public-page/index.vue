<script lang="ts" setup>
import { defineProps } from 'vue';
import PublicTabbar from '../public-tabbar/index.vue';

const props = defineProps({
    topBar: {
        type: Boolean,
        default: false
    },
    footer: {
        type: Boolean,
        default: false
    }
});

onShow(() => {
    if (props.footer) {
        uni.hideTabBar();
        return;
    }
    uni.showTabBar();
});
</script>
<template>
    <view class="page flex flex-row">
        <slot name="topBar" v-if="topBar">
            <common-top-bar
                bg-image="https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG"
            />
        </slot>
        <view class="content"><slot></slot></view>
        <slot name="footer" v-if="footer">
            <PublicTabbar />
        </slot>
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
