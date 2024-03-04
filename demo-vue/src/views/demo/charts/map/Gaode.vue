<!-- <template>
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

// @ts-ignore
window._AMapSecurityConfig = {
    securityJsCode: 'fff1bf0b56dc683882069ac1cec2b3e0'
};

const A_MAP_URL =
    'https://webapi.amap.com/maps?v=2.0&key=b2837cddf98a7704c3bd74124c95eff3&plugin=AMap.Walking';

const wrapRef = ref<HTMLDivElement | null>(null);
const { toPromise } = useScript({ src: A_MAP_URL });

async function initMap() {
    await toPromise();
    await nextTick();
    const wrapEl = unref(wrapRef);
    if (!wrapEl) return;
    const AMap = (window as any).AMap;
    var map = new AMap.Map(wrapEl, {
        resizeEnable: true,
        zoom: 11,
        center: [108.962073, 34.312406],
        viewMode: '3D'
    });

    // const marker = new AMap.Marker({
    //     icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    //     position: [108.962073, 34.312406],
    //     offset: new AMap.Pixel(-13, -60)
    // });
    // marker.setMap(map);

    //构造路线导航类
    var driving = new AMap.Driving({
        map: map,
        panel: 'panel'
    });
    // 根据起终点经纬度规划驾车导航路线
    driving.search(
        new AMap.LngLat(108.962073, 34.312406),
        new AMap.LngLat(110.572835, 34.039803),
        function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
                console.log('绘制驾车路线完成');

                map.setCenter([116.442581, 39.882498]);
            } else {
                console.error('获取驾车数据失败：' + result);
            }
        }
    );
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
<style>
.amap-icon img,
.amap-marker-content img {
    width: 25px;
    height: 34px;
}
</style> -->
<script lang="ts" setup>
import { mapGaode } from 'micro-util-ts';

mapGaode({
    key: 'b2837cddf98a7704c3bd74124c95eff3',
    securityCode: 'fff1bf0b56dc683882069ac1cec2b3e0',
    plugins: ['AMap.Walking']
}).then((AMap: any) => {
    var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [116.397428, 39.90923], //地图中心点
        zoom: 13 //地图显示的缩放级别
    });

    //步行导航
    var walking = new AMap.Walking({
        map: map,
        panel: 'panel'
    });
    //根据起终点坐标规划步行路线
    walking.search([116.399028, 39.845042], [116.436281, 39.880719], function (status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            console.log('绘制步行路线完成');
        } else {
            console.error('步行路线数据查询失败' + result);
        }
    });
});
</script>
<template>
    <div id="container"></div>
    <div id="panel"></div>
</template>

<style type="text/css">
html,
body,
#container {
    width: 100%;
    height: 100%;
}

#panel {
    position: fixed;
    top: 90px;
    right: 10px;
    width: 280px;
    max-height: 90%;
    overflow-y: auto;
    background-color: white;
}

#panel .amap-call {
    display: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #009cf9;
}

#panel .amap-lib-walking {
    overflow: hidden;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
}

#panel .amap-logo {
    display: none !important;
}

.amap-logo {
    display: none !important;
}

.amap-copyright,
.amap-logo {
    left: 0;
}
</style>
