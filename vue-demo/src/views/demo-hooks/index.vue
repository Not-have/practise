<script lang='ts' setup>
import { useService } from "micro-vue-hooks";
import { dataDemo, dataDemoList } from './fetch';

const { data, loading } = useService(dataDemo);
console.log(data);

const { data: list} = useService(dataDemoList);
console.log(list);

</script>
<template>
    <div>
        {{ data?.content }}
        {{ loading }}
        {{ list?.length }}
    </div>
</template>

<style scoped></style>
