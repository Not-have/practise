<script lang='ts' setup>
import { inject } from 'vue';

/**
 * 如果没有祖先组件提供 "message"
 * `message` 会是 "这是默认值"
 */
// const message = inject('message', '这是默认值');
const {
    value,
    dispatch
} = inject("test", {
    value: "哈哈",
    dispatch: function () {
        console.log("默认方法");
    }
});
const fun = dispatch;
</script>
<template>
    InJect

    {{ value }}

    <button @click="fun">修改</button>
</template>

<style scoped></style>
