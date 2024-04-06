<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from '@/hooks';
import { TABBAR } from '@/router';

const router = useRouter();
const _index = ref(0);

onTabItemTap((e) => {
    TABBAR.forEach((v, i) => {
        if (v.url.slice(1) === e.pagePath) {
            _index.value = i;
        }
    });
});

const handleChange = (e: any) => {
    _index.value = e;
};
const handleClick = (e: any) => {
    router({
        url: TABBAR[e].url,
        type: 'switchTab'
    });
};
</script>
<!-- TODO 
    底部 bar 自己写一个，可以不用这个 
    docs：https://uiadmin.net/uview-plus/components/TABBAR.html
-->
<template>
    <u-tabbar
        :value="_index"
        :fixed="false"
        :placeholder="false"
        :safeAreaInsetBottom="false"
        @change="handleChange"
    >
        <u-tabbar-item
            v-for="item in TABBAR"
            :key="item.url"
            :text="item.text"
            :icon="item.icon"
            @click="handleClick"
        />
    </u-tabbar>
</template>
