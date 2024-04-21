<script lang="ts" setup>
import type { PropType } from 'vue';
import type { UniLoadMoreStatus } from '@uni-helper/uni-ui-types';
import { defineProps, defineEmits, computed } from 'vue';
import PublicTabbar from '../public-tabbar/index.vue';

interface ITopBarProps {
    /**
     * topBar 标题
     */
    title?: string;
    /**
     * topBar 返回按钮
     */
    isBack?: boolean;
    /**
     * topBar 背景颜色
     */
    bgColor?: string;
    /**
     * topBar 背景图
     */
    bgImage?: string;
}

const props = defineProps({
    topBar: {
        type: [Boolean, Object] as PropType<Boolean | ITopBarProps>
    },
    /**
     * 是否存在 tabbar
     */
    footer: {
        type: Boolean,
        default: false
    },
    /**
     * 页面加载 loading
     */
    loading: {
        type: Boolean,
        default: false
    },
    bgColor: {
        type: String
    },
    bgImage: {
        type: String,
        default: ''
    },
    scroll: {
        type: Boolean,
        default: false
    },
    /**
     * 分页列表
     */
    pagination: {
        type: Boolean,
        default: false
    },
    /**
     * 分页加载更多数据时展示的状态
     */
    moreStatus: {
        type: String as PropType<UniLoadMoreStatus>,
        default: undefined
    },
    /**
     * 下拉刷新
     */
    refreshStatus: {
        type: Boolean,
        default: false
    }
});

/*
// 可以不存在（没有人把 自定义和原生 tabbar 混合使用，除非傻逼）
onShow(() => {
    try {
        if (props.footer) {
            uni.hideTabBar();
            return;
        }
        uni.showTabBar();
    } catch (e) {
        console.error('不是tabbar', e);
    }
});
*/

const topBarProps = computed(() => {
    let obj = {
        topBar: false,
        title: '',
        isBack: false,
        bgColor: '',
        bgImage: ''
    };

    if (typeof props.topBar === 'boolean' && props.topBar) {
        obj.topBar = true;
    }
    if (typeof props.topBar === 'object') {
        obj = {
            topBar: true,
            // @ts-ignore
            title: props.topBar?.title,
            // @ts-ignore
            isBack: props.topBar?.isBack,
            // @ts-ignore
            bgColor: props.topBar?.bgColor,
            // @ts-ignore
            bgImage: props.topBar?.bgImage
        };
    }

    return obj;
});

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
        <slot name="topBar" v-if="topBarProps.topBar">
            <common-top-bar
                :isBack="topBarProps.isBack"
                :bgColor="topBarProps.bgColor"
                :bgImage="topBarProps.bgImage"
                >{{ topBarProps.title }}</common-top-bar
            >
        </slot>
        <view class="body">
            <!-- extra 是不跟随滚动 -->
            <slot name="extra"></slot>
            <scroll-view
                class="content border-box"
                :style="{ backgroundImage: `url(${bgImage})` }"
                :scroll-y="scroll"
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
        </view>
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
    background-color: v-bind('bgColor');
    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: $uni-spacing-col-base $uni-spacing-row-base;
        .content {
            flex: 1;
            overflow-y: auto;
            background-size: cover;
        }
    }
}
</style>
