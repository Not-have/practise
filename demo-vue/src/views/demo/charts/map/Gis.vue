<template>
    <div ref="wrapRef" id="leaflet" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet';

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

const wrapRef = ref();

onMounted(() => {
    var map = L.map('leaflet').setView([34.3416, 108.9398], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '测试'
    }).addTo(map);

    L.marker([34.312406, 108.962073]).addTo(map).bindPopup('你好弹出框.').openPopup();
});
</script>
