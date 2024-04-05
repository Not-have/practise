<script lang="ts" setup>
import type { PropType } from 'vue';
import type { UniLoadMoreStatus } from '@uni-helper/uni-ui-types';
import { defineProps, defineEmits } from 'vue';
import PublicTabbar from '../public-tabbar/index.vue';

const props = defineProps({
    topBar: {
        type: Boolean
    },
    title: {
        type: String
    },
    isBack: {
        type: Boolean
    },
    bgColor: {
        type: String
    },
    bgImage: {
        type: String
    },
    footer: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    pagination: {
        type: Boolean,
        default: false
    },
    moreStatus: {
        type: String as PropType<UniLoadMoreStatus>,
        default: undefined
    },
    refreshStatus: {
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

console.log(props.loading);

const emit = defineEmits(['moreData', 'refreshData']);

const handleRefresherrefresh = () => {
    emit('refreshData');
};
const handleScrolltolower = () => {
    emit('moreData');
};
</script>
<template>
    <view class="page flex flex-row">
        <common-loading v-if="loading" />
        <slot name="topBar" v-if="topBar">
            <common-top-bar :isBack="isBack" :bgColor="bgColor" :bgImage="bgImage">{{
                title
            }}</common-top-bar>
        </slot>
        <scroll-view
            class="content border-box"
            :scroll-y="true"
            :refresher-enabled="pagination"
            :refresher-triggered="refreshStatus"
            :refresher-threshold="100"
            :lower-threshold="100"
            refresher-background="#f7f7f7"
            @refresherrefresh="handleRefresherrefresh"
            @scrolltolower="handleScrolltolower"
        >
            <slot></slot>
            <uni-load-more v-if="pagination" iconType="circle" :status="moreStatus" />
        </scroll-view>
        <view class="footer" v-if="footer">
            <slot name="footer">
                <PublicTabbar />
            </slot>
        </view>
    </view>
</template>

<style scoped lang="scss">
.page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content {
        flex: 1;
        overflow-y: auto;
        padding: $uni-spacing-col-base $uni-spacing-row-base;
    }
}
</style>
