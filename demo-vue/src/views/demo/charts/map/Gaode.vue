<template>
    <div ref="wrapRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
/**
 * js API 的使用
 */
import { ref, nextTick, unref, onMounted } from 'vue';
import { useScript } from '@/hooks/web/useScript';
import { defHttp } from '@/utils/http/axios';

defineOptions({ name: 'AMap' });

defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: 'calc(100vh - 78px)'
    }
});

const A_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=b2837cddf98a7704c3bd74124c95eff3';

const wrapRef = ref<HTMLDivElement | null>(null);
const { toPromise } = useScript({ src: A_MAP_URL });

async function initMap() {
    await toPromise();
    await nextTick();
    const wrapEl = unref(wrapRef);
    if (!wrapEl) return;
    const AMap = (window as any).AMap;
    new AMap.Map(wrapEl, {
        zoom: 11,
        center: [116.397428, 39.90923],
        viewMode: '3D'
    });
}

onMounted(async () => {
    await initMap();
});
defHttp
    .get(
        {
            url: 'https://restapi.amap.com/v3/geocode/geo',
            params: {
                key: '81bf5e40aa237acda7ce5e349ab0e400',
                address: '北京市朝阳区阜通东大街6号'
            }
        },
        {
            joinPrefix: false,
            apiUrl: '',
            isReturnNativeResponse: true
        }
    )
    .then(res => {
        console.log(res);
    });
</script>
