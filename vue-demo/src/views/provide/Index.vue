<script lang='ts' setup>
import { ref, provide } from 'vue';
import InJect from './Inject.vue';

const str = ref("hello");
const editStr = () => {
    str.value = "哈哈哈";
};

// provide(/* 注入名 */ 'message', /* 值 */ 'hello!');
provide("test", {
    value: str,
    dispatch: editStr
})

</script>
<template>
    provide
    <br />
    <InJect />
</template>

<style scoped></style>
