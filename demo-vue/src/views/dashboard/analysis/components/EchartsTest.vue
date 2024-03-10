<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const myChart = ref();
const data = ref([0, 230, 224, 218, 135, 147, 260]);
console.log(data);

function initEcharts() {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.value,
                type: 'line'
            }
        ]
    };
}

const handleClick = () => {
    data.value = [150, 230, 224, 218, 135, 0, 270];
    myChart.value.clear();
    myChart.value.setOption(initEcharts(), true);
};

onMounted(() => {
    var chartDom = document.getElementById('echarts-test');
    myChart.value = echarts.init(chartDom);
    myChart.value.setOption(initEcharts(), true);
});
</script>
<template>
    <div>
        <div id="echarts-test"></div>
        <a-button @click="handleClick">修改数据</a-button>
    </div>
</template>

<style scoped>
div {
    height: 280px;
}
</style>
