<script lang="ts" setup></script>
<template>
    <view class="center border-box text-xs"> 12 </view>

    <view class="i-ph-anchor-simple-thin" />
    <view class="i-mdi-alarm" />
    <view class="i-logos-vue" />
    <view class="i-carbon-sun" />
    <view class="i-ph-confetti-duotone" />
    <view class="i-octicon-accessibility-inset-16" />
    <u-button type="primary" text="确定" />
    <u-button type="primary" :plain="true" text="镂空" />
    <u-button type="primary" :plain="true" :hairline="true" text="细边" />
    <u-button type="primary" text="禁用" />
    <u-button type="primary" loading loadingText="加载中" />
    <u-button type="primary" icon="map" text="图标按钮" />
    <u-button type="primary" shape="circle" text="按钮形状" />
    <u-button
        text="渐变色按钮"
        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
    />
    <u-button type="primary" size="small" text="大小尺寸" />
</template>

<style scoped lang="scss"></style>
