<template>
    <u-tabbar :value="1" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false">
        <u-tabbar-item text="首页" icon="home" @click="click1" />
        <u-tabbar-item text="放映厅" icon="photo" @click="click1" />
        <u-tabbar-item text="直播" icon="play-right" @click="click1" />
        <u-tabbar-item text="我的" icon="account" @click="click1" />
    </u-tabbar>
</template>
