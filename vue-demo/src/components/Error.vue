<script setup lang="ts">
import {
    ElButton
} from 'element-plus'
    const obj = {}
    // 直接在App组件的created钩子中尝试错误操作，调用obj中不存在的fn
    obj.fn()
</script>

<template>
    `<div class="test">
        <ElButton>Default</ElButton>
    </div>`
</template>

<style scoped>

</style>