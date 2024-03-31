<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue';
import { getCurrentInstance } from 'vue';
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
const instance = getCurrentInstance() as ComponentInternalInstance;

onLaunch(() => {
    console.log('App Launch');
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
onShow(() => {
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>
<style lang="scss">
button {
    display: inline-block;
}
view,
:before,
:after {
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
}
page {
    height: 100%;
    width: 100%;
    background-color: red;
}
</style>
