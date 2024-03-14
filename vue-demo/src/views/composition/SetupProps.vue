<script lang='ts' setup>
import { reactive, readonly } from 'vue';
const original = reactive({ count: 0 });

const copy = readonly(original);

// 更改源属性会触发其依赖的侦听器
original.count++;

// 更改该只读副本将会失败，并会得到一个警告
// copy.count++; // warning!

console.log(copy.count);

</script>
<template>
    <div ref="el">
        API 的基础使用
    </div>
</template>
