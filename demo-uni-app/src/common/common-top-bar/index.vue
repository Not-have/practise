<!-- 
App.vue ——> onLaunch 加入：

也可使用 uni-nav-bar

https://zh.uniapp.dcloud.io/component/uniui/uni-nav-bar.html

import type { ComponentInternalInstance } from 'vue';
import { getCurrentInstance } from 'vue';
import { onLaunch } from '@dcloudio/uni-app';
const instance = getCurrentInstance() as ComponentInternalInstance;

onLaunch(() => {
    // onLaunch 加入的内容，用于计算刘海屏
    // https://blog.csdn.net/weixin_44596839/article/details/124358961
    const {
        appContext: {
            config: { globalProperties: global }
        }
    } = instance;
    uni.getSystemInfo({
        success: function (e) {
            if (!e) {
                throw new Error('获取刘海屏错误');
            }
            // #ifndef MP
            global.StatusBar = e.statusBarHeight;
            if (e.platform === 'android') {
                global.CustomBar = e.statusBarHeight || 0 + 50;
            } else {
                global.CustomBar = e.statusBarHeight || 0 + 45;
            }
            // #endif

            // #ifdef MP-WEIXIN
            global.StatusBar = e.statusBarHeight;
            let custom = wx.getMenuButtonBoundingClientRect();
            global.Custom = custom;
            global.CustomBar = custom.bottom + custom.top - (e.statusBarHeight || 0) + 4;
            // #endif

            // #ifdef MP-ALIPAY
            global.StatusBar = e.statusBarHeight;
            global.CustomBar = e.statusBarHeight || 0 + (e.titleBarHeight || 0);
            // #endif
        }
    });
});
 -->
<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue';
import { computed, defineProps } from 'vue';
import { getCurrentInstance } from 'vue';

const props = defineProps({
    isBack: {
        type: Boolean,
        default: false
    },
    backColor: {
        type: String,
        default: ''
    },
    bgColor: {
        type: String,
        default: '#000000'
    },
    bgImage: {
        type: String,
        default: ''
    }
});

const { appContext } = getCurrentInstance() as ComponentInternalInstance;

const { StatusBar, CustomBar } = appContext.config.globalProperties;
const style = computed(() => {
    let style = `height:${CustomBar}px; padding-top:${StatusBar}px;  background-image:${props.bgColor}; background-size: 100% 100%;`;
    if (props.bgImage) {
        style = `${style}background-image:url(${props.bgImage});`;
    }
    return style;
});

const handleClick = () => {
    uni.navigateBack({
        delta: 1
    });
};
</script>
<template>
    <view class="public-top-bar" :style="[{ height: CustomBar + 'px' }]">
        <view class="bar" :style="style" :class="[bgImage != '' ? ' text-white' : '', bgColor]">
            <view class="left" :style="[{ color: bgColor }]" @tap="handleClick" v-if="isBack">
                <slot name="left">
                    <uni-icons :color="bgColor" type="left" size="20" />
                </slot>
            </view>
            <view class="content" :style="[{ top: StatusBar + 'px' }]">
                <slot></slot>
            </view>
            <slot name="right"></slot>
        </view>
    </view>
</template>

<style scoped>
.public-top-bar {
    position: relative;
    width: 100%;
    /* 使 .public-top-bar 撑满屏幕宽度 */
}

/* 只让 bar 脱离 */
.public-top-bar .bar {
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9999;
    background-color: rgb(248, 248, 248);
    /* compatible */
    min-height: 0px;
    /* #ifdef MP-WEIXIN */
    padding-right: 220upx;
    /* #endif */
    /* #ifdef MP-ALIPAY */
    padding-right: 150upx;
    /* #endif */
    box-shadow: 0upx 0upx 0upx;
}

.public-top-bar .bar .left {
    display: flex;
    align-items: center;
    justify-content: center;
    /* compatible */
    /* #ifdef MP-ALIPAY */
    opacity: 0;
    /* #endif */
    margin-left: 30rpx;
    font-size: 36upx;
}

.public-top-bar .bar .left > text {
    margin-left: 0.5em;
}

.public-top-bar .bar .content {
    position: absolute;
    text-align: center;
    width: calc(100% - 340upx);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 60upx;
    font-size: 32upx;
    line-height: 60upx;
    font-weight: 600;
    cursor: none;
    pointer-events: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
