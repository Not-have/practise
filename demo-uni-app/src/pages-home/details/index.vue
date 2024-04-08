<script lang="ts" setup>
import Page from '@/components/public-page/index.vue';
import { useTestOneStore } from '@/store';
import { useRouter, useRoute } from '@/hooks';
const { objTestStore } = useTestOneStore();

const router = useRouter();
const handleClick = () => {
    router({
        type: 'navigateBack'
    });
};

useRoute().then((res) => {
    console.log(res);
});
</script>
<template>
    <Page class="">
        <button @click="handleClick">返回</button>
        详情
        <br />
        {{ objTestStore }}
    </Page>
</template>

<style scoped lang="scss"></style>
