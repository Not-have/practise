<script setup lang="ts">
import useDebouncedRef from '@/utils/debounced-ref';
const text = useDebouncedRef('hello', 1000);
</script>

<template>
    <p>
        此文本仅在您停止输入后 1 秒更新：
    </p>
    <p>{{ text }}</p>
    <input v-model="text" />
</template>